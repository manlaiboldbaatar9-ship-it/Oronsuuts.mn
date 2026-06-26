'use client'

import { useState } from 'react'
import { Star, MessageSquarePlus } from 'lucide-react'
import { type Review } from '@/lib/apartments'
import { StarRating } from '@/components/star-rating'
import { cn } from '@/lib/utils'

function avg(reviews: Review[]) {
  if (reviews.length === 0) return 0
  return Math.round((reviews.reduce((a, r) => a + r.rating, 0) / reviews.length) * 10) / 10
}

export function ReviewsSection({ initialReviews }: { initialReviews: Review[] }) {
  const [reviews, setReviews] = useState<Review[]>(initialReviews)
  const [author, setAuthor] = useState('')
  const [rating, setRating] = useState(0)
  const [hover, setHover] = useState(0)
  const [comment, setComment] = useState('')
  const [error, setError] = useState('')

  const average = avg(reviews)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (rating === 0) {
      setError('Оддын үнэлгээгээ сонгоно уу.')
      return
    }
    if (!author.trim() || !comment.trim()) {
      setError('Нэр болон сэтгэгдлээ бөглөнө үү.')
      return
    }
    const newReview: Review = {
      id: `local-${Date.now()}`,
      author: author.trim(),
      rating,
      comment: comment.trim(),
      date: new Date().toISOString().slice(0, 10),
    }
    setReviews((prev) => [newReview, ...prev])
    setAuthor('')
    setRating(0)
    setComment('')
    setError('')
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
      {/* Reviews list */}
      <div>
        <div className="mb-5 flex items-center gap-4">
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold">{average || '—'}</span>
            <span className="text-sm text-muted-foreground">/ 5</span>
          </div>
          <div>
            <StarRating value={average} size={18} />
            <p className="mt-1 text-sm text-muted-foreground">
              {reviews.length} үнэлгээ
            </p>
          </div>
        </div>

        <ul className="flex flex-col gap-4">
          {reviews.map((r) => (
            <li
              key={r.id}
              className="rounded-xl border border-border bg-card p-4 text-card-foreground"
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
            </li>
          ))}
        </ul>
      </div>

      {/* Add review form */}
      <div className="lg:sticky lg:top-20 lg:self-start">
        <form
          onSubmit={handleSubmit}
          className="rounded-xl border border-border bg-card p-5 text-card-foreground"
        >
          <h3 className="flex items-center gap-2 font-semibold">
            <MessageSquarePlus className="size-5 text-primary" aria-hidden="true" />
            Үнэлгээ өгөх
          </h3>

          <div className="mt-4">
            <label className="text-sm font-medium" htmlFor="author">
              Таны нэр
            </label>
            <input
              id="author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="Жишээ: Болд"
              className="mt-1.5 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          <div className="mt-4">
            <span className="text-sm font-medium">Үнэлгээ</span>
            <div className="mt-1.5 flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setRating(i)}
                  onMouseEnter={() => setHover(i)}
                  onMouseLeave={() => setHover(0)}
                  aria-label={`${i} од`}
                  className="p-0.5"
                >
                  <Star
                    className={cn(
                      'size-7 transition-colors',
                      (hover || rating) >= i
                        ? 'fill-accent text-accent'
                        : 'text-muted-foreground/40',
                    )}
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="mt-4">
            <label className="text-sm font-medium" htmlFor="comment">
              Сэтгэгдэл
            </label>
            <textarea
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={4}
              placeholder="Энэ орон сууцны талаар бодлоо хуваалцаарай..."
              className="mt-1.5 w-full resize-none rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          {error && (
            <p className="mt-3 text-sm text-destructive" role="alert">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="mt-4 w-full rounded-lg bg-primary px-4 py-2.5 font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            Үнэлгээ илгээх
          </button>
          <p className="mt-3 text-xs text-muted-foreground">
            Энэ хувилбарт үнэлгээ түр зуур хадгалагдана. Бодит датабаз (Neon)
            холбосноор байнга хадгалагдах болно.
          </p>
        </form>
      </div>
    </div>
  )
}
