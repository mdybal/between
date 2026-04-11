import type { Session } from '@/types'

export const session01: Session = {
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
  scenes: [
    {
      label: 'Prologue',
      prose: [
        'The letter arrived without postage, slipped beneath three separate doors on the same fog-choked Tuesday morning. Each recipient — a journalist, a physician, and a disgraced inspector — found the same words written in a cramped, urgent hand: "Come to the Diogenes Club. Ask for Mr. Voss. Do not delay."',
        'None of them knew the others. None of them knew Mr. Voss. And yet, by half past nine, all three sat in the club\'s Stranger\'s Room, eyeing one another across a table of cold tea and unanswered questions.',
      ],
    },
    {
      label: 'Scene I — The Diogenes Club',
      prose: [
        'Mr. Voss proved to be a small, precise man with ink-stained fingers and the eyes of someone who had not slept in several days. He spread a map of Whitechapel across the table and pointed to a cluster of marks along the waterfront.',
        'Seven people had vanished from the Wapping docks in the past three weeks. The police had logged them as runaways or river accidents. Voss believed otherwise.',
      ],
      highlightBox: {
        variant: 'clue',
        title: 'Information from Voss',
        items: [
          'Seven disappearances, all within 400 yards of Wapping High Street',
          'Each victim was last seen near Warehouse 14 — now supposedly derelict',
          'A dockworker reported hearing "a sound like a clock running backwards" the night before each disappearance',
          'Voss has a contact — a street child named Pip — who claims to have seen hooded figures',
        ],
      },
    },
    {
      label: 'Scene II — Warehouse 14',
      prose: [
        'The warehouse smelled of river mud and something else — something sweet and wrong, like flowers left too long in standing water. The investigators found the ground floor empty save for scattered crates and a trail of black ichor leading toward a trapdoor.',
        'Below, in a vaulted cellar lit by a single lantern, they found the evidence of ritual: chalk circles, burned offerings, and a brass box engraved with a symbol none of them recognised — an inverted clock face, its hands pointing to the same hour.',
      ],
      highlightBox: {
        variant: 'danger',
        title: 'Encounter — The Rooftop Figure',
        content:
          'As the investigators prepared to leave, a hooded figure was spotted on the warehouse roof. It did not flee. It watched. When Silas raised his lantern, the figure turned and stepped backward off the edge — and was not heard to land.',
      },
    },
    {
      label: 'Scene III — Recovery',
      prose: [
        'The brass cipher-box was taken to Dr. Vane\'s surgery on Harley Street. Initial examination revealed a hidden compartment containing a strip of paper covered in substitution cipher. The cipher remains unsolved.',
      ],
      highlightBox: {
        variant: 'clue',
        title: 'Item Recovered — The Brass Cipher-Box',
        content:
          'A small brass box, approximately 4 inches by 2 inches. The lid bears an inverted clock symbol. Inside: a folded strip of paper in substitution cipher, and traces of the same black ichor found on the warehouse floor. The box itself appears to be of recent manufacture, despite its antique styling.',
      },
    },
    {
      label: 'Session Notes',
      prose: [],
      highlightBox: {
        variant: 'note',
        title: 'Session Notes',
        content:
          'First session. Players established their characters\' voices well — Evelyn\'s instinct to photograph everything, Vane\'s clinical detachment masking genuine unease, Silas\'s professional scepticism cracking at the rooftop encounter. The cipher-box will be the thread into Session 2.',
      },
    },
  ],
}
