import type { ThreatBase } from '@/types'

/**
 * Threat data containing non-text fields (id, type, threatLevel, status,
 * firstEncountered, clueImages). Text fields (name, description, knownFacts,
 * suspicions) are stored in threats_en.ts (English) and can be translated
 * for other languages.
 */
export const threats: ThreatBase[] = [
  {
    id: 'mastermind-conspiracy',
    type: 'mastermind',
    status: 'active',
    firstEncountered: 'session-01',
    //clueImages: ['brathwaite01.svg','brathwaite01.svg','brathwaite03.svg','brathwaite01.svg'],
  },
  {
    id: 'james-street-ghost',
    type: 'threat',
    threatLevel: '0-5',
    status: 'active',
    firstEncountered: 'session-01',
  },
]
