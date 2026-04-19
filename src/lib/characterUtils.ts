import type { NpcSubtype } from '@/types'

export const npcSubtypeBadgeVariant: Record<NpcSubtype, 'amber' | 'green' | 'muted' | 'red'> = {
  neutral: 'muted',
  ally: 'green',
  antagonist: 'red',
}

export const statusBadgeVariant: Record<string, 'green' | 'red' | 'amber' | 'muted' | 'purple'> = {
  active: 'green',
  retired: 'amber',
  deceased: 'purple',
  missing: 'amber',
  unknown: 'muted',
}
