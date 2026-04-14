'use client'

import GreenzaIcon from './GreenzaIcon'

export default function Hero() {
  return (
    <section className="min-h-[calc(100vh-73px)] bg-background border-b border-border">
      <div className="max-w-4xl mx-auto px-6 py-20 md:py-24 flex flex-col items-center justify-center text-center">
        <GreenzaIcon size={120} animate={true} />

        <h1 className="mt-8 text-6xl md:text-7xl lg:text-8xl leading-[0.96] font-light">
          Zərərsiz. Təbii. Effektiv.
        </h1>

        <p className="mt-6 text-[11px] uppercase tracking-[0.2em] text-primary">
          Sabunlar · Skrablar · Nəmləndiricilər
        </p>

        <button className="mt-10 px-7 py-3 bg-primary text-primary-foreground text-sm tracking-wide hover:opacity-90 transition-opacity">
          Sifariş Et
        </button>
        <p className="mt-4 text-sm text-muted max-w-lg">
          Təbii inqrediyentlər ilə hazırlanan gündəlik baxım məhsulları.
        </p>
      </div>
    </section>
  )
}
