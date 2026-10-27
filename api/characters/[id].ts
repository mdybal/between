import { getCharactersEn } from '../../src/data/characters_en'
import { errorResponse, handleOptions, jsonResponse } from '../_shared'

export const runtime = 'edge'

export function GET(
  _request: Request,
  { params }: { params: { id: string } },
): Response {
  try {
    const character = getCharactersEn().find((c) => c.id === params.id)
    if (!character) {
      return errorResponse(`Character not found: ${params.id}`, 404)
    }
    return jsonResponse({
      generatedAt: new Date().toISOString(),
      character,
    })
  } catch (err) {
    return errorResponse(err instanceof Error ? err.message : 'Internal error')
  }
}

export const OPTIONS = handleOptions
