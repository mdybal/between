import { getCharactersEn } from '../src/data/characters_en.js'
import { getThreatsEn } from '../src/data/threats_en.js'
import { errorResponse, handleOptions, jsonResponse } from './_shared.js'

export const runtime = 'edge'

export function GET(): Response {
  try {
    const characters = getCharactersEn()
    const threats = getThreatsEn()

    const endpoints = [
      {
        method: 'GET',
        path: '/api/characters',
        description:
          'All characters (hunters and NPCs) merged from src/data/characters.ts and src/data/characters_en.ts.',
        shape: '{ generatedAt, count, characters: Character[] }',
      },
      {
        method: 'GET',
        path: '/api/characters/{id}',
        description:
          'A single character by id, merged. Returns 404 if the id is unknown.',
        shape: '{ generatedAt, character: Character }',
        errors: { '404': '{ error: "Character not found: <id>" }' },
      },
      {
        method: 'GET',
        path: '/api/threats',
        description:
          'All threats and masterminds merged from src/data/threats.ts and src/data/threats_en.ts.',
        shape: '{ generatedAt, count, threats: Threat[] }',
      },
      {
        method: 'GET',
        path: '/api/threats/{id}',
        description:
          'A single threat or mastermind by id, merged. Returns 404 if the id is unknown.',
        shape: '{ generatedAt, threat: Threat }',
        errors: { '404': '{ error: "Threat not found: <id>" }' },
      },
      {
        method: 'GET',
        path: '/api/data',
        description: 'Combined payload with characters and threats in one response.',
        shape: '{ generatedAt, characters: { count, items }, threats: { count, items } }',
      },
      {
        method: 'GET',
        path: '/api/blobs',
        description:
          'List of files stored in the Vercel Blob store (existed before the public API was added).',
        shape: '[{ url, filename, size, uploadedAt }, ...]',
      },
      {
        method: 'GET',
        path: '/api/',
        description: 'This discovery document.',
        shape: 'See the response body.',
      },
      {
        method: 'OPTIONS',
        path: 'any /api/* path',
        description:
          'CORS preflight. All endpoints respond with Access-Control-Allow-Origin: * and Cache-Control: public, max-age=60, s-maxage=300.',
      },
    ]

    return jsonResponse({
      name: 'The Between — Public API',
      description:
        'Static, English-only JSON view of campaign characters and threats. Source: src/data/*.ts.',
      language: 'en',
      generatedAt: new Date().toISOString(),
      endpoints,
      examples: {
        allCharacters: '/api/characters',
        singleCharacter: '/api/characters/ludwig-virchow',
        allThreats: '/api/threats',
        singleThreat: '/api/threats/limehouse-lurker',
        mastermind: '/api/threats/mastermind-conspiracy',
        combined: '/api/data',
      },
      sampleIds: {
        characters: characters.map((c) => c.id),
        threats: threats.map((t) => t.id),
      },
    })
  } catch (err) {
    return errorResponse(err instanceof Error ? err.message : 'Internal error', 500)
  }
}

export const OPTIONS = handleOptions
