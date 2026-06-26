import Link from 'next/link'
import type { Metadata } from 'next'
import { ArrowRight } from 'lucide-react'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { StarRating } from '@/components/star-rating'
import { apartments, averageRating } from '@/lib/apartments'

export const metadata: Metadata = {
  title: 'Үнэлгээ — ОронСууц.мн',
  description: 'Орон сууцуудын дундаж үнэлгээ ба хүмүүсийн сэтгэгдэл.',
}

export default function ReviewsPage() {
  // Ranked apartments by average rating
  const ranked = [...apartments].sort(
    (a, b) => averageRating(b.reviews) - averageRating(a.reviews),
  )

  // All reviews flattened, newest first
  const allReviews = apartments
    .flatMap((a) =>
      a.reviews.map((r) => ({ ...r, apartmentId: a.id, apartmentName: a.name })),
    )
    .sort((a, b) => (a.date < b.date ? 1 : -1))

  const totalReviews = allReviews.length
  const overall =
    Math.round(
      (allReviews.reduce((s, r) => s + r.rating, 0) / totalReviews) * 10,
    ) / 10

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      <main className="flex-1">
        <section className="border-b border-border bg-secondary/40">
          <div className="mx-auto max-w-6xl px-4 py-12">
            <h1 className="text-3xl font-bold tracking-tight text-balance sm:text-4xl">
              Үнэлгээ ба сэтгэгдэл
            </h1>
            <p className="mt-3 max-w-2xl text-muted-foreground text-pretty">
              Бодит оршин суугчдын өгсөн үнэлгээнд тулгуурлан орон сууцуудыг
              харьцуулаарай.
            </p>
            <div className="mt-6 flex flex-wrap gap-6">
              <div>
                <p className="text-3xl font-bold">{overall}</p>
                <StarRating value={overall} size={16} className="mt-1" />
                <p className="mt-1 text-sm text-muted-foreground">
                  Нийт дундаж
                </p>
              </div>
              <div>
                <p className="text-3xl font-bold">{totalReviews}</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Нийт үнэлгээ
                </p>
              </div>
              <div>
                <p className="text-3xl font-bold">{apartments.length}</p>
                <p className="mt-2 text-sm text-muted-foreground">Орон сууц</p>
              </div>
            </div>
          </div>
        </section>

        {/* Ranking */}
        <section className="mx-auto max-w-6xl px-4 py-12">
          <h2 className="text-2xl font-bold tracking-tight">
            Үнэлгээгээр эрэмбэлсэн
          </h2>
          <div className="mt-6 flex flex-col gap-3">
            {ranked.map((a, i) => {
              const r = averageRating(a.reviews)
              return (
                <Link
                  key={a.id}
                  href={`/apartments/${a.id}`}
                  className="flex items-center gap-4 rounded-xl border border-border bg-card p-4 text-card-foreground transition-colors hover:bg-secondary/50"
                >
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-secondary text-sm font-bold text-secondary-foreground">
                    {i + 1}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-medium">{a.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {a.district} дүүрэг
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <StarRating value={r} size={14} />
                    <span className="text-sm font-semibold">{r || '—'}</span>
                  </div>
                </Link>
              )
            })}
          </div>
        </section>

        {/* Latest reviews */}
        <section className="mx-auto max-w-6xl px-4 pb-20">
          <h2 className="text-2xl font-bold tracking-tight">Сүүлийн сэтгэгдэл</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {allReviews.map((r) => (
              <div
                key={`${r.apartmentId}-${r.id}`}
                className="rounded-xl border border-border bg-card p-5 text-card-foreground"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="flex size-9 items-center justify-center rounded-full bg-secondary text-sm font-semibold text-secondary-foreground">
                      {r.author.slice(0, 1)}
                    </span>
                    <div>
                      <p className="text-sm font-medium">{r.author}</p>
                      <p className="text-xs text-muted-foreground">{r.date}</p>
                    </div>
                  </div>
                  <StarRating value={r.rating} size={14} />
                </div>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {r.comment}
                </p>
                <Link
                  href={`/apartments/${r.apartmentId}`}
                  className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                >
                  {r.apartmentName}
                  <ArrowRight className="size-3.5" aria-hidden="true" />
                </Link>
              </div>
            ))}
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
