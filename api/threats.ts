import { getThreatsEn } from '../src/data/threats_en'
import { errorResponse, handleOptions, jsonResponse } from './_shared'

export const runtime = 'edge'

export function GET(): Response {
  try {
    const threats = getThreatsEn()
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
