import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import {
  ArrowLeft,
  ThumbsUp,
  ThumbsDown,
  Maximize,
  BedDouble,
  Building,
  CalendarDays,
  Layers,
} from 'lucide-react'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { LocationMap } from '@/components/location-map'
import { ReviewsSection } from '@/components/reviews-section'
import { StarRating } from '@/components/star-rating'
import {
  apartments,
  getApartment,
  averageRating,
  formatMnt,
  formatMntCompact,
} from '@/lib/apartments'

export function generateStaticParams() {
  return apartments.map((a) => ({ id: a.id }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params
  const apartment = getApartment(id)
  if (!apartment) return { title: 'Олдсонгүй — ОронСууц.мн' }
  return {
    title: `${apartment.name} — ОронСууц.мн`,
    description: apartment.description,
  }
}

export default async function ApartmentDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const apartment = getApartment(id)
  if (!apartment) notFound()

  const rating = averageRating(apartment.reviews)
  const totalPrice = apartment.pricePerSqm * apartment.area

  const specs = [
    { icon: Maximize, label: 'Талбай', value: `${apartment.area} м²` },
    { icon: BedDouble, label: 'Өрөө', value: `${apartment.rooms} өрөө` },
    {
      icon: Layers,
      label: 'Давхар',
      value: `${apartment.floor}/${apartment.totalFloors}`,
    },
    { icon: CalendarDays, label: 'Ашиглалт', value: `${apartment.year} он` },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      <main className="flex-1">
        <div className="mx-auto max-w-6xl px-4 py-6">
          <Link
            href="/apartments"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            Жагсаалт руу буцах
          </Link>
        </div>

        {/* Hero */}
        <section className="mx-auto max-w-6xl px-4">
          <div className="overflow-hidden rounded-2xl border border-border">
            <div className="relative aspect-[16/9] sm:aspect-[21/9]">
              <Image
                src={apartment.image || '/placeholder.svg'}
                alt={`${apartment.name} барилгын гадна тал`}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 1024px"
                className="object-cover"
              />
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <span className="inline-block rounded-full bg-secondary px-3 py-1 text-sm font-medium text-secondary-foreground">
                {apartment.district} дүүрэг
              </span>
              <h1 className="mt-3 text-3xl font-bold tracking-tight text-balance">
                {apartment.name}
              </h1>
              <div className="mt-2 flex items-center gap-2">
                <StarRating value={rating} size={18} />
                <span className="text-sm font-medium">{rating || '—'}</span>
                <span className="text-sm text-muted-foreground">
                  ({apartment.reviews.length} үнэлгээ)
                </span>
              </div>
            </div>

            <div className="rounded-xl border border-border bg-card p-4 text-card-foreground sm:text-right">
              <p className="text-sm text-muted-foreground">М.кв үнэ</p>
              <p className="text-2xl font-bold text-primary">
                {formatMntCompact(apartment.pricePerSqm)}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                Нийт дүн: {formatMnt(totalPrice)}
              </p>
            </div>
          </div>
        </section>

        {/* Specs */}
        <section className="mx-auto max-w-6xl px-4 py-8">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {specs.map((s) => {
              const Icon = s.icon
              return (
                <div
                  key={s.label}
                  className="rounded-xl border border-border bg-card p-4 text-card-foreground"
                >
                  <Icon className="size-5 text-primary" aria-hidden="true" />
                  <p className="mt-2 text-sm text-muted-foreground">{s.label}</p>
                  <p className="font-semibold">{s.value}</p>
                </div>
              )
            })}
          </div>

          <p className="mt-6 leading-relaxed text-muted-foreground text-pretty">
            {apartment.description}
          </p>
        </section>

        {/* Pros & Cons */}
        <section className="mx-auto max-w-6xl px-4 pb-8">
          <h2 className="text-2xl font-bold tracking-tight">Давуу ба сул тал</h2>
          <div className="mt-5 grid gap-5 md:grid-cols-2">
            <div className="rounded-xl border border-border bg-card p-5 text-card-foreground">
              <h3 className="flex items-center gap-2 font-semibold text-primary">
                <ThumbsUp className="size-5" aria-hidden="true" />
                Давуу тал
              </h3>
              <ul className="mt-4 flex flex-col gap-3">
                {apartment.pros.map((pro) => (
                  <li key={pro} className="flex items-start gap-2 text-sm">
                    <span
                      className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary"
                      aria-hidden="true"
                    />
                    <span className="text-muted-foreground">{pro}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-xl border border-border bg-card p-5 text-card-foreground">
              <h3 className="flex items-center gap-2 font-semibold text-destructive">
                <ThumbsDown className="size-5" aria-hidden="true" />
                Сул тал
              </h3>
              <ul className="mt-4 flex flex-col gap-3">
                {apartment.cons.map((con) => (
                  <li key={con} className="flex items-start gap-2 text-sm">
                    <span
                      className="mt-1.5 size-1.5 shrink-0 rounded-full bg-destructive"
                      aria-hidden="true"
                    />
                    <span className="text-muted-foreground">{con}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Location */}
        <section className="mx-auto max-w-6xl px-4 pb-8">
          <h2 className="mb-5 flex items-center gap-2 text-2xl font-bold tracking-tight">
            <Building className="size-6 text-primary" aria-hidden="true" />
            Байршил
          </h2>
          <LocationMap
            lat={apartment.lat}
            lng={apartment.lng}
            address={apartment.address}
          />
        </section>

        {/* Reviews */}
        <section className="mx-auto max-w-6xl px-4 pb-20">
          <h2 className="mb-6 text-2xl font-bold tracking-tight">
            Хүмүүсийн үнэлгээ
          </h2>
          <ReviewsSection initialReviews={apartment.reviews} />
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
