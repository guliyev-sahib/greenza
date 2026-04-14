'use client'

export default function CTABanner() {
  return (
    <section id="order" className="py-24 bg-primary">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-5xl md:text-6xl text-primary-foreground max-w-2xl mx-auto">
          Dərini dəyişdirən rutin
        </h2>

        <p className="text-primary-foreground/80 text-base max-w-xl mx-auto mt-5">
          İndi başla və 21 günə dərini dəyişdir. Sənətlə hazırlanmış, xalis məhsullar.
        </p>

        <button className="mt-8 px-10 py-3 bg-background text-foreground text-sm tracking-wide hover:opacity-90 transition-opacity">
          <span>WhatsApp ilə Sifariş Et</span>
        </button>

        <p className="text-primary-foreground/70 text-xs tracking-[0.14em] mt-6">
          BİZİMLƏ ƏLAQƏ: +994 XX XXX XX XX
        </p>
      </div>
    </section>
  )
}
