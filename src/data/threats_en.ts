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
    id: 'mastermind-conspiracy',
    name: 'Theodora Brathwaite’s Conspiracy',
    description:
      'Theodora Brathwaite is pondering an enormous map of London mounted to the study wall. There are brass pins shaped like daggers marking out various places in the city, locations important for some grand scheme (one might notice a pin on Hargrave House). Suddenly she stands up, crosses the room, and plunges one of the brass daggers into Buckingham Palace',
    /*knownFacts: [
            'Referenced in the cipher-box recovered from Wapping',
    ],*/
    questions: [
      {
        question: 'How does the Mastermind intend to destroy the Crown? (Complexity: 8)',
      }
    ],
    mask: {
      title: 'The Mask of the Architect',
      description:
        'A finely crafted brass mask adorned with intricate engravings and a single, unblinking eye. It is said to grant the wearer insight into hidden truths, but at a cost.',
    },
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
      mask: text.mask,
    }
  })
}
