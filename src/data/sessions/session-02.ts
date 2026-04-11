import type { Session } from '@/types'

export const session02: Session = {
  id: 'session-02',
  sessionNumber: 2,
  title: 'The Clockwork Séance',
  date: '1893-10-14',
  summary:
    'Following the cipher-box clues, the investigators attend a fashionable séance in Mayfair, only to find the medium dead and the guests in a state of supernatural terror. The parlour hides more than candlelight and velvet.',
  highlights: [
    "Infiltration of Lady Pemberton's soirée",
    "The medium's final, horrifying message",
    'Discovery of the hidden passage behind the fireplace',
    'First mention of "The Architect of Ruin"',
  ],
  players: ['Evelyn Ashworth', 'Dr. Cornelius Vane', 'Silas Morrow'],
  tags: ['mayfair', 'séance', 'mastermind'],
  scenes: [
    {
      label: 'Previously…',
      prose: [
        'The investigators recovered a brass cipher-box from a derelict warehouse in Wapping, witnessed a hooded figure vanish from a rooftop, and began decoding a substitution cipher that pointed toward a fashionable address in Mayfair.',
      ],
    },
    {
      label: 'Scene I — Lady Pemberton\'s Soirée',
      prose: [
        'The cipher resolved to an address: 14 Cavendish Square, and a date — the following Thursday. Evelyn secured invitations through her editor\'s connections. The soirée was hosted by Lady Cecilia Pemberton, a widow of considerable means and, it emerged, considerable credulity regarding the supernatural.',
        'The evening\'s entertainment was a séance conducted by one Madame Isolde, a medium of Continental reputation. Thirty guests gathered in the darkened drawing room. The investigators positioned themselves at different points around the table.',
      ],
      pullQuote: {
        text: 'He is here. He has always been here. He calls himself the Architect, and he says — he says you should not have opened the box.',
        attribution: 'Madame Isolde, moments before her death',
      },
    },
    {
      label: 'Scene II — The Medium\'s Death',
      prose: [
        'Madame Isolde died at the table. No wound, no poison — the physician present could find no cause. Her eyes were open and her expression was one of absolute terror. In her clenched fist, the investigators found a playing card: the Architect of a standard tarot deck, defaced with the same inverted clock symbol from the cipher-box.',
      ],
      highlightBox: {
        variant: 'danger',
        title: 'Incident — Death of Madame Isolde',
        content:
          'Cause of death: unknown. No physical trauma. The medium appeared to die of fright during the séance. Metropolitan Police were called; the investigators have approximately 20 minutes before their presence becomes difficult to explain.',
      },
    },
    {
      label: 'Scene III — The Hidden Passage',
      prose: [
        'While the other guests were occupied with the police\'s arrival, Silas noticed a draught from behind the fireplace. A concealed door, operated by a mechanism hidden in the mantelpiece carving, opened onto a narrow passage leading to a basement room.',
        'The room had been used recently. A writing desk held correspondence in the same cipher as the box. A locked cabinet contained three items: a photograph of a man the investigators did not recognise, a vial of black ichor, and a folded letter addressed simply to "When They Come."',
      ],
      highlightBox: {
        variant: 'clue',
        title: 'Items Found in the Hidden Room',
        items: [
          "Correspondence in the same substitution cipher — partially decoded, references \"the Architect's design\" and a date six weeks hence",
          'A photograph: a tall man in formal dress, face partially obscured, standing before what appears to be a large mechanical device',
          'A vial of black ichor — identical to the substance found in Wapping',
          'A sealed letter addressed "When They Come" — the investigators chose not to open it',
        ],
      },
    },
    {
      label: 'Lore',
      prose: [],
      highlightBox: {
        variant: 'lore',
        title: 'First Mention — The Architect of Ruin',
        content:
          'The name "The Architect of Ruin" appears for the first time in the decoded correspondence. The phrase is used reverentially, as a title rather than a description. Whoever — or whatever — this entity is, those who serve it do so with devotion bordering on worship.',
      },
    },
    {
      label: 'Session Notes',
      prose: [],
      highlightBox: {
        variant: 'note',
        title: 'Session Notes',
        content:
          'The séance scene landed well — the moment of Isolde\'s death was genuinely unsettling. The players are now invested in the Architect mystery. The sealed letter is a good dangling thread; they\'ll want to open it eventually. Lady Pemberton\'s reaction to the hidden room (genuine shock, or performance?) is worth developing.',
      },
    },
  ],
}
