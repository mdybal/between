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

export type CharacterType = 'player' | 'npc' | 'ally' | 'antagonist'

export interface Character {
  id: string
  name: string
  alias?: string
  type: CharacterType
  occupation: string
  description: string
  background: string
  traits: string[]
  imageUrl?: string
  status: 'active' | 'deceased' | 'missing' | 'unknown'
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
}
