import Image from 'next/image'
import Link from 'next/link'
import { MapPin, Maximize, BedDouble, ThumbsUp, ThumbsDown } from 'lucide-react'
import {
  type Apartment,
  averageRating,
  formatMntCompact,
} from '@/lib/apartments'
import { StarRating } from '@/components/star-rating'

export function ApartmentCard({ apartment }: { apartment: Apartment }) {
  const rating = averageRating(apartment.reviews)

  return (
    <Link
      href={`/apartments/${apartment.id}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card text-card-foreground transition-shadow hover:shadow-lg"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={apartment.image || '/placeholder.svg'}
          alt={`${apartment.name} барилгын гадна тал`}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <span className="absolute left-3 top-3 rounded-full bg-background/90 px-2.5 py-1 text-xs font-medium text-foreground">
          {apartment.district}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold leading-tight text-balance">
            {apartment.name}
          </h3>
          <div className="flex shrink-0 items-center gap-1">
            <StarRating value={rating} size={14} />
            <span className="text-xs font-medium text-muted-foreground">
              {rating || '—'}
            </span>
          </div>
        </div>

        <p className="flex items-center gap-1 text-sm text-muted-foreground">
          <MapPin className="size-3.5 shrink-0" aria-hidden="true" />
          <span className="line-clamp-1">{apartment.address}</span>
        </p>

        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <Maximize className="size-3.5" aria-hidden="true" />
            {apartment.area} м²
          </span>
          <span className="flex items-center gap-1">
            <BedDouble className="size-3.5" aria-hidden="true" />
            {apartment.rooms} өрөө
          </span>
        </div>

        <div className="mt-auto flex items-center justify-between gap-2 border-t border-border pt-3">
          <div>
            <p className="text-xs text-muted-foreground">м.кв үнэ</p>
            <p className="font-semibold text-primary">
              {formatMntCompact(apartment.pricePerSqm)}
            </p>
          </div>
          <div className="flex items-center gap-3 text-xs">
            <span className="flex items-center gap-1 text-muted-foreground">
              <ThumbsUp className="size-3.5 text-primary" aria-hidden="true" />
              {apartment.pros.length}
            </span>
            <span className="flex items-center gap-1 text-muted-foreground">
              <ThumbsDown className="size-3.5 text-destructive" aria-hidden="true" />
              {apartment.cons.length}
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}
