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
    clueImages: ['brathwaite01.png','brathwaite02.png'],
  },
  {
    id: 'james-street-ghost',
    type: 'threat',
    threatLevel: '1-5',
    status: 'active',
    firstEncountered: 'session-01',
    clueImages: ['stjames01.png','stjames02.png','stjames03.png','stjames04.png','stjames05.png','stjames06.png','stjames07.png'],
  },
  {
    id: 'limehouse-lurker',
    type: 'threat',
    threatLevel: '0-5',
    status: 'active',
    firstEncountered: 'session-01',
    clueImages: ['lurker01.png','lurker02.png','lurker03.png','lurker04.png'],
  },
]
