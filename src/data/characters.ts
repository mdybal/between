import type { CharacterBase } from '@/types'

/**
 * Character data containing non-text fields (id, type, subtype, imageUrl,
 * status, case, used flags). Text fields (name, alias, occupation,
 * description, background, traits, conditions, masks[].category,
 * masks[].masks[].name) are stored in characters_en.ts (English)
 * and can be translated for other languages.
 */
export const characters: CharacterBase[] = [
   {
    id: 'lord-bellows',
    type: 'hunter',
    status: 'active',
    imageUrl: '/img/characters/lord-bellows.png',

  },
  {
    id: 'singh',
    type: 'hunter',
    status: 'active',
    imageUrl: '/img/characters/singh.png',
  },
  {
    id: 'george-montegu',
    type: 'hunter',
    status: 'active',
    imageUrl: '/img/characters/george-montegu.png',
  },
  {
    id: 'ludwig-virchow',
    type: 'hunter',
    status: 'active',
    imageUrl: '/img/characters/ludwig-virchow.png',
  },
  {
    id: 'theodora-brathwaite',
    type: 'npc',
    subtype: 'antagonist',
    imageUrl: '/img/characters/theodora-brathwaite.png',
    case: 'mastermind-conspiracy',
  },
  // St James's Street Ghost
  {
    id: 'harold-beale',
    type: 'npc',
    subtype: 'neutral',
    imageUrl: '/img/characters/harold-beale.png',
    case: 'james-street-ghost',
  },
  {
    id: 'alice-beale',
    type: 'npc',
    subtype: 'neutral',
    imageUrl: '/img/characters/alice-beale.png',
    case: 'james-street-ghost',

  },
  {
    id: 'roger-beale',
    type: 'npc',
    subtype: 'neutral',
    imageUrl: '/img/characters/roger-beale.png',
    case: 'james-street-ghost',
  },
  {
    id: 'mary-alice-beale',
    type: 'npc',
    subtype: 'neutral',
    imageUrl: '/img/characters/mary-alice-beale.png',
    case: 'james-street-ghost',
  },
  {
    id: 'pythagoras',
    type: 'npc',
    subtype: 'ally',
    imageUrl: '/img/characters/pythagoras.png',
    case: 'james-street-ghost'
  },
  {
    id: 'irma-thicket',
    type: 'npc',
    subtype: 'neutral',
    imageUrl: '/img/characters/irma-thicket.png',
    case: 'james-street-ghost'
  },
  {
    id: 'constance-head',
    type: 'npc',
    subtype: 'neutral',
    status: 'deceased',
    imageUrl: '/img/characters/constance-head.png',
    case: 'james-street-ghost'
  },
  {
    id: 'chen-bao',
    type: 'npc',
    subtype: 'neutral',
    imageUrl: '/img/characters/chen-bao.png',
    case: 'limehouse-lurker'
  },
  /*{
    id: 'rory-bell',
    type: 'npc',
    subtype: 'neutral',
    imageUrl: '/img/characters/rory-bell.png',
  },*/
  {
    id: 'sun-mask',
    type: 'npc',
    subtype: 'neutral',
    imageUrl: '/img/characters/sun-mask.png',
    case: 'limehouse-lurker'
  },
  {
    id: 'franklin-horsford',
    type: 'npc',
    subtype: 'neutral',
    imageUrl: '/img/characters/franklin-horsford.png',
    case: 'limehouse-lurker'
  },/*
  {
    id: 'lawrence-chesterfield',
    type: 'npc',
    subtype: 'neutral',
    imageUrl: '/img/characters/lawrence-chesterfield.png',
  },*/
  {
    id: 'elma-thorpe',
    type: 'npc',
    subtype: 'neutral',
    imageUrl: '/img/characters/elma-thorpe.png',
    case: 'limehouse-lurker'
  },
  {
    id: 'lin-bohai',
    type: 'npc',
    subtype: 'neutral',
    imageUrl: '/img/characters/lin-bohai.png',
    case: 'limehouse-lurker'
  },
    {
    id: 'limehouse-lurker',
    type: 'npc',
    subtype: 'antagonist',
    imageUrl: '/img/characters/limehouse-lurker.png',
    case: 'limehouse-lurker',
  },
  {
    id: 'red-katherine',
    type: 'npc',
    subtype: 'neutral',
    imageUrl: '/img/characters/red-katherine.png',
    case: 'limehouse-lurker'
  },
  {
    id: 'big-bertha',
    type: 'npc',
    subtype: 'neutral',
    imageUrl: '/img/characters/big-bertha.png',
    case: 'limehouse-lurker'
  },
  {
    id: 'thomas-simpson',
    type: 'npc',
    subtype: 'neutral',
    imageUrl: '/img/characters/thomas-simpson.png',
    case: 'cremorne-gardens'
  },
  {
    id: 'abigail-simpson',
    type: 'npc',
    subtype: 'neutral',
    imageUrl: '/img/characters/abigail-simpson.png',
    case: 'cremorne-gardens'
  },
  {
    id: 'beulah-thrum',
    type: 'npc',
    subtype: 'neutral',
    imageUrl: '/img/characters/beulah-thrum.png',
    case: 'cremorne-gardens'
  },
  {
    id: 'simon-piedmont',
    type: 'npc',
    subtype: 'neutral',
    imageUrl: '/img/characters/simon-piedmont.png',
    case: 'cremorne-gardens'
  },
]
