'use client'

import { useMemo, useState } from 'react'
import { Search, SlidersHorizontal, X } from 'lucide-react'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { ApartmentCard } from '@/components/apartment-card'
import {
  apartments,
  averageRating,
  formatMntCompact,
  DISTRICTS,
} from '@/lib/apartments'
import { cn } from '@/lib/utils'

type SortKey = 'rating' | 'price-asc' | 'price-desc'

const MAX_PRICE = 6_000_000

export default function SearchPage() {
  const [query, setQuery] = useState('')
  const [district, setDistrict] = useState<string>('all')
  const [rooms, setRooms] = useState<number | 'all'>('all')
  const [maxPrice, setMaxPrice] = useState(MAX_PRICE)
  const [sort, setSort] = useState<SortKey>('rating')

  const results = useMemo(() => {
    let list = apartments.filter((a) => {
      const q = query.trim().toLowerCase()
      const matchesQuery =
        q === '' ||
        a.name.toLowerCase().includes(q) ||
        a.address.toLowerCase().includes(q) ||
        a.district.toLowerCase().includes(q)
      const matchesDistrict = district === 'all' || a.district === district
      const matchesRooms = rooms === 'all' || a.rooms === rooms
      const matchesPrice = a.pricePerSqm <= maxPrice
      return matchesQuery && matchesDistrict && matchesRooms && matchesPrice
    })

    list = [...list].sort((a, b) => {
      if (sort === 'rating')
        return averageRating(b.reviews) - averageRating(a.reviews)
      if (sort === 'price-asc') return a.pricePerSqm - b.pricePerSqm
      return b.pricePerSqm - a.pricePerSqm
    })

    return list
  }, [query, district, rooms, maxPrice, sort])

  const hasFilters =
    query !== '' || district !== 'all' || rooms !== 'all' || maxPrice < MAX_PRICE

  function reset() {
    setQuery('')
    setDistrict('all')
    setRooms('all')
    setMaxPrice(MAX_PRICE)
    setSort('rating')
  }

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      <main className="flex-1">
        <section className="border-b border-border bg-secondary/40">
          <div className="mx-auto max-w-6xl px-4 py-10">
            <h1 className="text-3xl font-bold tracking-tight text-balance sm:text-4xl">
              Орон сууц хайх
            </h1>
            <p className="mt-3 max-w-2xl text-muted-foreground text-pretty">
              Нэр, дүүрэг, өрөөний тоо болон м.кв үнээр шүүж өөрт тохирох орон
              сууцаа олоорой.
            </p>

            <div className="mt-6 flex items-center gap-2 rounded-xl border border-border bg-background px-4 py-3">
              <Search className="size-5 shrink-0 text-muted-foreground" aria-hidden="true" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Нэр эсвэл байршлаар хайх..."
                className="w-full bg-transparent text-sm outline-none"
                aria-label="Хайх"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  aria-label="Цэвэрлэх"
                  className="text-muted-foreground hover:text-foreground"
                >
                  <X className="size-4" />
                </button>
              )}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-8">
          <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
            {/* Filters */}
            <aside className="lg:sticky lg:top-20 lg:self-start">
              <div className="rounded-xl border border-border bg-card p-5 text-card-foreground">
                <div className="flex items-center justify-between">
                  <h2 className="flex items-center gap-2 font-semibold">
                    <SlidersHorizontal className="size-4 text-primary" aria-hidden="true" />
                    Шүүлтүүр
                  </h2>
                  {hasFilters && (
                    <button
                      type="button"
                      onClick={reset}
                      className="text-sm font-medium text-primary hover:underline"
                    >
                      Цэвэрлэх
                    </button>
                  )}
                </div>

                {/* District */}
                <div className="mt-5">
                  <span className="text-sm font-medium">Дүүрэг</span>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <FilterChip
                      active={district === 'all'}
                      onClick={() => setDistrict('all')}
                    >
                      Бүгд
                    </FilterChip>
                    {DISTRICTS.map((d) => (
                      <FilterChip
                        key={d}
                        active={district === d}
                        onClick={() => setDistrict(d)}
                      >
                        {d}
                      </FilterChip>
                    ))}
                  </div>
                </div>

                {/* Rooms */}
                <div className="mt-5">
                  <span className="text-sm font-medium">Өрөөний тоо</span>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <FilterChip
                      active={rooms === 'all'}
                      onClick={() => setRooms('all')}
                    >
                      Бүгд
                    </FilterChip>
                    {[1, 2, 3, 4].map((n) => (
                      <FilterChip
                        key={n}
                        active={rooms === n}
                        onClick={() => setRooms(n)}
                      >
                        {n} өрөө
                      </FilterChip>
                    ))}
                  </div>
                </div>

                {/* Max price */}
                <div className="mt-5">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">М.кв дээд үнэ</span>
                    <span className="text-sm text-primary">
                      {formatMntCompact(maxPrice)}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={2_000_000}
                    max={MAX_PRICE}
                    step={100_000}
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(Number(e.target.value))}
                    className="mt-3 w-full accent-primary"
                    aria-label="М.кв дээд үнэ"
                  />
                </div>

                {/* Sort */}
                <div className="mt-5">
                  <label className="text-sm font-medium" htmlFor="sort">
                    Эрэмбэлэх
                  </label>
                  <select
                    id="sort"
                    value={sort}
                    onChange={(e) => setSort(e.target.value as SortKey)}
                    className="mt-2 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
                  >
                    <option value="rating">Үнэлгээгээр</option>
                    <option value="price-asc">Үнэ: багаас их</option>
                    <option value="price-desc">Үнэ: ихээс бага</option>
                  </select>
                </div>
              </div>
            </aside>

            {/* Results */}
            <div>
              <p className="mb-5 text-sm font-medium text-muted-foreground">
                {results.length} үр дүн олдлоо
              </p>
              {results.length > 0 ? (
                <div className="grid gap-6 sm:grid-cols-2">
                  {results.map((apartment) => (
                    <ApartmentCard key={apartment.id} apartment={apartment} />
                  ))}
                </div>
              ) : (
                <div className="rounded-xl border border-dashed border-border bg-card p-12 text-center">
                  <p className="font-medium">Үр дүн олдсонгүй</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Шүүлтүүрээ өөрчилж дахин оролдоно уу.
                  </p>
                  <button
                    type="button"
                    onClick={reset}
                    className="mt-4 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
                  >
                    Шүүлтүүр цэвэрлэх
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'rounded-full border px-3 py-1.5 text-sm font-medium transition-colors',
        active
          ? 'border-primary bg-primary text-primary-foreground'
          : 'border-border bg-background text-muted-foreground hover:bg-secondary',
      )}
    >
      {children}
    </button>
  )
}
