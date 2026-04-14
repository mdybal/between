import { characters } from './characters'
import { charactersEn, type CharacterText } from './characters_en'
import type { Character } from '@/types'

/**
 * Polish character text data.
 *
 * This file contains Polish translations of text fields (name, alias, occupation,
 * description, background, traits, conditions, masks[].category,
 * masks[].masks[].name). The non-text fields (id, type, subtype, imageUrl,
 * status, used flags) are stored in characters.ts.
 *
 * To add Polish translations, add entries with the same id as in characters_en.ts
 * and replace the text fields with Polish translations.
 *
 * Until translated, this file re-exports the English data as a fallback.
 */
export const charactersPl: CharacterText[] = charactersEn

/**
 * Merges character base data with Polish text to produce full Character objects.
 * Currently falls back to English text.
 */
export function getCharactersPl(): Character[] {
  return characters.map((char) => {
    const text = charactersPl.find((c) => c.id === char.id)
    if (!text) {
      throw new Error(`Missing Polish text for character: ${char.id}`)
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
