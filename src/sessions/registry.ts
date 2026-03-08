import { lazy, type ComponentType } from 'react'

/**
 * Session Content Registry
 *
 * Maps each session ID (from src/data/sessions.ts) to its content component.
 *
 * To add a new session:
 *   1. Create src/sessions/session-XX.tsx
 *   2. Add an entry here: 'session-XX': lazy(() => import('./session-XX'))
 */
export const sessionContentRegistry: Record<string, ComponentType> = {
  'session-01': lazy(() => import('./session-01')),
  'session-02': lazy(() => import('./session-02')),
  // 'session-03': lazy(() => import('./session-03')),
}
