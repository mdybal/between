import { threats } from './threats'
import { threatsEn, type ThreatText } from './threats_en'
import type { Threat } from '@/types'

/**
 * Polish threat text data.
 *
 * This file contains Polish translations of text fields (name, description,
 * knownFacts, questions) for threats. The non-text fields (id, type,
 * threatLevel, status, firstEncountered, clueImages) are stored in threats.ts.
 *
 * To add Polish translations, add entries with the same id as in threats_en.ts
 * and replace the text fields with Polish translations.
 *
 * Until translated, this file re-exports the English data as a fallback.
 */
export const threatsPl: ThreatText[] = threatsEn

/**
 * Merges threat base data with Polish text to produce full Threat objects.
 * Currently falls back to English text.
 */
export function getThreatsPl(): Threat[] {
  return threats.map((threat) => {
    const text = threatsPl.find((t) => t.id === threat.id)
    if (!text) {
      throw new Error(`Missing Polish text for threat: ${threat.id}`)
    }
    return {
      ...threat,
      name: text.name,
      description: text.description,
      knownFacts: text.knownFacts,
      questions: text.questions,
      mask: text.mask,
    }
  })
}
