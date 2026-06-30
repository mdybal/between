import type { ThreatBase } from '@/types'

/**
 * Threat data containing non-text fields (id, type, threatLevel, status,
 * firstEncountered, clueImages, usedClues). Text fields (name, description,
 * knownFacts, suspicions) are stored in threats_en.ts (English) and can be
 * translated for other languages.
 */
export const threats: ThreatBase[] = [
  {
    id: 'mastermind-conspiracy',
    type: 'mastermind',
    status: 'active',
    firstEncountered: 'session-01',
    clueImages: ['brathwaite01.png','brathwaite02.png', 'brathwaite03.png'],
  },
  {
    id: 'cremorne-gardens',
    type: 'threat',
    threatLevel: '1-5',
    status: 'active',
    firstEncountered: 'session-02',
    clueImages: ['cremorne01.png','cremorne02.png'],
  },
  {
    id: 'james-street-ghost',
    type: 'threat',
    threatLevel: '2-5',
    status: 'neutralised',
    firstEncountered: 'session-01',
    resolvedDate: 'session-02',
    clueImages: ['stjames01.png','stjames02.png','stjames03.png','stjames04.png','stjames05.png','stjames06.png','stjames07.png'],
    usedClues: ['stjames01.png','stjames02.png','stjames03.png','stjames04.png','stjames05.png','stjames06.png','stjames07.png']
  },
  {
    id: 'limehouse-lurker',
    type: 'threat',
    threatLevel: '2-5',
    status: 'active',
    firstEncountered: 'session-01',
    clueImages: ['lurker01.png','lurker02.png','lurker03.png','lurker04.png','lurker05.png','lurker06.png','lurker07.png','lurker08.png','lurker09.png','lurker10.png'],
    usedClues: ['lurker02.png','lurker04.png','lurker05.png','lurker09.png','lurker07.png','lurker08.png']
  },
]
