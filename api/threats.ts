import { getThreatsEn } from '../src/data/threats_en'
import { errorResponse, handleOptions, jsonResponse } from './_shared'

export const runtime = 'edge'

export function GET(request: Request): Response {
  try {
    const threats = getThreatsEn()
    const id = new URL(request.url).searchParams.get('id')

    if (id) {
      const threat = threats.find((t) => t.id === id)
      if (!threat) {
        return errorResponse(`Threat not found: ${id}`, 404)
      }
      return jsonResponse({
        generatedAt: new Date().toISOString(),
        threat,
      })
    }

    return jsonResponse({
      generatedAt: new Date().toISOString(),
      count: threats.length,
      threats,
    })
  } catch (err) {
    return errorResponse(err instanceof Error ? err.message : 'Internal error')
  }
}

export const OPTIONS = handleOptions
