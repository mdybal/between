export function jsonResponse(
  data: unknown,
  status = 200,
  extra: Record<string, string> = {},
): Response {
  const headers = new Headers()
  headers.set('Content-Type', 'application/json; charset=utf-8')
  headers.set('Cache-Control', 'public, max-age=60, s-maxage=300')
  headers.set('Access-Control-Allow-Origin', '*')
  headers.set('Access-Control-Allow-Methods', 'GET, OPTIONS')
  headers.set('Access-Control-Allow-Headers', 'Content-Type')
  for (const [k, v] of Object.entries(extra)) headers.set(k, v)
  return new Response(JSON.stringify(data), { status, headers })
}

export function errorResponse(
  message: string,
  status = 500,
  extra: Record<string, string> = {},
): Response {
  return jsonResponse({ error: message }, status, extra)
}

export function handleOptions(): Response {
  const headers = new Headers()
  headers.set('Access-Control-Allow-Origin', '*')
  headers.set('Access-Control-Allow-Methods', 'GET, OPTIONS')
  headers.set('Access-Control-Allow-Headers', 'Content-Type')
  return new Response(null, { status: 204, headers })
}

export function parseUrl(request: Request): URL {
  try {
    return new URL(request.url)
  } catch {
    return new URL(request.url, 'http://localhost')
  }
}
