import type { CharacterBase } from '@/types'

/**
 * Character data containing non-text fields (id, type, subtype, imageUrl,
 * portraitUrl, status, used flags). Text fields (name, alias, occupation,
 * description, background, traits, conditions, privateQuarters[].name,
 * masks[].category, masks[].masks[].name) are stored in characters_en.ts (English)
 * and can be translated for other languages.
 */
export const characters: CharacterBase[] = [
  {
    id: 'evelyn-ashworth',
    type: 'hunter',
    status: 'active',
    privateQuarters: [
      { name: 'Press Credentials', used: false },
      { name: 'Pocket Revolver', used: true },
      { name: 'Leather Satchel', used: false },
      { name: 'Coded Notebook', used: true },
    ],
    masks: [
      {
        category: 'Mask of Past',
        masks: [
          { name: 'The Grieving Daughter', used: true },
          { name: 'The Street Urchin', used: false },
          { name: 'The Debutante', used: false },
        ],
      },
      {
        category: 'Mask of Junos',
        masks: [
          { name: 'The Fearless Reporter', used: false },
          { name: 'The Socialite', used: true },
        ],
      },
    ],
  },
  {
    id: 'cornelius-vane',
    type: 'hunter',
    status: 'active',
    privateQuarters: [
      { name: 'Medical Bag', used: false },
      { name: 'Occult Tome', used: true },
      { name: 'Laudanum Vial', used: true },
      { name: 'Silver Scalpel', used: false },
    ],
    masks: [
      {
        category: 'Mask of Past',
        masks: [
          { name: 'The Grieving Widower', used: false },
          { name: 'The Eager Student', used: false },
          { name: 'The Broken Soldier', used: true },
        ],
      },
      {
        category: 'Mask of Junos',
        masks: [
          { name: 'The Respectable Physician', used: true },
          { name: 'The Occult Seeker', used: false },
        ],
      },
    ],
  },
  {
    id: 'silas-morrow',
    type: 'hunter',
    status: 'active',
    privateQuarters: [
      { name: 'Police Whistle', used: false },
      { name: 'Service Revolver', used: false },
      { name: 'Informant Ledger', used: true },
      { name: 'Lock-pick Set', used: false },
    ],
    masks: [
      {
        category: 'Mask of Past',
        masks: [
          { name: 'The Loyal Constable', used: false },
          { name: 'The Haunted Detective', used: false },
          { name: 'The Disgraced Inspector', used: false },
        ],
      },
      {
        category: 'Mask of Junos',
        masks: [
          { name: 'The Gruff Informant', used: false },
          { name: 'The Weary Veteran', used: false },
        ],
      },
    ],
  },
  {
    id: 'theodora-brathwaite',
    type: 'npc',
    subtype: 'antagonist',
    imageUrl: '/img/characters/theodora.svg',
    portraitUrl: '/img/characters/portrait_theodora.svg',
  },
  {
    id: 'lady-pemberton',
    type: 'npc',
    subtype: 'neutral',
  },
  {
    id: 'alfred',
    type: 'npc',
    subtype: 'ally',
  },
]
