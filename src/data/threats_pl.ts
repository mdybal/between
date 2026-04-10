/**
 * Polish threat data.
 *
 * To add Polish translations, copy the structure from threats.ts and
 * replace the narrative fields (name, description, knownFacts, suspicions)
 * with Polish text. The id, type, threatLevel, status, and firstEncountered
 * fields should remain unchanged.
 *
 * Until translated, this file re-exports the English data as a fallback.
 */
export { threats as threatsPl } from './threats'
