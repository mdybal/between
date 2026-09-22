/**
 * Session base data containing non-text fields (id, sessionNumber, date,
 * tags, npcIds). Text fields (title, summary, scenes) are stored in
 * sessions_en.ts (English) and can be translated for other languages.
 */
export interface SessionBase {
  id: string
  sessionNumber: number
  date: string
  npcIds?: string[]
  tags?: string[]
}

export const sessions: SessionBase[] = [
  {
    id: 'session-01',
    sessionNumber: 1,
    date: '2026-04-19',
    npcIds: ['theodora-brathwaite', 'harold-beale', 'alice-beale', 'roger-beale', 'mary-alice-beale','irma-thicket','pythagoras', 'constance-head', 'chen-bao', 'sun-mask', 'red-katherine','big-bertha'],
  },
  {
    id: 'session-02',
    sessionNumber: 2,
    date: '2026-07-17',
    npcIds: ['theodora-brathwaite', 'mary-alice-beale','pythagoras', 'sun-mask', 'franklin-horsford','beulah-thrum','thomas-simpson','limehouse-lurker','franklin-horsford','elma-thorpe','lin-bohai'],
  },
  {
    id: 'session-03',
    sessionNumber: 3,
    date: '2026-09-22',
    npcIds: ['limehouse-lurker', 'mr-figgs', 'dj-pettigrew', 'greco', 'hortencia-figgs', 'abel-knox', 'lawrence-chesterfield'],
  },
]