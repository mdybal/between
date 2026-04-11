import type { Threat } from '@/types'

/**
 * Threat data containing non-text fields (id, type, threatLevel, status,
 * firstEncountered, clueImages). Text fields (name, description, knownFacts,
 * suspicions) are stored in threats_en.ts (English) and can be translated
 * for other languages.
 */
export const threats: Threat[] = [
  {
    id: 'architect-of-ruin',
    type: 'mastermind',
    threatLevel: '5-5',
    status: 'active',
    firstEncountered: 'session-02',
    clueImages: ['brathwaite01.svg','brathwaite01.svg','brathwaite03.svg','brathwaite01.svg'],
  },
  {
    id: 'the-hollow-congregation',
    type: 'cult',
    threatLevel: '2-4',
    status: 'active',
    firstEncountered: 'session-01',
  },
]
