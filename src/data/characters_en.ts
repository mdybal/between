import { characters } from './characters'
import type { Character } from '@/types'

/**
 * English character text data.
 *
 * This file contains all translatable text fields (name, alias, occupation,
 * description, background, traits, conditions, masks[].category,
 * masks[].masks[].name). The non-text fields (id, type, subtype, imageUrl,
 * status, used flags) are stored in characters.ts.
 */
export interface CharacterText {
  id: string
  name: string
  alias?: string
  occupation: string
  description: string
  background: string
  traits: string[]
  conditions?: string[]
  masks?: { category: string; masks: { name: string }[] }[]
}

export const charactersEn: CharacterText[] = [
  {
    id: 'evelyn-ashworth',
    name: 'Evelyn Ashworth',
    occupation: 'Investigative Journalist',
    description:
      'A sharp-tongued correspondent for The Illustrated London News, Evelyn uses her press credentials to go where others dare not.',
    background:
      'Born to a respectable but impoverished family in Bath, Evelyn clawed her way into Fleet Street through sheer tenacity. Her investigations into the East End slums brought her into contact with the strange and the terrible.',
    traits: ['Perceptive', 'Stubborn', 'Compassionate', 'Reckless'],
    conditions: ['Shaken', 'Obsessed'],
    masks: [
      {
        category: 'Mask of Past',
        masks: [
          { name: 'The Grieving Daughter' },
          { name: 'The Street Urchin' },
          { name: 'The Debutante' },
        ],
      },
      {
        category: 'Mask of Junos',
        masks: [
          { name: 'The Fearless Reporter' },
          { name: 'The Socialite' },
        ],
      },
    ],
  },
  {
    id: 'cornelius-vane',
    name: 'Dr. Cornelius Vane',
    alias: 'The Doctor',
    occupation: 'Alienist & Occult Scholar',
    description:
      'A physician of the mind who has seen too much to dismiss the supernatural. His Harley Street practice is a front for deeper research.',
    background:
      'Trained in Vienna under Charcot, Vane returned to London haunted by what he witnessed in the asylums of Europe. He now studies the intersection of madness and the occult.',
    traits: ['Methodical', 'Secretive', 'Empathetic', 'Haunted'],
    conditions: ['Haunted'],
    masks: [
      {
        category: 'Mask of Past',
        masks: [
          { name: 'The Grieving Widower' },
          { name: 'The Eager Student' },
          { name: 'The Broken Soldier' },
        ],
      },
      {
        category: 'Mask of Junos',
        masks: [
          { name: 'The Respectable Physician' },
          { name: 'The Occult Seeker' },
        ],
      },
    ],
  },
  {
    id: 'silas-morrow',
    name: 'Silas Morrow',
    occupation: 'Former Inspector, Metropolitan Police',
    description:
      'Dismissed from the force after reporting supernatural occurrences, Silas now operates as a private inquiry agent with nothing left to lose.',
    background:
      "Twenty years on the force left Silas with a network of informants and a deep distrust of authority. The case that ended his career also opened his eyes to what lurks beneath London's respectable surface.",
    traits: ['Tenacious', 'Cynical', 'Loyal', 'Weathered'],
    conditions: [],
    masks: [
      {
        category: 'Mask of Past',
        masks: [
          { name: 'The Loyal Constable' },
          { name: 'The Haunted Detective' },
          { name: 'The Disgraced Inspector' },
        ],
      },
      {
        category: 'Mask of Junos',
        masks: [
          { name: 'The Gruff Informant' },
          { name: 'The Weary Veteran' },
        ],
      },
    ],
  },
  {
    id: 'theodora-brathwaite',
    name: 'Theodora Brathwaite',
    occupation: 'The Mastermind',
    description:
      'Theodora Brathwaite is a stately, middle-aged black woman, always impeccably dressed and never seen without her signature sapphire choker.',
    background:
      "She is a native of Montserrat, and a completely self-made woman, having built her vast fortune first as a pirate queen and later as a legitimate merchant. She arrived in London in her ate-20s, already fabulously wealthy.",
    traits: ['Wealthy', 'Dangerous', 'Connected'],
  },
  {
    id: 'harold-beale',
    name: 'Harold Beale',
    occupation: 'a husband and father',
    description:
      'Patchy beard. Constantly fiddling. Worried about the cost of things.',
    background:
      'Harold, a bookkeeper and amateur mathematician, moved his young family to St. James’s Street just a year ago, after getting a shockingly-good deal on the townhouse.',
    traits: ['Worried', 'Restless', 'Meticulous'],
  },
  {
    id: 'alice-beale',
    name: 'Alice Beale',
    occupation: 'a wife and mother',
    description:
      'Sweet disposition. Lovely, but faded. Simple tartan dress.',
    background:
      "Alice follows Harold’s lead in most things, but thinks he’s not taking Ginny’s death seriously enough. It was he who gave the story to The Illustrated Police News after Scotland Yard came up empty￾handed—a sad attempt to make a bit of money off their tragedy.",
    traits: ['Quiet', 'Faded', 'Disillusioned'],
  },
  {
    id: 'roger-beale',
    name: 'Roger Beale',
    occupation: 'a young son',
    description:
      'Ruddy-cheeked. Sailor’s outfit. Learning to swear.',
    background:
      "Nine-year-old Roger is a bit of a brat, to be honest, but finds the idea of a haunting to be wonderfully exciting, and frequently gives ghost tours of the townhouse to his friends.",
    traits: ['Adventurous', 'Curious', 'Bratty'],
  },
  {
    id: 'mary-alice-beale',
    name: 'Mary-Alice Beale',
    occupation: 'a baby daughter',
    description:
      'Quite bald for her age, really. And fat—what a fat little monkey she is!',
    background:
      "Listen to how she babbles—don’t you wonder what they’re thinking about when they babble like that?",
    traits: ['Adorable', 'Inquisitive', 'Fat']
  },
  {
    id: 'pythagoras',
    name: 'Pythagoras',
    occupation: 'a dog',
    description:
      'Greyhound. Brindle',
    background:
      "Used to be quite lazy, but ever since moving to St. James’s Street, spends most of his time nervously patrolling the house.",
    traits: ['Loyal', 'Friendly', 'Alert'],
    },
    {
    id: 'irma-thicket',
    name: 'Irma Thicket',
    occupation: 'a cook',
    description:
      'Square-framed. Jowly. Smells of onion and tobacco',
    background:
      "Irma has lived at 18 St. James’s Street longer than anyone, having worked for the previous family, the Buckleys. She is reluctant to talk about the things she’s seen, but is genuinely sad and terrified about what happened to Ginny Hess",
    traits: ['Superstitious', 'Blunt', 'Distressed'],
    },
    {
    id: 'constance-head',
    name: 'Constance Head',
    occupation: 'a neighbor',
    description:
      'Peering eyes. Too-tight corset. Streaks of gray in her hair',
    background:
      "Constance is a widow, and the Beales’ neighbor. Like Mrs. Thicket, she knows things about the house on 18 St. James’s Street, having lived next door most of her adult life. She’s certainly happy to tell what she knows in exchange for some juicy gossip.",
    traits: ['Gossipy', 'Nosy', 'Knowledgeable'],
    },
]

/**
 * Merges character base data with English text to produce full Character objects.
 */
export function getCharactersEn(): Character[] {
  return characters.map((char) => {
    const text = charactersEn.find((c) => c.id === char.id)
    if (!text) {
      throw new Error(`Missing English text for character: ${char.id}`)
    }
    return {
      ...char,
      name: text.name,
      alias: text.alias,
      occupation: text.occupation,
      description: text.description,
      background: text.background,
      traits: text.traits,
      conditions: text.conditions,
      masks: text.masks?.map((maskGroup) => ({
        ...maskGroup,
        masks: maskGroup.masks.map((m) => ({
          ...m,
          used: false,
        })),
      })),
    }
  })
}
