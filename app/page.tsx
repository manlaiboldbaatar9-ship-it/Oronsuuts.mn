import Image from "next/image";
import Link from "next/link";
import {
  Search,
  Scale,
  Star,
  MapPin,
  Ruler,
  Users,
  ArrowRight,
} from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ApartmentCard } from "@/components/apartment-card";
import { apartments } from "@/lib/apartments";
import Script from "next/script";

const features = [
  {
    icon: Scale,
    title: "Давуу ба сул тал",
    desc: "Орон сууц бүрийн бодит давуу болон сул талыг ил тод харьцуулна.",
  },
  {
    icon: Ruler,
    title: "М.кв үнэ",
    desc: "Нэг метр квадратын үнийг шууд харж, төсвөө тооцоолоход хялбар.",
  },
  {
    icon: MapPin,
    title: "Байршил",
    desc: "Орон сууц яг хаана байгааг газрын зураг дээр харна.",
  },
  {
    icon: Star,
    title: "Хүмүүсийн үнэлгээ",
    desc: "Бодит оршин суугчдын өгсөн үнэлгээ, сэтгэгдэлтэй танилц.",
  },
];

export default function HomePage() {
  const featured = apartments.slice(0, 3);

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      <main className="flex-1">
        {/* Hero */}
        <section className="relative">
          <div className="absolute inset-0">
            <Image
              src="/hero-ub.png"
              alt="Улаанбаатар хотын орон сууцны барилгууд"
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/40" />
          </div>

          <div className="relative mx-auto max-w-6xl px-4 py-20 sm:py-28">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background/70 px-3 py-1 text-sm font-medium text-muted-foreground backdrop-blur">
                <Users className="size-4 text-primary" aria-hidden="true" />
                Бүх насныханд зориулсан
              </span>
              <h1 className="mt-5 text-4xl font-bold leading-tight tracking-tight text-balance sm:text-5xl">
                Шинэ орон сууцаа <span className="text-primary">ухаалгаар</span>{" "}
                сонгоорой
              </h1>
              <p className="mt-4 text-lg leading-relaxed text-muted-foreground text-pretty">
                Монгол дахь орон сууцуудын давуу болон сул талыг харьцуулж, м.кв
                үнэ, байршлыг харна. Бодит хүмүүсийн өгсөн үнэлгээнд тулгуурлан
                итгэлтэй шийдвэр гаргаарай.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link
                  href="/apartments"
                  className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-3 font-medium text-primary-foreground transition-opacity hover:opacity-90"
                >
                  Орон сууц үзэх
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
                <Link
                  href="/search"
                  className="inline-flex items-center gap-2 rounded-lg border border-border bg-background/80 px-5 py-3 font-medium text-foreground backdrop-blur transition-colors hover:bg-secondary"
                >
                  <Search className="size-4" aria-hidden="true" />
                  Хайх
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Purpose / Features */}
        <section className="mx-auto max-w-6xl px-4 py-16">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-balance">
              Сайтын зорилго
            </h2>
            <p className="mt-3 text-muted-foreground text-pretty">
              Шинэ орон сууц авах гэж буй бүх насны хүмүүст зориулж, орон сууц
              бүрийн мэдээллийг ил тод, харьцуулахад хялбар байдлаар толилуулна.
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((f) => {
              const Icon = f.icon;
              return (
                <div
                  key={f.title}
                  className="rounded-xl border border-border bg-card p-5 text-card-foreground"
                >
                  <span className="flex size-11 items-center justify-center rounded-lg bg-secondary text-primary">
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-4 font-semibold">{f.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                    {f.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Featured apartments */}
        <section className="mx-auto max-w-6xl px-4 pb-20">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-balance">
                Онцлох орон сууц
              </h2>
              <p className="mt-2 text-muted-foreground">
                Хамгийн их анхаарал татсан сонголтууд
              </p>
            </div>
            <Link
              href="/apartments"
              className="hidden shrink-0 items-center gap-1 text-sm font-medium text-primary hover:underline sm:inline-flex"
            >
              Бүгдийг үзэх
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((apartment) => (
              <ApartmentCard key={apartment.id} apartment={apartment} />
            ))}
          </div>
        </section>
        <Script>
          {`(function(){if(!window.chatbase||window.chatbase("getState")!=="initialized"){window.chatbase=(...arguments)=>{if(!window.chatbase.q){window.chatbase.q=[]}window.chatbase.q.push(arguments)};window.chatbase=new Proxy(window.chatbase,{get(target,prop){if(prop==="q"){return target.q}return(...args)=>target(prop,...args)}})}const onLoad=function(){const script=document.createElement("script");script.src="https://www.chatbase.co/embed.min.js";script.id="rO4xVFubTIEhBX-MGweZ7";script.domain="www.chatbase.co";document.body.appendChild(script)};if(document.readyState==="complete"){onLoad()}else{window.addEventListener("load",onLoad)}})();`}
        </Script>
      </main>

      <SiteFooter />
    </div>
  );
}
