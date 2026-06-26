import type { Metadata } from 'next'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { ApartmentCard } from '@/components/apartment-card'
import { apartments } from '@/lib/apartments'

export const metadata: Metadata = {
  title: 'Орон сууцууд — ОронСууц.мн',
  description: 'Монгол дахь орон сууцуудын жагсаалт, давуу сул тал, м.кв үнэ.',
}

export default function ApartmentsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      <main className="flex-1">
        <section className="border-b border-border bg-secondary/40">
          <div className="mx-auto max-w-6xl px-4 py-12">
            <h1 className="text-3xl font-bold tracking-tight text-balance sm:text-4xl">
              Орон сууцууд
            </h1>
            <p className="mt-3 max-w-2xl text-muted-foreground text-pretty">
              Орон сууц бүрийн давуу болон сул тал, нэг метр квадратын үнэ,
              байршил болон хүмүүсийн үнэлгээг харьцуулж үзээрэй.
            </p>
            <p className="mt-4 text-sm font-medium text-muted-foreground">
              Нийт {apartments.length} орон сууц
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-10">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {apartments.map((apartment) => (
              <ApartmentCard key={apartment.id} apartment={apartment} />
            ))}
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
