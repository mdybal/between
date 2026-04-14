import { threats } from './threats'
import type { MaskSection, Threat, ThreatQuestion } from '@/types'

/**
 * English threat text data.
 *
 * This file contains all translatable text fields (name, description,
 * knownFacts, questions) for threats. The id, type, threatLevel, status,
 * firstEncountered, and clueImages fields are stored in threats.ts.
 */
export interface ThreatText {
  id: string
  name: string
  description: string
  knownFacts?: string[]
  questions: ThreatQuestion[]
  mask?: MaskSection
}

export const threatsEn: ThreatText[] = [
  {
    id: 'architect-of-ruin',
    name: 'The Architect of Ruin',
    description:
      'A shadowy figure who appears to be orchestrating a grand design across London\'s underworld and high society alike. Their true identity and ultimate goal remain unknown.',
    knownFacts: [
      'Communicates through intermediaries and coded messages',
      'Has agents embedded in both the criminal underworld and aristocracy',
      'Possesses knowledge of pre-Victorian occult rituals',
      'Referenced in the cipher-box recovered from Wapping',
    ],
    questions: [
      {
        question: 'May be connected to a series of disappearances dating back to 1887',
      },
      {
        question: 'Possibly a former member of a secret society',
      },
      {
        question: 'The brass cipher-box may be a key to their identity',
      },
    ],
    mask: {
      title: 'The Mask of the Architect',
      description:
        'A finely crafted brass mask adorned with intricate engravings and a single, unblinking eye. It is said to grant the wearer insight into hidden truths, but at a cost.',
    },
  },
  {
    id: 'the-hollow-congregation',
    name: 'The Hollow Congregation',
    description:
      'A cult operating out of the Whitechapel docks, performing rituals that seem designed to thin the boundary between the living world and something else entirely.',
    knownFacts: [
      'Use black ichor as part of their rituals',
      'Wear hooded robes bearing a symbol of an inverted clock',
      'Have been active for at least six months',
      'Recruit from the desperate and destitute of the East End',
    ],
    questions: [
      {
        question: 'May be taking orders from The Architect of Ruin',
      },
      {
        question: 'Their rituals may be summoning or feeding something',
      },
      {
        question: 'A member may have infiltrated the Metropolitan Police',
      },
    ],
  },
]

/**
 * Merges threat base data with English text to produce full Threat objects.
 */
export function getThreatsEn(): Threat[] {
  return threats.map((threat) => {
    const text = threatsEn.find((t) => t.id === threat.id)
    if (!text) {
      throw new Error(`Missing English text for threat: ${threat.id}`)
    }
    return {
      ...threat,
      name: text.name,
      description: text.description,
      knownFacts: text.knownFacts,
      questions: text.questions,
      mask: text.mask,
    }
  })
}
