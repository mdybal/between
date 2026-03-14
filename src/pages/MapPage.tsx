import { useEffect, useRef, useState, useCallback } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import 'leaflet-rastercoords'
import { Layers, Clock, X, ChevronRight, Eye, EyeOff } from 'lucide-react'
import { cn } from '@/lib/utils'
import Badge from '@/components/ui/Badge'
import { pointsOfInterest, mapZones, mapSessions } from '@/data/mapData'
import type { PointOfInterest, MapZone, MapSession, PoiCategory } from '@/types'

// ─── Constants ────────────────────────────────────────────────────────────────

const IMG_W = 3500
const IMG_H = 1952

// ─── Session ordering ─────────────────────────────────────────────────────────

// Ordered list of session ids (index = chronological order)
const SESSION_ORDER = mapSessions.map((s) => s.id)
const MAX_SESSION_IDX = SESSION_ORDER.length - 1

function sessionIndex(sessionId: string): number {
  return SESSION_ORDER.indexOf(sessionId)
}

// ─── Canonical entry helper ───────────────────────────────────────────────────
//
// Returns the entry with the highest sessionIdx that is <= selIdx, or null.
// This is the "what did this element look like at session selIdx?" query.

function canonicalAt<T extends { id: string; sessionId: string }>(
  id: string,
  selIdx: number,
  all: T[],
): T | null {
  const candidates = all
    .filter((e) => e.id === id && sessionIndex(e.sessionId) <= selIdx)
    .sort((a, b) => sessionIndex(b.sessionId) - sessionIndex(a.sessionId))
  return candidates[0] ?? null
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

const DISABLED_COLOR = '#9ca3af'

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

// ─── Types ────────────────────────────────────────────────────────────────────

type ActivePanel = 'layers' | 'timeline' | null
type SelectedItem =
  | { type: 'poi'; data: PointOfInterest }
  | { type: 'zone'; data: MapZone }
  | null

// ─── Leaflet layer refs ───────────────────────────────────────────────────────

// Each ref stores the element id and the Leaflet object.
// The actual entry data is always looked up dynamically via canonicalAt.
interface PoiRef {
  id: string
  // The earliest entry — used for stable coords, category, name for tooltip
  baseEntry: PointOfInterest
  marker: L.Marker
}

interface ZoneRef {
  id: string
  // The earliest entry — used for stable coords, color, name for tooltip
  baseEntry: MapZone
  poly: L.Polygon
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function MapPage() {
  const mapContainerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<L.Map | null>(null)
  const rcRef = useRef<L.RasterCoords | null>(null)
  const poiRefsRef = useRef<PoiRef[]>([])
  const zoneRefsRef = useRef<ZoneRef[]>([])

  const [activePanel, setActivePanel] = useState<ActivePanel>(null)
  const [selectedItem, setSelectedItem] = useState<SelectedItem>(null)
  const [selectedSession, setSelectedSession] = useState<MapSession | null>(null)
  const [highlightedItemId, setHighlightedItemId] = useState<string | null>(null)

  const [showPoi, setShowPoi] = useState(true)
  const [showZones, setShowZones] = useState(true)

  // ── Apply session filter to all markers/polygons ──────────────────────────
  //
  // Rules:
  //   No session selected:
  //     • Use canonicalAt(id, MAX_SESSION_IDX) — the overall latest entry
  //     • If state='removed' → hide
  //     • If state='disabled' → show grey at full opacity
  //     • If state='active' → show normally
  //
  //   Session selected (selIdx = index of selected session):
  //     2.1  canonicalAt returns null (no entry at or before selIdx) → hide
  //     2.1  canonicalAt returns entry with state='removed' → hide
  //     2.2  entry.sessionId == session.id (isCurrent) → show normally
  //     2.3  entry.sessionId < session.id (isPast) → show dimmed
  //     POI disabled: always full opacity, light-grey (regardless of current/past)
  //
  const applySessionFilter = useCallback(
    (session: MapSession | null, highlightId: string | null) => {
      const map = mapRef.current
      if (!map) return

      // The session index to query against
      const selIdx = session === null ? MAX_SESSION_IDX : sessionIndex(session.id)

      // ── POIs ──────────────────────────────────────────────────────────────
      poiRefsRef.current.forEach(({ id, marker }) => {
        const entry = canonicalAt(id, selIdx, pointsOfInterest)

        // No entry at or before this session, or explicitly removed → hide
        if (!entry || entry.state === 'removed') {
          if (map.hasLayer(marker)) marker.remove()
          return
        }

        if (showPoi && !map.hasLayer(marker)) marker.addTo(map)

        const cfg = categoryConfig[entry.category]
        const isHighlighted = highlightId === id
        // isCurrent only matters when a session is selected
        const isCurrent = session !== null && sessionIndex(entry.sessionId) === selIdx

        if (isHighlighted) {
          marker.setIcon(makeHighlightIcon(entry.state === 'disabled' ? DISABLED_COLOR : cfg.color))
        } else if (entry.state === 'disabled') {
          // Disabled: always full opacity, light-grey (rule 3)
          marker.setIcon(makePinIcon(DISABLED_COLOR, 1))
        } else if (session === null || isCurrent) {
          // No session selected, or introduced/updated this session → normal
          marker.setIcon(makePinIcon(cfg.color, 1))
        } else {
          // From an earlier session → dim (rule 2.3)
          marker.setIcon(makePinIcon(cfg.color, 0.4))
        }

        // Update tooltip to reflect the current entry's name
        marker.unbindTooltip()
        marker.bindTooltip(
          `<span style="font-family:Georgia,serif;font-size:12px;color:#fef3c7">${entry.name}</span>`,
          { direction: 'top', offset: [0, -34], className: 'leaflet-tooltip-poi' },
        )

        // Update click handler data to the current canonical entry
        marker.off('click')
        marker.on('click', () => {
          setSelectedItem({ type: 'poi', data: entry })
          setHighlightedItemId(id)
        })
      })

      // ── Zones ──────────────────────────────────────────────────────────────
      zoneRefsRef.current.forEach(({ id, poly }) => {
        const entry = canonicalAt(id, selIdx, mapZones)

        // No entry at or before this session, or explicitly removed → hide
        if (!entry || entry.state === 'removed') {
          if (map.hasLayer(poly)) poly.remove()
          return
        }

        if (showZones && !map.hasLayer(poly)) poly.addTo(map)

        // Update polygon geometry to match the canonical entry's polygon
        const rc = rcRef.current
        if (rc) {
          const latlngs = entry.polygon.map(([y, x]: [number, number]) => rc.unproject([x, y]))
          poly.setLatLngs(latlngs)
        }

        const isHighlighted = highlightId === id
        const isCurrent = session !== null && sessionIndex(entry.sessionId) === selIdx

        if (isHighlighted) {
          poly.setStyle({ fillOpacity: 0.35, opacity: 1, weight: 3 })
        } else if (entry.state === 'disabled') {
          // Disabled zone: visually subdued
          poly.setStyle({ fillOpacity: 0.08, opacity: 0.3, weight: 2 })
        } else if (session === null || isCurrent) {
          // No session selected, or current session → normal
          poly.setStyle({ fillOpacity: 0.15, opacity: 0.6, weight: 2 })
        } else {
          // From an earlier session → dim (rule 2.3)
          poly.setStyle({ fillOpacity: 0.07, opacity: 0.25, weight: 2 })
        }

        // Update tooltip and click handler to reflect current entry
        poly.unbindTooltip()
        poly.bindTooltip(
          `<span style="font-family:Georgia,serif;font-size:12px;color:#fef3c7">${entry.name}</span>`,
          { permanent: false, direction: 'center', className: 'leaflet-tooltip-zone' },
        )
        poly.off('click')
        poly.on('click', () => {
          setSelectedItem({ type: 'zone', data: entry })
          setHighlightedItemId(id)
        })
      })
    },
    [showPoi, showZones],
  )

  // ── Initialise map ──────────────────────────────────────────────────────────
  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return

    const map = L.map(mapContainerRef.current, {
      crs: L.CRS.Simple,
      minZoom: 0,
      maxZoom: 6,
      zoomSnap: 0.25,
      attributionControl: false,
    })

    const rc = new L.RasterCoords(map, [IMG_W, IMG_H])
    rcRef.current = rc

    map.setView(rc.unproject([IMG_W, IMG_H]), 2)

    L.tileLayer('/tiles/{z}/{x}/{y}.png', {
      tms: true,
      minZoom: 0,
      maxZoom: 6,
      noWrap: true,
      bounds: rc.getMaxBounds(),
    }).addTo(map)

    // ── POI markers ──────────────────────────────────────────────────────────
    // Create ONE marker per unique POI id, positioned at the earliest entry's
    // coords. Visibility and styling are handled entirely by applySessionFilter.
    const seenPoiIds = new Set<string>()
    // Sort by sessionIndex ascending so we always pick the earliest entry first
    const sortedPois = [...pointsOfInterest].sort(
      (a, b) => sessionIndex(a.sessionId) - sessionIndex(b.sessionId),
    )

    sortedPois.forEach((poi) => {
      if (seenPoiIds.has(poi.id)) return
      seenPoiIds.add(poi.id)

      const cfg = categoryConfig[poi.category]
      const latlng = rc.unproject([poi.coords[1], poi.coords[0]])
      // Initial icon — will be immediately overridden by applySessionFilter
      const marker = L.marker(latlng, {
        icon: makePinIcon(cfg.color, 1),
      })
      marker.bindTooltip(
        `<span style="font-family:Georgia,serif;font-size:12px;color:#fef3c7">${poi.name}</span>`,
        { direction: 'top', offset: [0, -34], className: 'leaflet-tooltip-poi' },
      )
      marker.on('click', () => {
        setSelectedItem({ type: 'poi', data: poi })
        setHighlightedItemId(poi.id)
      })
      // Do NOT add to map yet — applySessionFilter will decide
      poiRefsRef.current.push({ id: poi.id, baseEntry: poi, marker })
    })

    // ── Zone polygons ────────────────────────────────────────────────────────
    // Create ONE polygon per unique zone id, using the earliest entry's polygon.
    const seenZoneIds = new Set<string>()
    const sortedZones = [...mapZones].sort(
      (a, b) => sessionIndex(a.sessionId) - sessionIndex(b.sessionId),
    )

    sortedZones.forEach((zone) => {
      if (seenZoneIds.has(zone.id)) return
      seenZoneIds.add(zone.id)

      const latlngs = zone.polygon.map(([y, x]) => rc.unproject([x, y]))
      const poly = L.polygon(latlngs, {
        color: zone.color,
        fillColor: zone.color,
        fillOpacity: 0.15,
        weight: 2,
        opacity: 0.6,
        dashArray: '6 4',
      })
      poly.bindTooltip(
        `<span style="font-family:Georgia,serif;font-size:12px;color:#fef3c7">${zone.name}</span>`,
        { permanent: false, direction: 'center', className: 'leaflet-tooltip-zone' },
      )
      poly.on('click', () => {
        setSelectedItem({ type: 'zone', data: zone })
        setHighlightedItemId(zone.id)
      })
      // Do NOT add to map yet — applySessionFilter will decide
      zoneRefsRef.current.push({ id: zone.id, baseEntry: zone, poly })
    })

    mapRef.current = map

    return () => {
      map.remove()
      mapRef.current = null
      rcRef.current = null
      poiRefsRef.current = []
      zoneRefsRef.current = []
    }
  }, [])

  // ── Re-apply filter when session, layer visibility, or highlight changes ───
  useEffect(() => {
    applySessionFilter(selectedSession, highlightedItemId)
  }, [selectedSession, showPoi, showZones, highlightedItemId, applySessionFilter])

  // ── Pan to coords only if outside current viewport (with margin) ──────────
  const panToIfNeeded = useCallback((coords: [number, number]) => {
    const map = mapRef.current
    const rc = rcRef.current
    if (!map || !rc) return
    const latlng = rc.unproject([coords[1], coords[0]])
    const bounds = map.getBounds()
    const paddedBounds = bounds.pad(-0.2)
    if (!paddedBounds.contains(latlng)) {
      map.panTo(latlng, { animate: true, duration: 0.6 })
    }
  }, [])

  // ── Pan to first active POI when session selected (no highlight marker) ────
  useEffect(() => {
    if (!selectedSession) return

    const anchor = pointsOfInterest.find(
      (p) => p.sessionId === selectedSession.id && p.state === 'active',
    )
    if (!anchor) return

    panToIfNeeded(anchor.coords)
  }, [selectedSession, panToIfNeeded])

  // ── Helpers ─────────────────────────────────────────────────────────────────
  const togglePanel = (panel: ActivePanel) =>
    setActivePanel((prev) => (prev === panel ? null : panel))

  const flyToPoi = (poi: PointOfInterest) => {
    panToIfNeeded(poi.coords)
    setSelectedItem({ type: 'poi', data: poi })
    setHighlightedItemId(poi.id)
  }

  const flyToZone = (zone: MapZone) => {
    const poly = zoneRefsRef.current.find((z) => z.id === zone.id)?.poly
    if (poly) {
      const center = poly.getBounds().getCenter()
      panToIfNeeded([center.lat, center.lng])
    }
    setSelectedItem({ type: 'zone', data: zone })
    setHighlightedItemId(zone.id)
  }

  // Unique POIs for the layers list — use the overall canonical (latest) entry per id
  const uniquePois = Object.values(
    pointsOfInterest.reduce<Record<string, PointOfInterest>>((acc, poi) => {
      if (!acc[poi.id] || sessionIndex(poi.sessionId) > sessionIndex(acc[poi.id].sessionId)) {
        acc[poi.id] = poi
      }
      return acc
    }, {}),
  ).filter((poi) => poi.state !== 'removed')

  // Unique zones for the layers list — use the overall canonical (latest) entry per id
  const uniqueZones = Object.values(
    mapZones.reduce<Record<string, MapZone>>((acc, zone) => {
      if (!acc[zone.id] || sessionIndex(zone.sessionId) > sessionIndex(acc[zone.id].sessionId)) {
        acc[zone.id] = zone
      }
      return acc
    }, {}),
  ).filter((zone) => zone.state !== 'removed')

  // ── Render ──────────────────────────────────────────────────────────────────
  return (
    <div className="flex h-[calc(100vh-57px)] flex-col overflow-hidden">
      {/* ── Top bar ── */}
      <div className="flex items-center justify-between border-b border-amber-900/30 bg-stone-950/95 px-4 py-2">
        <div>
          <h1 className="font-serif text-lg font-bold tracking-widest text-amber-600">
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
              className="flex items-center gap-1.5 rounded border border-amber-800/50 bg-amber-950/40 px-3 py-1.5 font-serif text-xs text-amber-600 transition-colors hover:border-amber-700"
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
              color="text-amber-600"
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
                        highlightedItemId === zone.id ? 'text-amber-600' : 'text-stone-400',
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
                          isHighlighted ? 'text-amber-600' : 'text-stone-300',
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
                <span className="inline-block h-2 w-2 rounded-full bg-amber-600" />
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
                        ? 'border-amber-600 bg-amber-600'
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
                        ? 'text-amber-600'
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
          ? 'border-amber-700 bg-amber-950/50 text-amber-600'
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
        <div className="flex items-center gap-2 text-amber-600">
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
