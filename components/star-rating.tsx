import { Star } from 'lucide-react'
import { cn } from '@/lib/utils'

export function StarRating({
  value,
  size = 16,
  className,
}: {
  value: number
  size?: number
  className?: string
}) {
  return (
    <div
      className={cn('flex items-center gap-0.5', className)}
      aria-label={`Үнэлгээ ${value} / 5`}
      role="img"
    >
      {[1, 2, 3, 4, 5].map((i) => {
        const filled = value >= i
        const half = !filled && value >= i - 0.5
        return (
          <span key={i} className="relative inline-flex" style={{ width: size, height: size }}>
            <Star
              className="absolute text-muted-foreground/40"
              style={{ width: size, height: size }}
              aria-hidden="true"
            />
            <span
              className="absolute overflow-hidden"
              style={{ width: filled ? size : half ? size / 2 : 0, height: size }}
            >
              <Star
                className="fill-accent text-accent"
                style={{ width: size, height: size }}
                aria-hidden="true"
              />
            </span>
          </span>
        )
      })}
    </div>
  )
}
