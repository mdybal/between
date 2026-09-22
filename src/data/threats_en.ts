import { threats } from './threats'
import type { HtmlString, MaskSection, Threat, ThreatQuestion } from '@/types'

/**
 * English threat text data.
 *
 * This file contains all translatable text fields (name, description,
 * knownFacts, questions) for threats. The id, type, threatLevel, status,
 * firstEncountered, and clueImages fields are stored in threats.ts.
 *
 * The `description` field may contain a small subset of inline HTML
 * (e.g. `<br>`, `<p>`) to allow paragraph / line-break formatting. The
 * renderers consume it via `dangerouslySetInnerHTML` so the tags take
 * effect — never interpolated as plain text, or the tags will appear
 * literally.
 */
export interface ThreatText {
  id: string
  name: string
  description: HtmlString
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
    knownFacts: [
            '1844: Mrs. Brathwaite arrives in London at age twenty-six. She goes on a buying spree, snapping up real estate and businesses that will later be the foundation of her vast fortune. She is the toast of London, and scandalous rumors suggest the young Queen Victoria has taken her as a lover',
    ],
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
        answer: 'In the townhouse on St. James\'s Street, the ghosts of an entire family and their household staff, who lived there 200 years ago, are trapped. The illegitimate child of the master of the house was murdered in a cruel manner and took vengeance on its tormentors from beyond the grave, burning them alive. Now none of them can rest in peace until mortals hear the child\'s story through to the end.',
      },
    ],
    mask: {
      title: 'The Mask of the Unquiet',
      description:
        'Each Hunter narrates a flashback to their childhood when they experienced a haunting.',
    },
  },
  {
    id: 'limehouse-lurker',
    name: 'The Limehouse Lurker',
    description:
      'Jen Johnson, the proprietor of an opium den in Limehouse, tells you a story that has not yet reached Scotland Yard or the papers: three people have been found dead in recent days, the bodies completely exsanguinated. The first was a prostitute called Soft Jimmy, found in a dark corner of the opium den; the second was a young mother, Charla Bell, found in an alleyway behind the Limehouse School; and the third was a Chinese sailor, Zhao Donghai, found outside a pub near the Regent’s Canal Dock, the Dog & Whistle. Jen, an informal community leader in Limehouse, has been keeping the bodies in her basement; she’s hesitant to go to the authorities because she fears it will cause trouble for the small but thriving Chinese immigrant community in the district. She heard that Hargrave House has experience with matters such as this, and has asked for your help.',
    questions: [
      {
        question: 'Is the vampire young or old? (Complexity: 4)',
        answer: 'The vampire was turned many decades (centuries?) ago.',
      },
      {
        question: 'Where is the vampire’s lair? (Complexity: 4)',
        answer: `The vampire has three different lairs in the old, roman tunnels under Opium Den, Limehouse School, and Dog & Whistle. He cannot travel freely between them due to Bazalgette's canal construction. Blood acts strangely when the Lurker is nearby`,
      },
    ],
    mask: {
      title: 'The Mask of the Sun',
      description:'Each Hunter narrates a dream they once had of primordial Earth: back in time across the ancient seas, back in time when the spirits walked, when the Sun was new, and the Old Gods held court.',
    },
  },
  {
    id: 'cremorne-gardens',
    name: 'The Creature of Cremorne Gardens',
    description:
      'That ever-reliable rag, The Illustrated Police News, has lately been carrying stories about the so-called Creature of Cremorne Gardens (sometimes called the Creature of Chelsea Harbor and, more rarely, the Creature of Cheyne Walk). The creature, described as a “fish-like thing” or a “fish man,” has been terrorizing pleasure seekers from the shadows, giving a fright when glimpsed skulking about, but rarely making direct contact. Men and women alike have been lured to the end of a nearby pier by a “strange song” while promenading, though with no memory of how they got there once the song’s “spell” ended. All of this could easily be chalked-up to hysteria, or perhaps some elaborate hoax by someone who resents Cremorne Gardens, if not for a physical attack upon a young couple, Simon Piedmont and Beulah Thrum. Mr. Piedmont and Ms. Thrum described how the creature leapt at them from a crouched position, like a cat, and tore at Ms. Thrum’s coat. Scotland Yard is investigating.',
    questions: [
      {
        question: 'Is the creature real or is it a hoax? (Complexity: 4)',
      },
    ],
    mask: {
      title: 'The Mask of the Revelry',
      description:'Each Hunter narrates a flashback to the last truly fun day they had.',
    },
  },
  {
    id: 'figgs-pigs',
    name: 'Figg`s Pigs',
    description:
      `When enjoying a stroll through the Cremorne Gardens, Singh smelled a delicious aroma of meat pie. Not having eaten a proper breakfast, he followed the scent to a small food stall called "Figg's Pigs". A jovial owner served him and another gentleman, a steaming meat pie. Both enjoyed a few first bites, until they realised with dread that the pie contains human meat! The other man, revelaed to be a Scotland Yard detective jumped the coutnter in pursuit and quickly apprehended the stall owner - Mr. Figgs. During the whole encounter, Mr.Figgs man kept laughing manically and singing about "Three Pigs"<br>
      It soon turned out, that Mr. Figg did not act alone - his whole family was involved in the gruesome business of selling human meat pies. The police raided the Figg's residence but found his wife, Hortencia, and his two sons, Obert and Patrick, long gone. The Hunters must stop the Figgs family before they can continue their grisly business.`,
    questions: [
      {
        question: 'What kind of animal does Patrick Figg think he is? (Complexity: 2)',
      },
      {
        question: 'What type of victim does Obert Figg prefer? (Complexity: 2)',
      },
      {
        question: 'What did La Hortencia Figg lose that she’s trying to recapture or remember? (Complexity: 2)',
      }
    ],
    mask: {
      title: 'The Mask of the Pig',
      description:'Each Hunter narrates a dream about the pagan swine god, Moc’h. Did Moc’h demand a sacrifice of riches, status, or blood? What did they each sacrifice?',
    },
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
