import type { Threat } from '@/types'

export const threats: Threat[] = [
  {
    id: 'architect-of-ruin',
    name: 'The Architect of Ruin',
    type: 'mastermind',
    threatLevel: 'catastrophic',
    description:
      'A shadowy figure who appears to be orchestrating a grand design across London\'s underworld and high society alike. Their true identity and ultimate goal remain unknown.',
    knownFacts: [
      'Communicates through intermediaries and coded messages',
      'Has agents embedded in both the criminal underworld and aristocracy',
      'Possesses knowledge of pre-Victorian occult rituals',
      'Referenced in the cipher-box recovered from Wapping',
    ],
    suspicions: [
      'May be connected to a series of disappearances dating back to 1887',
      'Possibly a former member of a secret society',
      'The brass cipher-box may be a key to their identity',
    ],
    status: 'active',
    firstEncountered: 'session-02',
  },
  {
    id: 'the-hollow-congregation',
    name: 'The Hollow Congregation',
    type: 'cult',
    threatLevel: 'severe',
    description:
      'A cult operating out of the Whitechapel docks, performing rituals that seem designed to thin the boundary between the living world and something else entirely.',
    knownFacts: [
      'Use black ichor as part of their rituals',
      'Wear hooded robes bearing a symbol of an inverted clock',
      'Have been active for at least six months',
      'Recruit from the desperate and destitute of the East End',
    ],
    suspicions: [
      'May be taking orders from The Architect of Ruin',
      'Their rituals may be summoning or feeding something',
      'A member may have infiltrated the Metropolitan Police',
    ],
    status: 'active',
    firstEncountered: 'session-01',
  },
]
