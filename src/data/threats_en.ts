import { threats } from './threats'
import type { Threat, ThreatQuestion } from '@/types'

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
        answer: "Test"
      },
    ],
  },
  {
    id: 'james-street-ghost',
    name: 'The St. James\'s Street Ghost',
    description:
      'A back issue of The Illustrated Police News, a tabloid notorious for carrying salacious, blood-curdling tales of dubious provenance, has a story about a young maid, Ginny Hess, who was found dead— apparently from shock—in her employer’s St. James’s Street townhouse some months ago. The story claims the townhouse is haunted, and that it was almost certainly the appearance of a ghost that caused the young maid to die of fright. After a cursory inquiry, you learn the precise address of the haunting, 18 St. James’s Street, and the name of the family that lives there, the Beales.',
    questions: [
      {
        question: 'How can we get this ghost to pass on to the next world? (Complexity: 6)',
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
    }
  })
}
