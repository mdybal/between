import { useEffect, useRef, useState, useCallback } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import 'leaflet-rastercoords'
import { Layers, Clock, X, ChevronRight, Eye, EyeOff } from 'lucide-react'
import { cn } from '@/lib/utils'
import Badge from '@/components/ui/Badge'
import { pointsOfInterest, mapZones, mapSessions } from '@/data/mapData'
import { pointsOfInterestPl, mapZonesPl, mapSessionsPl } from '@/data/mapData_pl'
import type { PointOfInterest, MapZone, PoiCategory } from '@/types'
import { useLanguage } from '@/i18n/LanguageContext'

// ─── Constants ────────────────────────────────────────────────────────────────

const IMG_W = 6000
const IMG_H = 4145

// ─── Session ordering ─────────────────────────────────────────────────────────

// Ordered list of session ids (index = chronological order) - sorted ascending by id
const SESSION_ORDER = mapSessions.map((s) => s.id).sort()

function sessionIndex(sessionId: string): number {
  return SESSION_ORDER.indexOf(sessionId)
}

// ─── Canonical entry helper ───────────────────────────────────────────────────

function canonicalAt<T extends { id: string; sessionId: string }>(
  id: string,
  selectedSessions: Set<string>,
  all: T[],
): T | null {
  const candidates = all
    .filter((e) => e.id === id && selectedSessions.has(e.sessionId))
    .sort((a, b) => sessionIndex(b.sessionId) - sessionIndex(a.sessionId))
  return candidates[0] ?? null
}

// ─── POI styling ─────────────────────────────────────────────────────────────

type CategoryConfig = {
  color: string
  badgeVariant: 'amber' | 'red' | 'green' | 'muted' | 'default'
}

const categoryConfigBase: Record<PoiCategory, CategoryConfig> = {
  location:      { color: '#2980b9', badgeVariant: 'amber' },
  'player-character': { color: '#27ae60', badgeVariant: 'red' },
  'non-player-character':  { color: '#e1e11a', badgeVariant: 'green' },
  danger:        { color: '#c0392b', badgeVariant: 'red' },
  clue:          { color: '#8e44ad', badgeVariant: 'default' },
  other:       { color: '#7f8c8d', badgeVariant: 'muted' },
}

// ─── Icon factories ───────────────────────────────────────────────────────────

const DISABLED_COLOR = '#9ca3af'

function makePinIcon(color: string, opacity = 1) {
  // Compass rose/navigation needle - classic Victorian cartography style (1:3 ratio - larger diamond, shorter stem) - 20% larger
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 30" width="26" height="34" opacity="${opacity}">
      <!-- Pin shaft (shorter - 1 part) -->
      <line x1="12" y1="20" x2="12" y2="26" stroke="#2c2416" stroke-width="2.5" stroke-linecap="round"/>
      <!-- Pin point -->
      <path d="M9.5 26 L12 28 L14.5 26" fill="#2c2416"/>
      <!-- Compass rose outer diamond (larger - 3 parts) -->
      <polygon points="12,0 19,11 12,22 5,11" fill="${color}" stroke="#2c2416" stroke-width="1.2" stroke-linejoin="round"/>
      <!-- Compass rose inner detail -->
      <polygon points="12,3 17,11 12,19 7,11" fill="${color}" stroke="#2c2416" stroke-width="0.8" stroke-linejoin="round" opacity="0.8"/>
      <!-- North pointer (darker) -->
      <polygon points="12,0 15,8 12,11 9,8" fill="${color}" stroke="#2c2416" stroke-width="0.5"/>
      <!-- South pointer (lighter/dimmed) -->
      <polygon points="12,22 15,14 12,11 9,14" fill="${color}" stroke="#2c2416" stroke-width="0.5" opacity="0.6"/>
      <!-- Center compass rose circle -->
      <circle cx="12" cy="11" r="3" fill="#2c2416" opacity="0.6"/>
      <!-- Center highlight -->
      <circle cx="11.5" cy="10.5" r="1.2" fill="#fef3c7" opacity="0.3"/>
    </svg>`
  return L.divIcon({ html: svg, className: '', iconSize: [26, 34], iconAnchor: [13, 33], popupAnchor: [0, -36] })
}

function makeHighlightIcon(color: string) {
  // Compass rose highlight icon - larger and with gold outline for selection state
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 30" width="30" height="38" opacity="1">
      <!-- Outer glow/gold ring -->
      <circle cx="12" cy="11" r="13" fill="none" stroke="#d4a855" stroke-width="2" opacity="0.6"/>
      <!-- Pin shaft (shorter - 1 part) -->
      <line x1="12" y1="20" x2="12" y2="26" stroke="#d4a855" stroke-width="2.5" stroke-linecap="round"/>
      <!-- Pin point -->
      <path d="M9.5 26 L12 28 L14.5 26" fill="#d4a855"/>
      <!-- Compass rose outer diamond (larger - 3 parts) with gold border -->
      <polygon points="12,0 19,11 12,22 5,11" fill="${color}" stroke="#d4a855" stroke-width="2" stroke-linejoin="round"/>
      <!-- Compass rose inner detail -->
      <polygon points="12,3 17,11 12,19 7,11" fill="${color}" stroke="#d4a855" stroke-width="1" stroke-linejoin="round" opacity="0.8"/>
      <!-- North pointer (lighter - highlighted) -->
      <polygon points="12,0 15,8 12,11 9,8" fill="${color}" stroke="#d4a855" stroke-width="0.8"/>
      <!-- South pointer (lighter) -->
      <polygon points="12,22 15,14 12,11 9,14" fill="${color}" stroke="#d4a855" stroke-width="0.8" opacity="0.8"/>
      <!-- Center compass rose circle -->
      <circle cx="12" cy="11" r="3.5" fill="#d4a855" opacity="0.7"/>
      <!-- Center highlight -->
      <circle cx="11.5" cy="10.5" r="1.5" fill="#fef3c7" opacity="0.5"/>
    </svg>`
  return L.divIcon({ html: svg, className: '', iconSize: [30, 38], iconAnchor: [15, 37], popupAnchor: [0, -40] })
}

// ─── Types ────────────────────────────────────────────────────────────────────

type ActivePanel = 'layers' | 'timeline' | null
type SelectedItem =
  | { type: 'poi'; data: PointOfInterest }
  | { type: 'zone'; data: MapZone }
  | null

// ─── Leaflet layer refs ───────────────────────────────────────────────────────

interface PoiRef {
  id: string
  baseEntry: PointOfInterest
  marker: L.Marker
}

interface ZoneRef {
  id: string
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

  const { lang, t } = useLanguage()

  // Pick the right data source based on language
  const activePois = lang === 'pl' ? pointsOfInterestPl : pointsOfInterest
  const activeZones = lang === 'pl' ? mapZonesPl : mapZones
  const activeSessions = lang === 'pl' ? mapSessionsPl : mapSessions

  const [activePanel, setActivePanel] = useState<ActivePanel>(null)
  const [selectedItem, setSelectedItem] = useState<SelectedItem>(null)
  const [selectedSessions, setSelectedSessions] = useState<Set<string>>(
    () => new Set(mapSessions.map((s) => s.id))
  )
  const [highlightedItemId, setHighlightedItemId] = useState<string | null>(null)

  const [showPoi, setShowPoi] = useState(true)
  const [showZones, setShowZones] = useState(true)

  // Drag state for the detail card
  const [cardOffset, setCardOffset] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const dragStartPos = useRef({ x: 0, y: 0 })

  // Build category config with translated labels
  const categoryConfig: Record<PoiCategory, CategoryConfig & { label: string }> = {
    location:      { ...categoryConfigBase.location,      label: t.map.categoryLabels.location },
    'player-character': { ...categoryConfigBase['player-character'], label: t.map.categoryLabels['player-character'] },
    'non-player-character':  { ...categoryConfigBase['non-player-character'],  label: t.map.categoryLabels['non-player-character'] },
    danger:        { ...categoryConfigBase.danger,         label: t.map.categoryLabels.danger },
    clue:          { ...categoryConfigBase.clue,           label: t.map.categoryLabels.clue },
    other:       { ...categoryConfigBase.other,        label: t.map.categoryLabels.other },
  }
  
  // ── Apply session filter to all markers/polygons ──────────────────────────
  const applySessionFilter = useCallback(
    (selected: Set<string>, highlightId: string | null) => {
      const map = mapRef.current
      if (!map) return

      const maxSelectedIdx = selected.size > 0
        ? Math.max(...Array.from(selected).map(id => sessionIndex(id)))
        : -1

      // ── POIs ──────────────────────────────────────────────────────────────
      poiRefsRef.current.forEach(({ id, marker }) => {
        const entry = canonicalAt(id, selected, activePois)

        if (!showPoi || !entry || entry.state === 'removed') {
          if (map.hasLayer(marker)) marker.remove()
          return
        }

        if (!map.hasLayer(marker)) marker.addTo(map)

        const cfg = categoryConfigBase[entry.category]
        const isHighlighted = highlightId === id
        const isCurrent = sessionIndex(entry.sessionId) === maxSelectedIdx

        if (isHighlighted) {
          marker.setIcon(makeHighlightIcon(entry.state === 'disabled' ? DISABLED_COLOR : cfg.color))
        } else if (entry.state === 'disabled') {
          marker.setIcon(makePinIcon(DISABLED_COLOR, 1))
        } else if (isCurrent) {
          marker.setIcon(makePinIcon(cfg.color, 1))
        } else {
          marker.setIcon(makePinIcon(cfg.color, 0.4))
        }

        marker.unbindTooltip()
        marker.bindTooltip(
          `<span style="font-family:Georgia,serif;font-size:12px;color:#fef3c7">${entry.name}</span>`,
          { direction: 'top', offset: [0, -34], className: 'leaflet-tooltip-poi' },
        )

        marker.off('click')
        marker.on('click', () => {
          setSelectedItem({ type: 'poi', data: entry })
          setHighlightedItemId(id)
        })
      })

      // ── Zones ──────────────────────────────────────────────────────────────
      zoneRefsRef.current.forEach(({ id, poly }) => {
        const entry = canonicalAt(id, selected, activeZones)

        if (!showZones || !entry || entry.state === 'removed') {
          if (map.hasLayer(poly)) poly.remove()
          return
        }

        if (!map.hasLayer(poly)) poly.addTo(map)

        const rc = rcRef.current
        if (rc) {
          const latlngs = entry.polygon.map(([y, x]: [number, number]) => rc.unproject([x, y]))
          poly.setLatLngs(latlngs)
        }

        const isHighlighted = highlightId === id
        const isCurrent = sessionIndex(entry.sessionId) === maxSelectedIdx

        if (isHighlighted) {
          poly.setStyle({ fillOpacity: 0.35, opacity: 1, weight: 3 })
        } else if (entry.state === 'disabled') {
          poly.setStyle({ fillOpacity: 0.08, opacity: 0.3, weight: 2 })
        } else if (isCurrent) {
          poly.setStyle({ fillOpacity: 0.15, opacity: 0.6, weight: 2 })
        } else {
          poly.setStyle({ fillOpacity: 0.07, opacity: 0.25, weight: 2 })
        }

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
    [showPoi, showZones, activePois, activeZones],
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

    map.setMaxBounds(rc.getMaxBounds().pad(0.5))
    map.setView(rc.unproject([IMG_W, IMG_H]), 2)

    L.tileLayer('/tiles/{z}/{x}/{y}.png', {
      tms: true,
      minZoom: 0,
      maxZoom: 6,
      noWrap: true,
      bounds: rc.getMaxBounds(),
    }).addTo(map)

    // ── POI markers ──────────────────────────────────────────────────────────
    const seenPoiIds = new Set<string>()
    const sortedPois = [...pointsOfInterest].sort(
      (a, b) => sessionIndex(a.sessionId) - sessionIndex(b.sessionId),
    )

    sortedPois.forEach((poi) => {
      if (seenPoiIds.has(poi.id)) return
      seenPoiIds.add(poi.id)

      const cfg = categoryConfigBase[poi.category]
      const latlng = rc.unproject([poi.coords[1], poi.coords[0]])
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
      poiRefsRef.current.push({ id: poi.id, baseEntry: poi, marker })
    })

    // ── Zone polygons ────────────────────────────────────────────────────────
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
    applySessionFilter(selectedSessions, highlightedItemId)
  }, [selectedSessions, showPoi, showZones, highlightedItemId, applySessionFilter])

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

  // ── Reset detail card position when it closes ─────────────────────────────
  useEffect(() => {
    if (!selectedItem) {
      setCardOffset({ x: 0, y: 0 })
    }
  }, [selectedItem])

  const isFirstRender = useRef(true)

  // ── Pan to first active POI when latest selected session changes ────
  // Disabled: panning on session selection can be disruptive
  // useEffect(() => {
  //   if (isFirstRender.current) {
  //     isFirstRender.current = false
  //     return
  //   }
  //
  //   if (selectedSessions.size === 0) return
  //
  //   const maxSelectedIdx = Math.max(...Array.from(selectedSessions).map(id => sessionIndex(id)))
  //   const latestSessionId = SESSION_ORDER[maxSelectedIdx]
  //
  //   const anchor = activePois.find(
  //     (p) => p.sessionId === latestSessionId && p.state === 'active',
  //   )
  //   if (!anchor) return
  //
  //   panToIfNeeded(anchor.coords)
  // }, [selectedSessions, panToIfNeeded, activePois])

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
    const rc = rcRef.current
    if (poly && rc) {
      const center = poly.getBounds().getCenter()
      const pt = rc.project(center)
      panToIfNeeded([pt.y, pt.x])
    }
    setSelectedItem({ type: 'zone', data: zone })
    setHighlightedItemId(zone.id)
  }

  // Unique POIs for the layers list — filter by selected sessions and use canonical (latest) entry per id
  const uniquePois = Object.values(
    activePois
      .filter(poi => selectedSessions.has(poi.sessionId))
      .reduce<Record<string, PointOfInterest>>((acc, poi) => {
        if (!acc[poi.id] || sessionIndex(poi.sessionId) > sessionIndex(acc[poi.id].sessionId)) {
          acc[poi.id] = poi
        }
        return acc
      }, {}),
  ).filter((poi) => poi.state !== 'removed')

  // Unique zones for the layers list — filter by selected sessions and use canonical (latest) entry per id
  const uniqueZones = Object.values(
    activeZones
      .filter(zone => selectedSessions.has(zone.sessionId))
      .reduce<Record<string, MapZone>>((acc, zone) => {
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
            {t.map.title}
          </h1>
          <p className="font-serif text-xs tracking-widest text-stone-500 uppercase">
            {t.map.subtitle}
          </p>
        </div>

        <div className="flex items-center gap-2">
          {selectedSessions.size > 0 ? (
            <button
              onClick={() => setSelectedSessions(new Set())}
              className="flex items-center gap-1.5 rounded border border-amber-800/50 bg-amber-950/40 px-3 py-1.5 font-serif text-xs text-amber-600 transition-colors hover:border-amber-700"
            >
              <X size={12} />
              {t.map.clearSelections}
            </button>
          ) : (
            <button
              onClick={() => setSelectedSessions(new Set(mapSessions.map(s => s.id)))}
              className="flex items-center gap-1.5 rounded border border-amber-800/50 bg-amber-950/40 px-3 py-1.5 font-serif text-xs text-amber-600 transition-colors hover:border-amber-700"
            >
              {t.map.selectAll}
            </button>
          )}
          <ToolbarButton
            icon={<Layers size={16} />}
            label={t.map.layers}
            active={activePanel === 'layers'}
            onClick={() => togglePanel('layers')}
          />
          <ToolbarButton
            icon={<Clock size={16} />}
            label={t.map.sessions}
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
          title={t.map.mapLayers}
          icon={<Layers size={15} />}
          onClose={() => setActivePanel(null)}
        >
          <div className="space-y-4">
            <LayerToggle
              label={t.map.pointsOfInterest}
              description={`${uniquePois.length} ${t.map.locations}`}
              enabled={showPoi}
              onToggle={() => setShowPoi((v) => !v)}
              color="text-amber-600"
              visibleLabel={t.map.visible}
              hiddenLabel={t.map.hidden}
            />
            <LayerToggle
              label={t.map.zones}
              description={`${uniqueZones.length} ${t.map.districts}`}
              enabled={showZones}
              onToggle={() => setShowZones((v) => !v)}
              color="text-blue-400"
              visibleLabel={t.map.visible}
              hiddenLabel={t.map.hidden}
            />

            {/* POI legend */}
            <div className="mt-4 border-t border-stone-800 pt-4">
              <p className="mb-2 font-serif text-xs uppercase tracking-widest text-stone-500">
                {t.map.poiLegend}
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
                {t.map.districtsLabel}
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
                {t.map.allLocations}
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
          title={t.map.sessions}
          icon={<Clock size={15} />}
          onClose={() => setActivePanel(null)}
        >
          {/* Legend */}
          <div className="mb-4 rounded border border-stone-800 bg-stone-900/50 p-3">
            <p className="mb-2 font-serif text-xs uppercase tracking-widest text-stone-500">
              {t.map.sessionFilter}
            </p>
            <div className="space-y-1 font-serif text-xs text-stone-500">
              <div className="flex items-center gap-2">
                <span className="inline-block h-2 w-2 rounded-full bg-amber-600" />
                {t.map.sessionFilterLegend.latest}
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-block h-2 w-2 rounded-full bg-stone-500" />
                {t.map.sessionFilterLegend.earlier}
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-block h-2 w-2 rounded-full bg-stone-800" />
                {t.map.sessionFilterLegend.deselected}
              </div>
            </div>
          </div>

          <div className="relative">
            {activeSessions.map((session, idx) => {
              const isSelected = selectedSessions.has(session.id)
              const maxSelectedIdx = selectedSessions.size > 0 ? Math.max(...Array.from(selectedSessions).map(id => sessionIndex(id))) : -1
              const isLatest = isSelected && sessionIndex(session.id) === maxSelectedIdx

              return (
                <button
                  key={session.id}
                  onClick={() => {
                    setSelectedSessions((prev) => {
                      const next = new Set(prev)
                      if (next.has(session.id)) {
                        next.delete(session.id)
                      } else {
                        next.add(session.id)
                      }
                      return next
                    })
                    setSelectedItem(null)
                    setHighlightedItemId(null)
                  }}
                  className={cn(
                    'group relative flex w-full gap-4 rounded-lg px-3 py-3 text-left transition-colors',
                    isSelected
                      ? 'bg-amber-950/40'
                      : 'hover:bg-stone-800/50',
                  )}
                >
                  {/* Timeline spine */}
                  <div className="flex flex-col items-center">
                    <div
                      className={cn(
                        'mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-colors',
                        isSelected
                          ? isLatest
                            ? 'border-amber-600 bg-amber-600'
                            : 'border-amber-600/50 bg-amber-600/20'
                          : 'border-stone-700 bg-stone-900 group-hover:border-stone-500',
                      )}
                    >
                      {isSelected && (
                        <svg className={cn("h-3 w-3", isLatest ? "text-stone-950" : "text-amber-600/80")} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                    {idx < activeSessions.length - 1 && (
                      <div className="mt-2 w-px flex-1 bg-amber-900/30" style={{ minHeight: 24 }} />
                    )}
                  </div>

                  <div className="flex-1 pb-2">
                    <p className={cn("font-serif text-xs", isLatest ? "text-amber-600/80" : "text-stone-500")}>
                      {t.map.session} {idx + 1}
                    </p>
                    <p
                      className={cn(
                        'font-serif text-sm font-semibold leading-snug',
                        isSelected
                          ? isLatest
                            ? 'text-amber-600'
                            : 'text-amber-600/60'
                          : 'text-stone-500',
                      )}
                    >
                      {session.title}
                    </p>
                    <p className={cn("mt-1 font-serif text-xs leading-relaxed", isSelected ? "text-stone-400" : "text-stone-600")}>
                      {session.description}
                    </p>
                  </div>
                </button>
              )
            })}
          </div>
        </SidePanel>

        {/* ── Detail card (POI / Zone) ── */}
        {selectedItem && (
          <div
            className="absolute bottom-6 left-6 z-[1000] w-full max-w-sm touch-none"
            style={{ transform: `translate(${cardOffset.x}px, ${cardOffset.y}px)` }}
            onPointerDown={(e) => {
              if (e.button !== 0) return
              if ((e.target as HTMLElement).closest('button')) return
              e.currentTarget.setPointerCapture(e.pointerId)
              setIsDragging(true)
              dragStartPos.current = {
                x: e.clientX - cardOffset.x,
                y: e.clientY - cardOffset.y,
              }
            }}
            onPointerMove={(e) => {
              if (!isDragging) return
              setCardOffset({
                x: e.clientX - dragStartPos.current.x,
                y: e.clientY - dragStartPos.current.y,
              })
            }}
            onPointerUp={(e) => {
              setIsDragging(false)
              e.currentTarget.releasePointerCapture(e.pointerId)
            }}
            onPointerCancel={(e) => {
              setIsDragging(false)
              e.currentTarget.releasePointerCapture(e.pointerId)
            }}
          >
            <div className={cn(
              "rounded-lg border border-amber-900/40 bg-stone-950/95 p-4 shadow-2xl backdrop-blur-sm select-none",
              isDragging ? "cursor-grabbing" : "cursor-grab"
            )}>
              <button
                onClick={() => {
                  setSelectedItem(null)
                  setHighlightedItemId(null)
                }}
                className="absolute right-3 top-3 text-stone-600 hover:text-stone-300"
              >
                <X size={14} />
              </button>

              {selectedItem.type === 'poi' && (
                <PoiCard
                  poi={selectedItem.data}
                  categoryConfig={categoryConfig}
                  linkedLabel={t.map.linked}
                  sessionLabel={t.map.session}
                />
              )}
              {selectedItem.type === 'zone' && (
                <ZoneCard
                  zone={selectedItem.data}
                  districtLabel={t.map.district}
                  sessionLabel={t.map.session}
                />
              )}
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
  visibleLabel,
  hiddenLabel,
}: {
  label: string
  description: string
  enabled: boolean
  onToggle: () => void
  color: string
  visibleLabel: string
  hiddenLabel: string
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
        {enabled ? visibleLabel : hiddenLabel}
      </button>
    </div>
  )
}

function PoiCard({
  poi,
  categoryConfig,
  linkedLabel,
  sessionLabel,
}: {
  poi: PointOfInterest
  categoryConfig: Record<PoiCategory, { label: string; color: string; badgeVariant: 'amber' | 'red' | 'green' | 'muted' | 'default' }>
  linkedLabel: string
  sessionLabel: string
}) {
  const cfg = categoryConfig[poi.category]
  return (
    <>
      <div className="mb-2 flex flex-wrap items-center gap-2">
        <Badge variant={cfg.badgeVariant}>{cfg.label}</Badge>
        <Badge variant="muted">
          {poi.sessionId.replace('session-', `${sessionLabel} `)}
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
          <span className="text-stone-500">{linkedLabel}: </span>
          {poi.linkedCharacters.join(', ')}
        </p>
      )}
    </>
  )
}

function ZoneCard({
  zone,
  districtLabel,
  sessionLabel,
}: {
  zone: MapZone
  districtLabel: string
  sessionLabel: string
}) {
  return (
    <>
      <div className="mb-2 flex items-center gap-2">
        <span
          className="inline-block h-3 w-3 rounded border border-stone-700"
          style={{ backgroundColor: zone.color, opacity: 0.8 }}
        />
        <Badge variant="muted">{districtLabel}</Badge>
        <Badge variant="muted">
          {zone.sessionId.replace('session-', `${sessionLabel} `)}
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
