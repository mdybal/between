import type { Session } from '@/types'

export const sessions: Session[] = [
  {
    id: 'session-01',
    sessionNumber: 1,
    title: 'Fog on the Thames',
    date: '1893-10-07',
    summary:
      'The investigators are drawn together by a series of peculiar disappearances near the Whitechapel docks. A cryptic letter leads them to a derelict warehouse where they discover evidence of occult rituals and a trail of black ichor.',
    highlights: [
      'First meeting of the investigators at the Diogenes Club',
      'Discovery of the warehouse on Wapping High Street',
      'Encounter with the hooded figure on the rooftop',
      'Recovery of the brass cipher-box',
    ],
    players: ['Evelyn Ashworth', 'Dr. Cornelius Vane', 'Silas Morrow'],
    tags: ['introduction', 'whitechapel', 'occult'],
  },
  {
    id: 'session-02',
    sessionNumber: 2,
    title: 'The Clockwork Séance',
    date: '1893-10-14',
    summary:
      'Following the cipher-box clues, the investigators attend a fashionable séance in Mayfair, only to find the medium dead and the guests in a state of supernatural terror. The parlour hides more than candlelight and velvet.',
    highlights: [
      'Infiltration of Lady Pemberton\'s soirée',
      'The medium\'s final, horrifying message',
      'Discovery of the hidden passage behind the fireplace',
      'First mention of "The Architect of Ruin"',
    ],
    players: ['Evelyn Ashworth', 'Dr. Cornelius Vane', 'Silas Morrow'],
    tags: ['mayfair', 'séance', 'mastermind'],
  },
]
