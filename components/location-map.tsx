import { MapPin, ExternalLink } from 'lucide-react'

export function LocationMap({
  lat,
  lng,
  address,
}: {
  lat: number
  lng: number
  address: string
}) {
  const d = 0.008
  const bbox = `${lng - d}%2C${lat - d}%2C${lng + d}%2C${lat + d}`
  const src = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat}%2C${lng}`
  const link = `https://www.openstreetmap.org/?mlat=${lat}&mlon=${lng}#map=16/${lat}/${lng}`

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card">
      <div className="aspect-[16/9] w-full">
        <iframe
          title={`${address} байршлын газрын зураг`}
          src={src}
          className="size-full"
          loading="lazy"
        />
      </div>
      <div className="flex items-center justify-between gap-3 p-4">
        <p className="flex items-start gap-2 text-sm text-muted-foreground">
          <MapPin className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
          {address}
        </p>
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex shrink-0 items-center gap-1 text-sm font-medium text-primary hover:underline"
        >
          Том газрын зураг
          <ExternalLink className="size-3.5" aria-hidden="true" />
        </a>
      </div>
    </div>
  )
}
