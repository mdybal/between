// ─── Session / Actual Play ────────────────────────────────────────────────────

export interface Session {
  id: string
  sessionNumber: number
  title: string
  date: string          // ISO date string, e.g. "1893-10-14"
  summary: string
  highlights: string[]
  players?: string[]
  tags?: string[]
}

// ─── Character ────────────────────────────────────────────────────────────────

export type CharacterType = 'hunter' | 'npc' | 'ally' | 'antagonist'

export interface PrivateQuartersItem {
  name: string
  used: boolean
}

export interface MaskEntry {
  name: string
  used: boolean
}

export interface MaskGroup {
  category: string        // e.g. "Mask of Past", "Mask of Junos"
  masks: MaskEntry[]
}

export interface Character {
  id: string
  name: string
  alias?: string
  type: CharacterType
  occupation: string
  description: string
  background: string
  traits: string[]
  conditions?: string[]
  privateQuarters?: PrivateQuartersItem[]
  masks?: MaskGroup[]
  imageUrl?: string
  status: 'active' | 'deceased' | 'missing' | 'unknown'
}

// ─── Map ─────────────────────────────────────────────────────────────────────

export type PoiCategory =
  | 'location'
  | 'crime-scene'
  | 'safe-house'
  | 'danger'
  | 'clue'
  | 'unknown'

/**
 * State of a map element within a given session snapshot.
 * - 'active'   → shown normally
 * - 'disabled' → shown greyed-out (still visible but inactive)
 * - 'removed'  → hidden from view entirely
 */
export type MapElementState = 'active' | 'disabled' | 'removed'

/**
 * A map session snapshot.  The id must match the sessionId used on POIs/Zones.
 * Multiple POI/Zone entries can share the same logical id but differ by sessionId,
 * representing how that element evolves across sessions.
 */
export interface MapSession {
  id: string       // e.g. "session-01"
  title: string
  description: string
}

export interface PointOfInterest {
  id: string
  name: string
  category: PoiCategory
  description: string
  /** [y, x] in image-pixel coordinates (origin top-left) */
  coords: [number, number]
  /** Which session this entry belongs to */
  sessionId: string
  state: MapElementState
  linkedCharacters?: string[]
}

export interface MapZone {
  id: string
  name: string
  description: string
  color: string        // hex or css colour used for the polygon fill
  /** Array of [y, x] pixel coordinate pairs */
  polygon: [number, number][]
  /** Which session this entry belongs to */
  sessionId: string
  state: MapElementState
}

// ─── Threat / Mastermind ──────────────────────────────────────────────────────

export type ThreatLevel = 'minor' | 'moderate' | 'severe' | 'catastrophic'

export interface Threat {
  id: string
  name: string
  type: 'mastermind' | 'cult' | 'creature' | 'conspiracy' | 'supernatural'
  threatLevel: ThreatLevel
  description: string
  knownFacts: string[]
  suspicions: string[]
  status: 'active' | 'neutralised' | 'unknown'
  firstEncountered?: string  // session id
  clueImages?: string[]      // filenames from public/img/clues/
}
