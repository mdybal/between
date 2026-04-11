// ─── Session / Actual Play ────────────────────────────────────────────────────

type HighlightVariant = 'clue' | 'danger' | 'note' | 'lore'

export interface ScenePullQuote {
  text: string
  attribution?: string
}

export interface SceneHighlightBox {
  variant: HighlightVariant
  title?: string
  items?: string[]
  content?: string
}

export interface Scene {
  label: string
  prose: string[]
  highlightBox?: SceneHighlightBox
  pullQuote?: ScenePullQuote
}

export interface Session {
  id: string
  sessionNumber: number
  title: string
  date: string          // ISO date string, e.g. "1893-10-14"
  summary: string
  highlights: string[]
  players?: string[]
  tags?: string[]
  scenes?: Scene[]
}

// ─── Character ────────────────────────────────────────────────────────────────

export type CharacterType = 'hunter' | 'npc'

export type NpcSubtype = 'neutral' | 'antagonist' | 'ally'

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

/**
 * Base character fields stored in src/data/characters.ts.
 * Non-text fields only (text fields are merged in from characters_en.ts / characters_pl.ts).
 */
export interface CharacterBase {
  id: string
  type: CharacterType
  subtype?: NpcSubtype   // only relevant when type === 'npc'
  status?: 'active' | 'retired'
  imageUrl?: string
  portraitUrl?: string
  privateQuarters?: PrivateQuartersItem[]
  masks?: MaskGroup[]
}

/**
 * Full character with translatable text fields.
 * Produced by merging CharacterBase with data from characters_en.ts / characters_pl.ts.
 */
export interface Character extends CharacterBase {
  name: string
  alias?: string
  occupation: string
  description: string
  background: string
  traits: string[]
  conditions?: string[]
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

/**
 * Threat level in format "filled-total" (e.g., "2-4" means 2 filled circles out of 4)
 */
export type ThreatLevel = string // e.g., "2-4", "1-3", "0-5"

/**
 * Base threat fields stored in src/data/threats.ts.
 * Non-text fields only (text fields are merged in from threats_en.ts / threats_pl.ts).
 */
export interface ThreatBase {
  id: string
  type: 'mastermind' | 'threat'
  threatLevel?: ThreatLevel
  status: 'active' | 'neutralised' | 'unknown'
  firstEncountered?: string
  clueImages?: string[]
}

/**
 * Full threat with translatable text fields.
 * Produced by merging ThreatBase with data from threats_en.ts / threats_pl.ts.
 */
export interface Threat extends ThreatBase {
  name: string
  description: string
  knownFacts: string[]
  suspicions: string[]
}
