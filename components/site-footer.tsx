import Link from 'next/link'
import { Building2 } from 'lucide-react'

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-secondary/40">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Building2 className="size-4" aria-hidden="true" />
          </span>
          <span className="font-semibold">
            ОронСууц<span className="text-primary">.мн</span>
          </span>
        </div>
        <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-foreground">
            Нүүр
          </Link>
          <Link href="/apartments" className="hover:text-foreground">
            Орон сууц
          </Link>
          <Link href="/reviews" className="hover:text-foreground">
            Үнэлгээ
          </Link>
          <Link href="/search" className="hover:text-foreground">
            Хайлт
          </Link>
        </nav>
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} ОронСууц.мн
        </p>
      </div>
    </footer>
  )
}
