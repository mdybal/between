import { cn } from '@/lib/utils'

type ImagePlacement = 'full' | 'left' | 'right' | 'center'

interface SessionImageProps {
  src: string
  alt: string
  caption?: string
  placement?: ImagePlacement
  className?: string
}

const placementClasses: Record<ImagePlacement, string> = {
  full: 'w-full',
  center: 'mx-auto max-w-lg',
  left: 'float-left mr-6 mb-4 max-w-xs w-full sm:w-64',
  right: 'float-right ml-6 mb-4 max-w-xs w-full sm:w-64',
}

/**
 * SessionImage — an image with optional caption.
 *
 * placement:
 *   "full"   — spans the full content width
 *   "center" — centred, max ~32rem wide
 *   "left"   — floats left, text wraps around it
 *   "right"  — floats right, text wraps around it
 */
export function SessionImage({
  src,
  alt,
  caption,
  placement = 'full',
  className,
}: SessionImageProps) {
  return (
    <figure className={cn(placementClasses[placement], className)}>
      <div className="overflow-hidden rounded-lg border border-stone-800">
        <img
          src={src}
          alt={alt}
          className="w-full object-cover"
          loading="lazy"
        />
      </div>
      {caption && (
        <figcaption className="mt-2 text-center font-serif text-xs italic text-stone-600">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}

/**
 * ClearFloat — use after a floated image to prevent layout bleed.
 */
export function ClearFloat() {
  return <div className="clear-both" />
}
