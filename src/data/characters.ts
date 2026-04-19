import type { CharacterBase } from '@/types'

/**
 * Character data containing non-text fields (id, type, subtype, imageUrl,
 * status, used flags). Text fields (name, alias, occupation,
 * description, background, traits, conditions, masks[].category,
 * masks[].masks[].name) are stored in characters_en.ts (English)
 * and can be translated for other languages.
 */
export const characters: CharacterBase[] = [
  {
    id: 'evelyn-ashworth',
    type: 'hunter',
    status: 'active',
  },
  {
    id: 'cornelius-vane',
    type: 'hunter',
    status: 'active',
  },
  {
    id: 'silas-morrow',
    type: 'hunter',
    status: 'active',
  },
  {
    id: 'theodora-brathwaite',
    type: 'npc',
    subtype: 'antagonist',
    imageUrl: '/img/characters/theodora-brathwaite.png',
  },
  // St James's Street Ghost
  {
    id: 'harold-beale',
    type: 'npc',
    subtype: 'neutral',
    imageUrl: '/img/characters/harold-beale.png',
  },
  {
    id: 'alice-beale',
    type: 'npc',
    subtype: 'neutral',
    imageUrl: '/img/characters/alice-beale.png',

  },
  {
    id: 'roger-beale',
    type: 'npc',
    subtype: 'neutral',
    imageUrl: '/img/characters/roger-beale.png',
  },
  {
    id: 'mary-alice-beale',
    type: 'npc',
    subtype: 'neutral',
    imageUrl: '/img/characters/mary-alice-beale.png',
  },
  {
    id: 'pythagoras',
    type: 'npc',
    subtype: 'neutral',
    imageUrl: '/img/characters/pythagoras.png',
  },
  {
    id: 'irma-thicket',
    type: 'npc',
    subtype: 'neutral',
    imageUrl: '/img/characters/irma-thicket.png',
  },
  {
    id: 'constance-head',
    type: 'npc',
    subtype: 'neutral',
    imageUrl: '/img/characters/constance-head.png',
  },
  {
    id: 'chen-bao',
    type: 'npc',
    subtype: 'neutral',
    imageUrl: '/img/characters/chen-bao.png',
  },
  {
    id: 'rory-bell',
    type: 'npc',
    subtype: 'neutral',
    imageUrl: '/img/characters/rory-bell.png',
  },
  {
    id: 'sun-mask',
    type: 'npc',
    subtype: 'neutral',
    imageUrl: '/img/characters/sun-mask.png',
  },
  {
    id: 'franklin-horsford',
    type: 'npc',
    subtype: 'neutral',
    imageUrl: '/img/characters/franklin-horsford.png',
  },

  {
    id: 'elma-thorpe',
    type: 'npc',
    subtype: 'neutral',
    imageUrl: '/img/characters/elma-thorpe.png',
  },
  {
    id: 'lawrence-chesterfield',
    type: 'npc',
    subtype: 'neutral',
    imageUrl: '/img/characters/lawrence-chesterfield.png',
  },
  {
    id: 'lin-bohai',
    type: 'npc',
    subtype: 'neutral',
    imageUrl: '/img/characters/lin-bohai.png',
  },
    {
    id: 'limehouse-lurker',
    type: 'npc',
    subtype: 'antagonist',
    imageUrl: '/img/characters/limehouse-lurker.png',
  },
]
