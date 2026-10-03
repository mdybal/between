import { useRef, type MouseEvent as ReactMouseEvent, type ReactNode } from 'react'
import { Link, type LinkProps } from 'react-router-dom'
import { cn } from '@/lib/utils'

/**
 * Pixel threshold used to distinguish a real "click" (intended to navigate)
 * from a "text-selection drag" (intended to copy text inside the card).
 *
 * If the pointer moves further than this distance between `mousedown` and
 * `click`, we treat the gesture as a selection drag and suppress navigation.
 *
 * 5px is well above any normal click jitter (mouse users rarely move the
 * pointer more than 1–2 px before releasing) but small enough that even a
 * short, deliberate selection of a single character will exceed it.
 */
const DRAG_THRESHOLD_PX = 5

interface SelectableLinkProps extends LinkProps {
  children: ReactNode
  className?: string
}

/**
 * A drop-in replacement for react-router's `<Link>` that lets users
 * select & copy the text inside the link (title, body, etc.) without the
 * browser hijacking the gesture as a navigation.
 *
 * Browsers normally cancel a text-selection drag started inside an `<a>`
 * element and instead navigate to the `href` on mouseup, which makes the
 * inner text un-copyable. This component detects a drag-style gesture and
 * suppresses navigation in that case while leaving plain clicks (and
 * keyboard activation) fully functional.
 *
 * Use this anywhere a card with a meaningful amount of text is wrapped in
 * a navigation link — e.g. the threat list, sessions list, etc.
 *
 * Note: text selection still works on touch devices because the mobile
 * browser uses long-press / native selection gestures, not click events.
 */
export function SelectableLink({ children, className, ...rest }: SelectableLinkProps) {
  // Pointer position recorded at mousedown time, used to measure the drag.
  // Scoped per <SelectableLink> instance via this ref so gestures on
  // different cards don't interfere with each other.
  const downPos = useRef<{ x: number; y: number } | null>(null)

  const onMouseDown = (e: ReactMouseEvent<HTMLAnchorElement>) => {
    // Only track the primary mouse button — middle/right clicks are not
    // selection drags.
    if (e.button !== 0) {
      downPos.current = null
      return
    }
    downPos.current = { x: e.clientX, y: e.clientY }
  }

  const onClick = (e: ReactMouseEvent<HTMLAnchorElement>) => {
    if (!downPos.current) return
    const start = downPos.current
    downPos.current = null
    const dx = e.clientX - start.x
    const dy = e.clientY - start.y
    const moved = Math.hypot(dx, dy) > DRAG_THRESHOLD_PX
    if (moved) {
      // The user was selecting text, not clicking. Suppress navigation
      // and let the browser keep the selection so the user can copy it.
      e.preventDefault()
      e.stopPropagation()
    }
  }

  // Belt-and-braces: cancel native link drag (which would also navigate).
  const onDragStart = (e: React.DragEvent<HTMLAnchorElement>) => {
    e.preventDefault()
  }

  return (
    <Link
      {...rest}
      className={cn('select-text', className)}
      onMouseDown={onMouseDown}
      onClick={onClick}
      onDragStart={onDragStart}
    >
      {children}
    </Link>
  )
}