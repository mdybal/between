import type { PointOfInterest, MapZone, MapSession } from '@/types'
import rawData from './mapData.json'

// Image dimensions: 3500 × 1952 px
// Coords are [y, x] in pixel space (Leaflet uses [lat, lng] → [y, x])
//
// Data model notes:
//   - Each (id, sessionId) pair is unique.
//   - Multiple entries with the same id but different sessionId represent
//     how that element evolves across sessions (e.g. a location changes state).
//   - sessionId is required on all POIs and Zones.

export const mapSessions: MapSession[] = rawData.sessions as MapSession[]

export const pointsOfInterest: PointOfInterest[] = rawData.pointsOfInterest as PointOfInterest[]

export const mapZones: MapZone[] = rawData.zones as MapZone[]
