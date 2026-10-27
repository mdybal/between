import { getThreatsEn } from '../../src/data/threats_en'
import { errorResponse, handleOptions, jsonResponse } from '../_shared'

export const runtime = 'edge'

export function GET(
  _request: Request,
  { params }: { params: { id: string } },
): Response {
  try {
    const threat = getThreatsEn().find((t) => t.id === params.id)
    if (!threat) {
      return errorResponse(`Threat not found: ${params.id}`, 404)
    }
    return jsonResponse({
      generatedAt: new Date().toISOString(),
      threat,
    })
  } catch (err) {
    return errorResponse(err instanceof Error ? err.message : 'Internal error')
  }
}

export const OPTIONS = handleOptions
