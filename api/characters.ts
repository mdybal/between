import { getCharactersEn } from '../src/data/characters_en'
import { errorResponse, handleOptions, jsonResponse } from './_shared'

export const runtime = 'edge'

export function GET(): Response {
  try {
    const characters = getCharactersEn()
    return jsonResponse({
      generatedAt: new Date().toISOString(),
      count: characters.length,
      characters,
    })
  } catch (err) {
    return errorResponse(err instanceof Error ? err.message : 'Internal error')
  }
}

export const OPTIONS = handleOptions
