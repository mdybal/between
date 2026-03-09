import type { PointOfInterest, MapZone, MapSession } from '@/types'

// Image dimensions: 3500 × 1952 px
// Coords are [y, x] in pixel space (Leaflet uses [lat, lng] → [y, x])
//
// Data model notes:
//   - Each (id, sessionId) pair is unique.
//   - Multiple entries with the same id but different sessionId represent
//     how that element evolves across sessions (e.g. a location changes state).
//   - sessionId is required on all POIs and Zones.

// ─── Sessions ─────────────────────────────────────────────────────────────────

export const mapSessions: MapSession[] = [
  {
    id: 'session-01',
    title: 'Session I — The First Body',
    description:
      'The investigators are drawn together by a gruesome discovery in Whitechapel. Lady Pemberton makes contact.',
  },
  {
    id: 'session-02',
    title: 'Session II — Into the Fog',
    description:
      'Following leads into the East End, the group uncovers evidence of a cult operating out of a Limehouse warehouse.',
  },
  {
    id: 'session-03',
    title: 'Session III — The Southwark Shipment',
    description:
      'A suspicious cargo arrives at the docks. The warehouse is raided — but the cult has already moved on.',
  },
]

// ─── Points of Interest ───────────────────────────────────────────────────────

export const pointsOfInterest: PointOfInterest[] = [
  // ── Whitechapel Mortuary ── introduced session-01, becomes disabled session-02
  {
    id: 'whitechapel-mortuary',
    name: 'Whitechapel Mortuary',
    category: 'crime-scene',
    description:
      'The site where the first victim was discovered. Strange symbols were carved into the stone floor beneath the body.',
    coords: [980, 2100],
    sessionId: 'session-01',
    state: 'active',
    linkedCharacters: ['cornelius-vane'],
  },
  {
    id: 'whitechapel-mortuary',
    name: 'Whitechapel Mortuary',
    category: 'crime-scene',
    description:
      'The mortuary has been cleared by police. The symbols were scrubbed away — someone with influence intervened.',
    coords: [980, 2100],
    sessionId: 'session-03',
    state: 'active',
    linkedCharacters: ['cornelius-vane'],
  },

  // ── Lady Pemberton's Townhouse ── active throughout
  {
    id: 'lady-pemberton-townhouse',
    name: "Lady Pemberton's Townhouse",
    category: 'location',
    description:
      'A grand Mayfair residence that serves as a nexus of rumour and intrigue. The investigators were first invited here in Session 1.',
    coords: [700, 1200],
    sessionId: 'session-01',
    state: 'active',
    linkedCharacters: ['lady-pemberton'],
  },
  {
    id: 'lady-pemberton-townhouse',
    name: "Lady Pemberton's Townhouse",
    category: 'location',
    description:
      'Lady Pemberton has gone quiet. Her butler claims she is "indisposed." The curtains remain drawn.',
    coords: [700, 1200],
    sessionId: 'session-02',
    state: 'removed', 
    linkedCharacters: ['lady-pemberton'],
  },

  // ── Dr. Vane's Practice ── safe house, stable
  {
    id: 'vane-harley-street',
    name: "Dr. Vane's Harley Street Practice",
    category: 'safe-house',
    description:
      'The consulting rooms of Dr. Cornelius Vane. A respectable front concealing a library of occult research.',
    coords: [620, 1050],
    sessionId: 'session-01',
    state: 'active',
    linkedCharacters: ['cornelius-vane'],
  },
  {
    id: 'vane-harley-street',
    name: "Dr. Vane's Harley Street Practice",
    category: 'safe-house',
    description:
      'The practice has been broken into. Files are scattered. Vane suspects the cult knows who he is.',
    coords: [620, 1050],
    sessionId: 'session-02',
    state: 'disabled',
    linkedCharacters: ['cornelius-vane'],
  },
  {
    id: 'vane-harley-street',
    name: "Dr. Vane's Harley Street Practice",
    category: 'safe-house',
    description:
      'Vane has abandoned the practice and relocated. The rooms are empty — a precaution after the break-in.',
    coords: [620, 1050],
    sessionId: 'session-03',
    state: 'removed',
    linkedCharacters: ['cornelius-vane'],
  },

  // ── Limehouse Warehouse ── introduced session-02, removed session-03
  {
    id: 'east-end-warehouse',
    name: 'Abandoned Warehouse, Limehouse',
    category: 'danger',
    description:
      'A derelict warehouse near the docks where cult activity has been reported. Approach with extreme caution.',
    coords: [1100, 2600],
    sessionId: 'session-02',
    state: 'active',
  },
  {
    id: 'east-end-warehouse',
    name: 'Abandoned Warehouse, Limehouse',
    category: 'danger',
    description:
      'The warehouse was raided and found empty. The cult cleared out before the investigators arrived.',
    coords: [1100, 2600],
    sessionId: 'session-03',
    state: 'removed',
  },

  // ── Illustrated London News Office ── stable across all sessions
  {
    id: 'illustrated-london-news',
    name: 'Illustrated London News Office',
    category: 'location',
    description:
      "Evelyn Ashworth's place of employment. The archive here holds records stretching back decades.",
    coords: [800, 900],
    sessionId: 'session-01',
    state: 'active',
    linkedCharacters: ['evelyn-ashworth'],
  },

  // ── Fog Alley ── clue introduced session-02
  {
    id: 'fog-alley',
    name: 'Fog Alley',
    category: 'clue',
    description:
      'A narrow passage where a witness reported seeing a figure that "moved like smoke." A torn piece of black fabric was recovered here.',
    coords: [1300, 1800],
    sessionId: 'session-02',
    state: 'active',
  },
  {
    id: 'fog-alley',
    name: 'Fog Alley',
    category: 'clue',
    description:
      'The alley has been thoroughly searched. Nothing further was found, but locals refuse to walk through it after dark.',
    coords: [1300, 1800],
    sessionId: 'session-03',
    state: 'disabled',
  },

  // ── Silas Morrow's Office ── stable
  {
    id: 'morrow-office',
    name: "Silas Morrow's Office",
    category: 'safe-house',
    description:
      'A cramped but functional office in Clerkenwell. Morrow keeps his informant ledger and case files here.',
    coords: [750, 1400],
    sessionId: 'session-01',
    state: 'active',
    linkedCharacters: ['silas-morrow'],
  },

  // ── Southwark Dock ── introduced session-03
  {
    id: 'river-thames-dock',
    name: 'Suspicious Dock, Southwark',
    category: 'danger',
    description:
      'Cargo manifests suggest unusual shipments arriving here at irregular hours. The dock master refuses to speak.',
    coords: [1400, 2000],
    sessionId: 'session-02',
    state: 'active',
  },
  {
    id: 'river-thames-dock',
    name: 'Suspicious Dock, Southwark',
    category: 'danger',
    description:
      'The shipment has arrived. Crates bearing occult markings were unloaded under cover of darkness. The dock master has vanished.',
    coords: [1400, 2000],
    sessionId: 'session-03',
    state: 'disabled',
  },
]

// ─── Zones ────────────────────────────────────────────────────────────────────

export const mapZones: MapZone[] = [
  // ── Mayfair ── introduced session-01
  {
    id: 'mayfair',
    name: 'Mayfair',
    description: 'The wealthy heart of London. Aristocrats, politicians, and hidden conspiracies.',
    color: '#b45309',
    polygon: [
      [550, 900],
      [550, 1300],
      [850, 1300],
      [850, 900],
    ],
    sessionId: 'session-01',
    state: 'active',
  },
  {
    id: 'mayfair',
    name: 'Mayfair',
    description:
      'Mayfair grows quiet. Several of Lady Pemberton\'s associates have left the city without explanation.',
    color: '#b45309',
    polygon: [
      [550, 900],
      [550, 1300],
      [850, 1300],
      [850, 900],
    ],
    sessionId: 'session-02',
    state: 'disabled',
  },

  // ── East End ── introduced session-01, becomes danger zone session-02
  {
    id: 'east-end',
    name: 'East End',
    description:
      'The fog-choked streets of Whitechapel and Stepney. Poverty, crime, and something far worse lurk here.',
    color: '#991b1b',
    polygon: [
      [850, 1800],
      [850, 2700],
      [1350, 2700],
      [1350, 1800],
    ],
    sessionId: 'session-01',
    state: 'active',
  },
  {
    id: 'east-end',
    name: 'East End',
    description:
      'Cult activity confirmed in Limehouse. The East End is now considered extremely dangerous after dark.',
    color: '#991b1b',
    polygon: [
      [850, 1800],
      [850, 2700],
      [1350, 2700],
      [1350, 1800],
    ],
    sessionId: 'session-02',
    state: 'active',
  },

  // ── City of London ── introduced session-01
  {
    id: 'city-of-london',
    name: 'City of London',
    description:
      'The financial district. Ancient institutions hide older secrets beneath their marble facades.',
    color: '#1e40af',
    polygon: [
      [700, 1300],
      [700, 1800],
      [1100, 1800],
      [1100, 1300],
    ],
    sessionId: 'session-01',
    state: 'active',
  },

  // ── Southwark ── introduced session-02, becomes active danger session-03
  {
    id: 'southwark',
    name: 'Southwark',
    description:
      'South of the Thames. Theatres, tanneries, and the docks where strange cargo arrives by night.',
    color: '#065f46',
    polygon: [
      [1200, 1300],
      [1200, 2200],
      [1650, 2200],
      [1650, 1300],
    ],
    sessionId: 'session-02',
    state: 'active',
  },
  {
    id: 'southwark',
    name: 'Southwark',
    description:
      'The cult\'s shipment has arrived in Southwark. The docks are now a primary area of investigation.',
    color: '#065f46',
    polygon: [
      [200, 1300],
      [1200, 2200],
      [1650, 2200],
      [1650, 1300],
    ],
    sessionId: 'session-03',
    state: 'active',
  },
]
