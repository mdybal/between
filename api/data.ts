import { getCharactersEn } from '../src/data/characters_en'
import { getThreatsEn } from '../src/data/threats_en'
import { errorResponse, handleOptions, jsonResponse } from './_shared'

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
    return errorResponse(err instanceof Error ? err.message : 'Internal error')
  }
}

export const OPTIONS = handleOptions
