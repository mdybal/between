export const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  Vary: 'Origin',
} as const

export const CACHE_HEADER = 'public, max-age=60, s-maxage=300'

export function jsonResponse(
  data: unknown,
  status = 200,
  extraHeaders: Record<string, string> = {},
): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': CACHE_HEADER,
      ...CORS_HEADERS,
      ...extraHeaders,
    },
  })
}

export function errorResponse(
  message: string,
  status = 500,
  extraHeaders: Record<string, string> = {},
): Response {
  return jsonResponse({ error: message }, status, extraHeaders)
}

export function handleOptions(): Response {
  return new Response(null, { status: 204, headers: { ...CORS_HEADERS } })
}
