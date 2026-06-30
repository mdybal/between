import { useState, useRef, useEffect } from 'react'
import { ChevronDown, Check } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface CheckboxDropdownOption {
  /** Stable key used to identify the option (also used as checkbox value). */
  value: string
  /** Human-readable label shown in the dropdown. */
  label: string
}

interface CheckboxDropdownProps {
  /** Visible label of the dropdown trigger button (e.g. "Case"). */
  label: string
  /** Currently selected values (controlled). Empty array means "all / none selected". */
  selected: string[]
  /** Available options to display. */
  options: CheckboxDropdownOption[]
  /**
   * When `true`, the dropdown behaves like a single-select (radio-like):
   * clicking a value calls `onChange([value])` and closes the panel.
   * Defaults to multi-select.
   */
  singleSelect?: boolean
  /**
   * Label shown at the top of the dropdown panel (acts like a "header"
   * explaining what the filter does). When provided, this row is also
   * clickable and resets the selection to an empty array.
   */
  allLabel?: string
  /** Called whenever the selection changes. */
  onChange: (next: string[]) => void
}

/**
 * A small, theme-aligned dropdown whose items are checkboxes.
 *
 * - Multi-select by default.
 * - Click outside / Escape to close.
 * - The trigger shows a count of selected items when at least one is picked.
 */
export default function CheckboxDropdown({
  label,
  selected,
  options,
  singleSelect = false,
  allLabel,
  onChange,
}: CheckboxDropdownProps) {
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement | null>(null)

  // Close on outside click / Escape
  useEffect(() => {
    if (!open) return
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false)
      }
    }
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleEscape)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [open])

  const toggle = (value: string) => {
    if (singleSelect) {
      if (selected.length === 1 && selected[0] === value) {
        onChange([])
      } else {
        onChange([value])
      }
      setOpen(false)
      return
    }
    if (selected.includes(value)) {
      onChange(selected.filter((v) => v !== value))
    } else {
      onChange([...selected, value])
    }
  }

  const isAll = selected.length === 0
  const triggerText = isAll
    ? label
    : singleSelect
      ? options.find((o) => o.value === selected[0])?.label ?? label
      : `${label} (${selected.length})`

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={cn(
          'inline-flex items-center gap-1.5 rounded border px-3 py-1 font-sc text-xs tracking-wide transition-colors',
          isAll
            ? 'text-graphite-500 hover:text-graphite-300'
            : 'border-amber-800/70 text-amber-700',
        )}
        style={
          isAll
            ? { borderColor: 'var(--graphite-700)', backgroundColor: 'rgba(30,30,34,0.4)' }
            : { backgroundColor: 'rgba(100,50,5,0.25)' }
        }
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span>{triggerText}</span>
        <ChevronDown
          size={12}
          className={cn('transition-transform', open && 'rotate-180')}
        />
      </button>

      {open && (
        <div
          role="listbox"
          aria-multiselectable={!singleSelect}
          className="absolute left-0 top-full z-20 mt-1 min-w-[14rem] rounded border shadow-lg"
          style={{
            borderColor: 'var(--graphite-700)',
            backgroundColor: 'rgba(20,20,24,0.98)',
            boxShadow: '0 4px 16px rgba(0,0,0,0.5)',
          }}
        >
          {allLabel && (
            <button
              type="button"
              onClick={() => {
                onChange([])
                if (singleSelect) setOpen(false)
              }}
              className={cn(
                'flex w-full items-center gap-2 px-3 py-2 text-left font-sc text-xs tracking-wide transition-colors',
                isAll
                  ? 'text-amber-600'
                  : 'text-graphite-400 hover:bg-graphite-800/40 hover:text-graphite-200',
              )}
              style={isAll ? { backgroundColor: 'rgba(120,60,10,0.15)' } : undefined}
            >
              <span
                className={cn(
                  'flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded border',
                  isAll
                    ? 'border-amber-700 bg-amber-900/30'
                    : 'border-graphite-600',
                )}
              >
                {isAll && <Check size={10} className="text-amber-500" />}
              </span>
              <span>{allLabel}</span>
            </button>
          )}

          {allLabel && (
            <div
              className="mx-3 h-px"
              style={{ backgroundColor: 'var(--graphite-700)' }}
            />
          )}

          <ul className="max-h-64 overflow-y-auto py-1">
            {options.length === 0 && (
              <li className="px-3 py-2 font-serif text-xs italic text-graphite-600">
                —
              </li>
            )}
            {options.map((opt) => {
              const checked = selected.includes(opt.value)
              return (
                <li key={opt.value}>
                  <button
                    type="button"
                    onClick={() => toggle(opt.value)}
                    className={cn(
                      'flex w-full items-center gap-2 px-3 py-1.5 text-left font-sc text-xs tracking-wide transition-colors',
                      checked
                        ? 'text-amber-600'
                        : 'text-graphite-300 hover:bg-graphite-800/40 hover:text-graphite-100',
                    )}
                    style={checked ? { backgroundColor: 'rgba(120,60,10,0.15)' } : undefined}
                  >
                    <span
                      className={cn(
                        'flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded border',
                        checked
                          ? 'border-amber-700 bg-amber-900/30'
                          : 'border-graphite-600',
                      )}
                    >
                      {checked && <Check size={10} className="text-amber-500" />}
                    </span>
                    <span className="truncate">{opt.label}</span>
                  </button>
                </li>
              )
            })}
          </ul>
        </div>
      )}
    </div>
  )
}

