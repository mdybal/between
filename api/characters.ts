import { getCharactersEn } from '../src/data/characters_en'
import { errorResponse, handleOptions, jsonResponse } from './_shared'

export const runtime = 'edge'

export function GET(request: Request): Response {
  try {
    const characters = getCharactersEn()
    const id = new URL(request.url).searchParams.get('id')

    if (id) {
      const character = characters.find((c) => c.id === id)
      if (!character) {
        return errorResponse(`Character not found: ${id}`, 404)
      }
      return jsonResponse({
        generatedAt: new Date().toISOString(),
        character,
      })
    }

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
