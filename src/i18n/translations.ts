import { en } from './translations_en'
import { pl } from './translations_pl'

export type Lang = 'en' | 'pl'

export const translations = { en, pl } as const

export type Translations = typeof translations['en']
