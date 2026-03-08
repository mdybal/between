import { useEffect, useRef, useState, useCallback } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { Layers, Clock, X, ChevronRight, Eye, EyeOff } from 'lucide-react'
import { cn } from '@/lib/utils'
import Badge from '@/components/ui/Badge'
import { pointsOfInterest, mapZones, mapSessions } from '@/data/mapData'
import type { PointOfInterest, MapZone, MapSession, PoiCategory } from '@/types'

// ─── Constants ────────────────────────────────────────────────────────────────

const IMG_W = 3500
const IMG_H = 1952

const BOUNDS: L.LatLngBoundsExpression = [
  [0, 0],
  [IMG_H, IMG_W],
]

// ─── Session ordering ─────────────────────────────────────────────────────────

// Ordered list of session ids (index = chronological order)
const SESSION_ORDER = mapSessions.map((s) => s.id)

function sessionIndex(sessionId: string): number {
  return SESSION_ORDER.indexOf(sessionId)
}

// ─── POI styling ─────────────────────────────────────────────────────────────

const categoryConfig: Record<
  PoiCategory,
  {
    label: string
    color: string
    badgeVariant: 'amber' | 'red' | 'green' | 'muted' | 'default'
  }
> = {
  location:      { label: 'Location',    color: '#f59e0b', badgeVariant: 'amber' },
  'crime-scene': { label: 'Crime Scene', color: '#ef4444', badgeVariant: 'red' },
  'safe-house':  { label: 'Safe House',  color: '#10b981', badgeVariant: 'green' },
  danger:        { label: 'Danger',      color: '#f97316', badgeVariant: 'red' },
  clue:          { label: 'Clue',        color: '#a78bfa', badgeVariant: 'default' },
  unknown:       { label: 'Unknown',     color: '#6b7280', badgeVariant: 'muted' },
}

// ─── Icon factories ───────────────────────────────────────────────────────────

function makePinIcon(color: string, opacity = 1) {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 32" width="24" height="32" opacity="${opacity}">
      <path d="M12 0C5.373 0 0 5.373 0 12c0 9 12 20 12 20S24 21 24 12C24 5.373 18.627 0 12 0z"
            fill="${color}" stroke="#1c1917" stroke-width="1.5"/>
      <circle cx="12" cy="12" r="4" fill="#1c1917" opacity="0.6"/>
    </svg>`
  return L.divIcon({ html: svg, className: '', iconSize: [24, 32], iconAnchor: [12, 32], popupAnchor: [0, -34] })
}

function makeHighlightIcon(color: string) {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 42" width="32" height="42">
      <path d="M16 0C7.163 0 0 7.163 0 16c0 12 16 26 16 26S32 28 32 16C32 7.163 24.837 0 16 0z"
            fill="${color}" stroke="#fef3c7" stroke-width="2"/>
      <circle cx="16" cy="16" r="5" fill="#1c1917" opacity="0.7"/>
    </svg>`
  return L.divIcon({ html: svg, className: '', iconSize: [32, 42], iconAnchor: [16, 42], popupAnchor: [0, -44] })
}

// ─── Session-based visibility logic ──────────────────────────────────────────
//
// Given a selected session (by index) and an element's (id, sessionId):
//
//   • Find the "canonical" entry for this element at the selected session:
//       - The entry whose sessionId == selectedSession  → "current"
//       - If none, the latest entry with sessionId < selectedSession → "inherited"
//   • If the canonical entry has state='removed' → hide
//   • If the canonical entry has state='disabled' → show greyed-out
//   • If the canonical entry's sessionId == selectedSession → highlight (current)
//   • If the canonical entry's sessionId < selectedSession → dim (past)
//   • Entries with sessionId > selectedSession → hide (future)
//   • Entries with same id but different sessionId than canonical → hide (superseded)

type VisibilityResult = 'hidden' | 'highlight' | 'normal' | 'dim' | 'disabled'

function resolveVisibility(
  elementId: string,
  elementSessionId: string,
  selectedSessionIdx: number,
  allEntries: { id: string; sessionId: string }[],
): VisibilityResult {
  const elemIdx = sessionIndex(elementSessionId)

  // This entry is in the future → hide
  if (elemIdx > selectedSessionIdx) return 'hidden'

  // Find the canonical entry for this id at the selected session:
  // = the entry with the highest sessionIdx that is <= selectedSessionIdx
  const candidates = allEntries
    .filter((e) => e.id === elementId && sessionIndex(e.sessionId) <= selectedSessionIdx)
    .sort((a, b) => sessionIndex(b.sessionId) - sessionIndex(a.sessionId))

  const canonical = candidates[0]

  // This entry is not the canonical one → hide (superseded by a later entry)
  if (!canonical || canonical.sessionId !== elementSessionId) return 'hidden'

  // canonical entry is this one — now check state
  return elemIdx === selectedSessionIdx ? 'highlight' : 'dim'
}

// ─── Types ────────────────────────────────────────────────────────────────────

type ActivePanel = 'layers' | 'timeline' | null
type SelectedItem =
  | { type: 'poi'; data: PointOfInterest }
  | { type: 'zone'; data: MapZone }
  | null

// ─── Leaflet layer refs ───────────────────────────────────────────────────────

interface PoiRef {
  poi: PointOfInterest
  marker: L.Marker
}

interface ZoneRef {
  zone: MapZone
  poly: L.Polygon
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function MapPage() {
  const mapContainerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<L.Map | null>(null)
  const poiRefsRef = useRef<PoiRef[]>([])
  const zoneRefsRef = useRef<ZoneRef[]>([])
  const highlightMarkerRef = useRef<L.Marker | null>(null)

  const [activePanel, setActivePanel] = useState<ActivePanel>(null)
  const [selectedItem, setSelectedItem] = useState<SelectedItem>(null)
  const [selectedSession, setSelectedSession] = useState<MapSession | null>(null)
  // Tracks which item is highlighted on the map (from Layers selection or direct click)
  const [highlightedItemId, setHighlightedItemId] = useState<string | null>(null)

  const [showPoi, setShowPoi] = useState(true)
  const [showZones, setShowZones] = useState(true)

  // ── Apply session filter to all markers/polygons ──────────────────────────
  const applySessionFilter = useCallback(
    (session: MapSession | null, highlightId: string | null) => {
      const map = mapRef.current
      if (!map) return

      if (session === null) {
        // No session selected — show everything in its base state
        poiRefsRef.current.forEach(({ poi, marker }) => {
          if (poi.state === 'removed') {
            marker.remove()
            return
          }
          if (!map.hasLayer(marker) && showPoi) marker.addTo(map)
          const cfg = categoryConfig[poi.category]
          const isHighlighted = highlightId === poi.id
          if (isHighlighted) {
            marker.setIcon(makeHighlightIcon(cfg.color))
          } else {
            const opacity = poi.state === 'disabled' ? 0.35 : 1
            marker.setIcon(makePinIcon(cfg.color, opacity))
          }
        })

        zoneRefsRef.current.forEach(({ zone, poly }) => {
          if (zone.state === 'removed') {
            poly.remove()
            return
          }
          if (!map.hasLayer(poly) && showZones) poly.addTo(map)
          const isHighlighted = highlightId === zone.id
          if (isHighlighted) {
            poly.setStyle({ fillOpacity: 0.35, opacity: 1, weight: 3 })
          } else {
            const opacity = zone.state === 'disabled' ? 0.08 : 0.15
            const strokeOpacity = zone.state === 'disabled' ? 0.2 : 0.6
            poly.setStyle({ fillOpacity: opacity, opacity: strokeOpacity, weight: 2 })
          }
        })
        return
      }

      const selIdx = sessionIndex(session.id)

      // ── POIs ──
      poiRefsRef.current.forEach(({ poi, marker }) => {
        const vis = resolveVisibility(poi.id, poi.sessionId, selIdx, pointsOfInterest)

        if (vis === 'hidden') {
          marker.remove()
          return
        }

        // Determine effective state from the canonical entry
        const canonicalEntry = pointsOfInterest
          .filter((p) => p.id === poi.id && sessionIndex(p.sessionId) <= selIdx)
          .sort((a, b) => sessionIndex(b.sessionId) - sessionIndex(a.sessionId))[0]

        if (canonicalEntry?.state === 'removed') {
          marker.remove()
          return
        }

        if (showPoi && !map.hasLayer(marker)) marker.addTo(map)

        const cfg = categoryConfig[poi.category]
        const isHighlighted = highlightId === poi.id

        if (isHighlighted) {
          marker.setIcon(makeHighlightIcon(cfg.color))
        } else {
          let opacity: number
          if (canonicalEntry?.state === 'disabled') {
            opacity = 0.3
          } else if (vis === 'highlight') {
            opacity = 1
          } else {
            // dim (past session)
            opacity = 0.45
          }
          marker.setIcon(makePinIcon(cfg.color, opacity))
        }
      })

      // ── Zones ──
      zoneRefsRef.current.forEach(({ zone, poly }) => {
        const vis = resolveVisibility(zone.id, zone.sessionId, selIdx, mapZones)

        if (vis === 'hidden') {
          poly.remove()
          return
        }

        const canonicalEntry = mapZones
          .filter((z) => z.id === zone.id && sessionIndex(z.sessionId) <= selIdx)
          .sort((a, b) => sessionIndex(b.sessionId) - sessionIndex(a.sessionId))[0]

        if (canonicalEntry?.state === 'removed') {
          poly.remove()
          return
        }

        if (showZones && !map.hasLayer(poly)) poly.addTo(map)

        const isHighlighted = highlightId === zone.id

        if (isHighlighted) {
          poly.setStyle({ fillOpacity: 0.35, opacity: 1, weight: 3 })
        } else {
          let fillOpacity: number
          let strokeOpacity: number
          if (canonicalEntry?.state === 'disabled') {
            fillOpacity = 0.06
            strokeOpacity = 0.2
          } else if (vis === 'highlight') {
            fillOpacity = 0.22
            strokeOpacity = 0.8
          } else {
            // dim
            fillOpacity = 0.07
            strokeOpacity = 0.25
          }
          poly.setStyle({ fillOpacity, opacity: strokeOpacity, weight: 2 })
        }
      })
    },
    [showPoi, showZones],
  )

  // ── Initialise map ──────────────────────────────────────────────────────────
  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return

    const map = L.map(mapContainerRef.current, {
      crs: L.CRS.Simple,
      minZoom: -2,
      maxZoom: 2,
      zoomSnap: 0.25,
      attributionControl: false,
    })

    map.fitBounds(BOUNDS)
    L.imageOverlay('/image.png', BOUNDS).addTo(map)

    // ── POI markers ──────────────────────────────────────────────────────────
    pointsOfInterest.forEach((poi) => {
      if (poi.state === 'removed') return
      const cfg = categoryConfig[poi.category]
      const marker = L.marker(poi.coords as L.LatLngExpression, {
        icon: makePinIcon(cfg.color, poi.state === 'disabled' ? 0.35 : 1),
      })
      marker.bindTooltip(
        `<span style="font-family:Georgia,serif;font-size:12px;color:#fef3c7">${poi.name}</span>`,
        { direction: 'top', offset: [0, -34], className: 'leaflet-tooltip-poi' },
      )
      marker.on('click', () => {
        setSelectedItem({ type: 'poi', data: poi })
        setHighlightedItemId(poi.id)
        // Do NOT close the layers panel
      })
      marker.addTo(map)
      poiRefsRef.current.push({ poi, marker })
    })

    // ── Zone polygons ────────────────────────────────────────────────────────
    mapZones.forEach((zone) => {
      if (zone.state === 'removed') return
      const poly = L.polygon(zone.polygon as L.LatLngExpression[], {
        color: zone.color,
        fillColor: zone.color,
        fillOpacity: zone.state === 'disabled' ? 0.08 : 0.15,
        weight: 2,
        opacity: zone.state === 'disabled' ? 0.2 : 0.6,
        dashArray: '6 4',
      })
      poly.bindTooltip(
        `<span style="font-family:Georgia,serif;font-size:12px;color:#fef3c7">${zone.name}</span>`,
        { permanent: false, direction: 'center', className: 'leaflet-tooltip-zone' },
      )
      poly.on('click', () => {
        setSelectedItem({ type: 'zone', data: zone })
        setHighlightedItemId(zone.id)
        // Do NOT close the layers panel
      })
      poly.addTo(map)
      zoneRefsRef.current.push({ zone, poly })
    })

    mapRef.current = map

    return () => {
      map.remove()
      mapRef.current = null
      poiRefsRef.current = []
      zoneRefsRef.current = []
    }
  }, [])

  // ── Re-apply filter when session, layer visibility, or highlight changes ───
  useEffect(() => {
    applySessionFilter(selectedSession, highlightedItemId)
  }, [selectedSession, showPoi, showZones, highlightedItemId, applySessionFilter])

  // ── Pan to coords only if outside current viewport (no zoom change) ────────
  const panToIfNeeded = useCallback((coords: [number, number]) => {
    const map = mapRef.current
    if (!map) return
    const latlng = L.latLng(coords[0], coords[1])
    if (!map.getBounds().contains(latlng)) {
      map.panTo(latlng, { animate: true, duration: 0.6 })
    }
  }, [])

  // ── Pan to highlight when session selected ─────────────────────────────────
  useEffect(() => {
    if (!mapRef.current) return
    const map = mapRef.current

    if (highlightMarkerRef.current) {
      highlightMarkerRef.current.remove()
      highlightMarkerRef.current = null
    }

    if (!selectedSession) return

    // Find the first active POI belonging to this session to pan to
    const anchor = pointsOfInterest.find(
      (p) => p.sessionId === selectedSession.id && p.state === 'active',
    )
    if (!anchor) return

    const cfg = categoryConfig[anchor.category]
    panToIfNeeded(anchor.coords)

    const marker = L.marker(anchor.coords as L.LatLngExpression, {
      icon: makeHighlightIcon(cfg.color),
      zIndexOffset: 1000,
    }).addTo(map)
    highlightMarkerRef.current = marker

    const timer = setTimeout(() => {
      marker.remove()
      if (highlightMarkerRef.current === marker) highlightMarkerRef.current = null
    }, 3000)

    return () => clearTimeout(timer)
  }, [selectedSession, panToIfNeeded])

  // ── Helpers ─────────────────────────────────────────────────────────────────
  const togglePanel = (panel: ActivePanel) =>
    setActivePanel((prev) => (prev === panel ? null : panel))

  const flyToPoi = (poi: PointOfInterest) => {
    panToIfNeeded(poi.coords)
    setSelectedItem({ type: 'poi', data: poi })
    setHighlightedItemId(poi.id)
    // Keep the layers panel open — do NOT call setActivePanel(null)
  }

  const flyToZone = (zone: MapZone) => {
    // Pan to the centroid of the zone polygon
    const poly = zoneRefsRef.current.find((z) => z.zone.id === zone.id)?.poly
    if (poly) {
      const center = poly.getBounds().getCenter()
      panToIfNeeded([center.lat, center.lng])
    }
    setSelectedItem({ type: 'zone', data: zone })
    setHighlightedItemId(zone.id)
    // Keep the layers panel open
  }

  // Unique POIs for the layers list (latest entry per id)
  const uniquePois = Object.values(
    pointsOfInterest.reduce<Record<string, PointOfInterest>>((acc, poi) => {
      if (!acc[poi.id] || sessionIndex(poi.sessionId) > sessionIndex(acc[poi.id].sessionId)) {
        acc[poi.id] = poi
      }
      return acc
    }, {}),
  )

  // Unique zones for the layers list (latest entry per id)
  const uniqueZones = Array.from(new Map(mapZones.map((z) => [z.id, z])).values())

  // ── Render ──────────────────────────────────────────────────────────────────
  return (
    <div className="flex h-[calc(100vh-57px)] flex-col overflow-hidden">
      {/* ── Top bar ── */}
      <div className="flex items-center justify-between border-b border-amber-900/30 bg-stone-950/95 px-4 py-2">
        <div>
          <h1 className="font-serif text-lg font-bold tracking-widest text-amber-400">
            Investigation Map
          </h1>
          <p className="font-serif text-xs tracking-widest text-stone-500 uppercase">
            London, 1893
          </p>
        </div>

        <div className="flex items-center gap-2">
          {selectedSession && (
            <button
              onClick={() => setSelectedSession(null)}
              className="flex items-center gap-1.5 rounded border border-amber-800/50 bg-amber-950/40 px-3 py-1.5 font-serif text-xs text-amber-400 transition-colors hover:border-amber-700"
            >
              <X size={12} />
              Clear session
            </button>
          )}
          <ToolbarButton
            icon={<Layers size={16} />}
            label="Layers"
            active={activePanel === 'layers'}
            onClick={() => togglePanel('layers')}
          />
          <ToolbarButton
            icon={<Clock size={16} />}
            label="Sessions"
            active={activePanel === 'timeline'}
            onClick={() => togglePanel('timeline')}
          />
        </div>
      </div>

      {/* ── Main area ── */}
      <div className="relative flex flex-1 overflow-hidden">
        {/* Map */}
        <div ref={mapContainerRef} className="flex-1 bg-stone-900" />

        {/* ── Layers panel ── */}
        <SidePanel
          open={activePanel === 'layers'}
          title="Map Layers"
          icon={<Layers size={15} />}
          onClose={() => setActivePanel(null)}
        >
          <div className="space-y-4">
            <LayerToggle
              label="Points of Interest"
              description={`${uniquePois.length} locations`}
              enabled={showPoi}
              onToggle={() => setShowPoi((v) => !v)}
              color="text-amber-400"
            />
            <LayerToggle
              label="Zones"
              description={`${uniqueZones.length} districts`}
              enabled={showZones}
              onToggle={() => setShowZones((v) => !v)}
              color="text-blue-400"
            />

            {/* POI legend */}
            <div className="mt-4 border-t border-stone-800 pt-4">
              <p className="mb-2 font-serif text-xs uppercase tracking-widest text-stone-500">
                POI Legend
              </p>
              <div className="space-y-1.5">
                {(Object.entries(categoryConfig) as [PoiCategory, (typeof categoryConfig)[PoiCategory]][]).map(
                  ([key, cfg]) => (
                    <div key={key} className="flex items-center gap-2">
                      <span
                        className="inline-block h-3 w-3 rounded-full border border-stone-700"
                        style={{ backgroundColor: cfg.color }}
                      />
                      <span className="font-serif text-xs text-stone-400">{cfg.label}</span>
                    </div>
                  ),
                )}
              </div>
            </div>

            {/* Zone legend / clickable list */}
            <div className="border-t border-stone-800 pt-4">
              <p className="mb-2 font-serif text-xs uppercase tracking-widest text-stone-500">
                Districts
              </p>
              <div className="space-y-1">
                {uniqueZones.map((zone) => (
                  <button
                    key={zone.id}
                    onClick={() => flyToZone(zone)}
                    className={cn(
                      'flex w-full items-center gap-2 rounded px-2 py-1.5 text-left transition-colors',
                      highlightedItemId === zone.id
                        ? 'bg-amber-950/50 ring-1 ring-amber-700/60'
                        : 'hover:bg-stone-800/60',
                    )}
                  >
                    <span
                      className="inline-block h-3 w-3 shrink-0 rounded border border-stone-700"
                      style={{ backgroundColor: zone.color, opacity: 0.8 }}
                    />
                    <span
                      className={cn(
                        'font-serif text-xs',
                        highlightedItemId === zone.id ? 'text-amber-300' : 'text-stone-400',
                      )}
                    >
                      {zone.name}
                    </span>
                    <ChevronRight size={12} className="ml-auto shrink-0 text-stone-600" />
                  </button>
                ))}
              </div>
            </div>

            {/* POI list */}
            <div className="border-t border-stone-800 pt-4">
              <p className="mb-2 font-serif text-xs uppercase tracking-widest text-stone-500">
                All Locations
              </p>
              <div className="space-y-1">
                {uniquePois.map((poi) => {
                  const cfg = categoryConfig[poi.category]
                  const isHighlighted = highlightedItemId === poi.id
                  return (
                    <button
                      key={poi.id}
                      onClick={() => flyToPoi(poi)}
                      className={cn(
                        'flex w-full items-center gap-2 rounded px-2 py-1.5 text-left transition-colors',
                        isHighlighted
                          ? 'bg-amber-950/50 ring-1 ring-amber-700/60'
                          : 'hover:bg-stone-800/60',
                      )}
                    >
                      <span
                        className="inline-block h-2.5 w-2.5 shrink-0 rounded-full"
                        style={{ backgroundColor: cfg.color }}
                      />
                      <span
                        className={cn(
                          'font-serif text-xs',
                          isHighlighted ? 'text-amber-300' : 'text-stone-300',
                        )}
                      >
                        {poi.name}
                      </span>
                      <ChevronRight size={12} className="ml-auto shrink-0 text-stone-600" />
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
        </SidePanel>

        {/* ── Sessions / Timeline panel ── */}
        <SidePanel
          open={activePanel === 'timeline'}
          title="Sessions"
          icon={<Clock size={15} />}
          onClose={() => setActivePanel(null)}
        >
          {/* Legend */}
          <div className="mb-4 rounded border border-stone-800 bg-stone-900/50 p-3">
            <p className="mb-2 font-serif text-xs uppercase tracking-widest text-stone-500">
              Session filter
            </p>
            <div className="space-y-1 font-serif text-xs text-stone-500">
              <div className="flex items-center gap-2">
                <span className="inline-block h-2 w-2 rounded-full bg-amber-400" />
                Current session — highlighted
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-block h-2 w-2 rounded-full bg-stone-500" />
                Earlier sessions — dimmed
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-block h-2 w-2 rounded-full bg-stone-800" />
                Later sessions — hidden
              </div>
            </div>
          </div>

          <div className="relative">
            {mapSessions.map((session, idx) => (
              <button
                key={session.id}
                onClick={() => {
                  setSelectedSession((prev) =>
                    prev?.id === session.id ? null : session,
                  )
                  setSelectedItem(null)
                  setHighlightedItemId(null)
                  // Switch away from layers panel when Sessions is used
                  setActivePanel('timeline')
                }}
                className={cn(
                  'group relative flex w-full gap-4 rounded-lg px-3 py-3 text-left transition-colors',
                  selectedSession?.id === session.id
                    ? 'bg-amber-950/40'
                    : 'hover:bg-stone-800/50',
                )}
              >
                {/* Timeline spine */}
                <div className="flex flex-col items-center">
                  <div
                    className={cn(
                      'mt-1 h-3 w-3 shrink-0 rounded-full border-2',
                      selectedSession?.id === session.id
                        ? 'border-amber-400 bg-amber-400'
                        : 'border-amber-700 bg-stone-900 group-hover:border-amber-500',
                    )}
                  />
                  {idx < mapSessions.length - 1 && (
                    <div className="mt-1 w-px flex-1 bg-amber-900/30" style={{ minHeight: 24 }} />
                  )}
                </div>

                <div className="flex-1 pb-2">
                  <p className="font-serif text-xs text-amber-600/80">
                    Session {idx + 1}
                  </p>
                  <p
                    className={cn(
                      'font-serif text-sm font-semibold leading-snug',
                      selectedSession?.id === session.id
                        ? 'text-amber-300'
                        : 'text-stone-300',
                    )}
                  >
                    {session.title}
                  </p>
                  <p className="mt-1 font-serif text-xs leading-relaxed text-stone-500">
                    {session.description}
                  </p>
                  <p className="mt-1.5 font-serif text-xs text-amber-700/60 italic">
                    {selectedSession?.id === session.id
                      ? '✦ Active — click to deselect'
                      : 'Click to filter map'}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </SidePanel>

        {/* ── Detail card (POI / Zone) ── */}
        {selectedItem && (
          <div className="absolute bottom-4 left-1/2 z-[1000] w-full max-w-sm -translate-x-1/2 px-4">
            <div className="rounded-lg border border-amber-900/40 bg-stone-950/95 p-4 shadow-2xl backdrop-blur-sm">
              <button
                onClick={() => {
                  setSelectedItem(null)
                  setHighlightedItemId(null)
                }}
                className="absolute right-3 top-3 text-stone-600 hover:text-stone-300"
              >
                <X size={14} />
              </button>

              {selectedItem.type === 'poi' && <PoiCard poi={selectedItem.data} />}
              {selectedItem.type === 'zone' && <ZoneCard zone={selectedItem.data} />}
            </div>
          </div>
        )}
      </div>

      {/* Leaflet custom styles */}
      <style>{`
        .leaflet-tooltip-poi,
        .leaflet-tooltip-zone {
          background: rgba(12, 10, 9, 0.9);
          border: 1px solid rgba(180, 83, 9, 0.4);
          border-radius: 4px;
          color: #fef3c7;
          font-family: Georgia, serif;
          font-size: 12px;
          padding: 3px 8px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.6);
          white-space: nowrap;
        }
        .leaflet-tooltip-poi::before,
        .leaflet-tooltip-zone::before {
          border-top-color: rgba(180, 83, 9, 0.4);
        }
        .leaflet-container {
          background: #0c0a09;
        }
      `}</style>
    </div>
  )
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function ToolbarButton({
  icon,
  label,
  active,
  onClick,
}: {
  icon: React.ReactNode
  label: string
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'flex items-center gap-1.5 rounded border px-3 py-1.5 font-serif text-xs tracking-wide transition-colors',
        active
          ? 'border-amber-700 bg-amber-950/50 text-amber-400'
          : 'border-stone-800 bg-stone-900/40 text-stone-400 hover:border-stone-700 hover:text-stone-200',
      )}
    >
      {icon}
      {label}
    </button>
  )
}

function SidePanel({
  open,
  title,
  icon,
  onClose,
  children,
}: {
  open: boolean
  title: string
  icon: React.ReactNode
  onClose: () => void
  children: React.ReactNode
}) {
  return (
    <div
      className={cn(
        'absolute right-0 top-0 z-[500] h-full w-80 overflow-y-auto border-l border-amber-900/30 bg-stone-950/95 backdrop-blur-sm transition-transform duration-300',
        open ? 'translate-x-0' : 'translate-x-full',
      )}
    >
      <div className="sticky top-0 z-10 flex items-center justify-between border-b border-amber-900/30 bg-stone-950/95 px-4 py-3">
        <div className="flex items-center gap-2 text-amber-400">
          {icon}
          <span className="font-serif text-sm font-semibold tracking-wide">{title}</span>
        </div>
        <button onClick={onClose} className="text-stone-600 hover:text-stone-300">
          <X size={14} />
        </button>
      </div>
      <div className="p-4">{children}</div>
    </div>
  )
}

function LayerToggle({
  label,
  description,
  enabled,
  onToggle,
  color,
}: {
  label: string
  description: string
  enabled: boolean
  onToggle: () => void
  color: string
}) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <p className={cn('font-serif text-sm font-medium', color)}>{label}</p>
        <p className="font-serif text-xs text-stone-600">{description}</p>
      </div>
      <button
        onClick={onToggle}
        className={cn(
          'flex items-center gap-1 rounded border px-2 py-1 font-serif text-xs transition-colors',
          enabled
            ? 'border-amber-800/50 bg-amber-950/40 text-amber-500'
            : 'border-stone-800 bg-stone-900/40 text-stone-600',
        )}
      >
        {enabled ? <Eye size={12} /> : <EyeOff size={12} />}
        {enabled ? 'Visible' : 'Hidden'}
      </button>
    </div>
  )
}

function PoiCard({ poi }: { poi: PointOfInterest }) {
  const cfg = categoryConfig[poi.category]
  return (
    <>
      <div className="mb-2 flex flex-wrap items-center gap-2">
        <Badge variant={cfg.badgeVariant}>{cfg.label}</Badge>
        <Badge variant="muted">
          {poi.sessionId.replace('session-', 'Session ')}
        </Badge>
        {poi.state !== 'active' && (
          <Badge variant={poi.state === 'disabled' ? 'muted' : 'red'}>
            {poi.state}
          </Badge>
        )}
      </div>
      <h3 className="font-serif text-base font-semibold text-stone-200">{poi.name}</h3>
      <p className="mt-2 font-serif text-xs leading-relaxed text-stone-400">{poi.description}</p>
      {poi.linkedCharacters && poi.linkedCharacters.length > 0 && (
        <p className="mt-2 font-serif text-xs text-stone-600">
          <span className="text-stone-500">Linked: </span>
          {poi.linkedCharacters.join(', ')}
        </p>
      )}
    </>
  )
}

function ZoneCard({ zone }: { zone: MapZone }) {
  return (
    <>
      <div className="mb-2 flex items-center gap-2">
        <span
          className="inline-block h-3 w-3 rounded border border-stone-700"
          style={{ backgroundColor: zone.color, opacity: 0.8 }}
        />
        <Badge variant="muted">District</Badge>
        <Badge variant="muted">
          {zone.sessionId.replace('session-', 'Session ')}
        </Badge>
        {zone.state !== 'active' && (
          <Badge variant={zone.state === 'disabled' ? 'muted' : 'red'}>
            {zone.state}
          </Badge>
        )}
      </div>
      <h3 className="font-serif text-base font-semibold text-stone-200">{zone.name}</h3>
      <p className="mt-2 font-serif text-xs leading-relaxed text-stone-400">{zone.description}</p>
    </>
  )
}
