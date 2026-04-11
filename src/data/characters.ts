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
    imageUrl: '/img/characters/theodora.svg',
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
