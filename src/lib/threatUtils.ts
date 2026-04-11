/**
 * Parses a threat level string (e.g., "2-4") and returns styling classes.
 * Format: "filled-total" where filled = number of filled circles, total = total circles
 */
export function getThreatLevelStyle(level: string | undefined): {
  colorClass: string
  circles: string
} {
  if (!level) return { colorClass: '', circles: '' }

  const parts = level.split('-')
  if (parts.length !== 2) return { colorClass: '', circles: '' }

  const filled = parseInt(parts[0], 10)
  const total = parseInt(parts[1], 10)

  if (isNaN(filled) || isNaN(total) || total === 0) return { colorClass: '', circles: '' }

  const difference = total - filled

  // Determine color based on difference
  let colorClass: string
  if (difference === 0) {
    colorClass = 'text-red-400' // red - no empty circles
  } else if (difference === 1) {
    colorClass = 'text-amber-500' // orange - one empty circle
  } else {
    colorClass = 'text-emerald-400' // green - multiple empty circles
  }

  // Build circles string: filled circles + empty circles
  const filledCircles = '⬤'.repeat(filled)
  const emptyCircles = '◯'.repeat(difference)
  const circles = filledCircles + emptyCircles

  return { colorClass, circles }
}
