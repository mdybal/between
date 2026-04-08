/**
 * Polish map data.
 *
 * To add Polish translations, copy the structures from mapData.ts and
 * replace the narrative fields (name, description) on pointsOfInterest,
 * mapZones, and mapSessions with Polish text.
 * All coordinate, id, category, color, state, and sessionId fields should
 * remain unchanged.
 *
 * Until translated, this file re-exports the English data as a fallback.
 */
export { pointsOfInterest as pointsOfInterestPl, mapZones as mapZonesPl, mapSessions as mapSessionsPl } from './mapData'
