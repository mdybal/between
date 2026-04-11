import { characters } from './characters'
import type { Character } from '@/types'

/**
 * English character text data.
 *
 * This file contains all translatable text fields (name, alias, occupation,
 * description, background, traits, conditions, privateQuarters[].name,
 * masks[].category, masks[].masks[].name). The non-text fields (id, type,
 * subtype, imageUrl, portraitUrl, status, used flags) are stored in characters.ts.
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
  privateQuarters?: { name: string }[]
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
    privateQuarters: [
      { name: 'Press Credentials' },
      { name: 'Pocket Revolver' },
      { name: 'Leather Satchel' },
      { name: 'Coded Notebook' },
    ],
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
    privateQuarters: [
      { name: 'Medical Bag' },
      { name: 'Occult Tome' },
      { name: 'Laudanum Vial' },
      { name: 'Silver Scalpel' },
    ],
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
      'Twenty years on the force left Silas with a network of informants and a deep distrust of authority. The case that ended his career also opened his eyes to what lurks beneath London\'s respectable surface.',
    traits: ['Tenacious', 'Cynical', 'Loyal', 'Weathered'],
    conditions: [],
    privateQuarters: [
      { name: 'Police Whistle' },
      { name: 'Service Revolver' },
      { name: 'Informant Ledger' },
      { name: 'Lock-pick Set' },
    ],
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
    occupation: 'The Antagonist',
    description:
      'A shadowy figure whose true motives remain obscured. Known only by reputation and whispered warnings.',
    background:
      'Little is known of Theodora Brathwaite\'s origins. She moves through London\'s underworld with unsettling ease, leaving chaos in her wake.',
    traits: ['Calculating', 'Elusive', 'Dangerous'],
  },
  {
    id: 'lady-pemberton',
    name: 'Lady Cecilia Pemberton',
    occupation: 'Society Hostess',
    description:
      'A widow of considerable means and questionable taste in guests. Her Mayfair townhouse is a nexus of rumour and intrigue.',
    background:
      'Widowed young, Lady Pemberton has cultivated a salon that attracts artists, politicians, and occultists in equal measure. Whether she is a victim or a conspirator remains unclear.',
    traits: ['Charming', 'Evasive', 'Frightened', 'Well-connected'],
  },
  {
    id: 'alfred',
    name: 'Alfred Pennyworth',
    occupation: 'Gardener & Handyman',
    description:
      'A loyal and resourceful manservant who has served the Ashworth family for decades. His knowledge of the estate and its secrets is invaluable.',
    background:
      'Alfred has been with the Ashworths since before Evelyn was born. He is fiercely protective of the family and has a deep understanding of the estate\'s history and hidden passages.',
    traits: ['Dependable', 'Resourceful', 'Discreet'],
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
      privateQuarters: text.privateQuarters?.map((pq, i) => ({
        ...pq,
        used: char.privateQuarters?.[i]?.used ?? false,
      })),
      masks: text.masks?.map((maskGroup, i) => ({
        ...maskGroup,
        masks: maskGroup.masks.map((m, j) => ({
          ...m,
          used: char.masks?.[i]?.masks[j]?.used ?? false,
        })),
      })),
    }
  })
}
