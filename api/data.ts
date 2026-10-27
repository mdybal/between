import { getCharactersEn } from '../src/data/characters_en.js'
import { getThreatsEn } from '../src/data/threats_en.js'
import { errorResponse, handleOptions, jsonResponse } from './_shared.js'

export const runtime = 'edge'

export function GET(): Response {
  try {
    const characters = getCharactersEn()
    const threats = getThreatsEn()
    return jsonResponse({
      generatedAt: new Date().toISOString(),
      characters: { count: characters.length, items: characters },
      threats: { count: threats.length, items: threats },
    })
  } catch (err) {
    return errorResponse(err instanceof Error ? err.message : 'Internal error', 500)
  }
}

export const OPTIONS = handleOptions
