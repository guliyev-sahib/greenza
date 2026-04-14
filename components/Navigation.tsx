'use client'

import GreenzaIcon from './GreenzaIcon'

export default function Navigation() {
  return (
    <nav className="sticky top-0 left-0 right-0 z-50 bg-background border-b border-border">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <GreenzaIcon size={22} color="#2C5E3A" />
          <span className="font-display text-[33px] leading-none text-foreground">Greenza</span>
        </div>
        <div className="flex items-center gap-10">
          <a
            href="#products"
            className="text-xs font-light tracking-[0.14em] text-muted hover:text-foreground transition-colors"
          >
            Məhsullar
          </a>
          <a
            href="#about"
            className="text-xs font-light tracking-[0.14em] text-muted hover:text-foreground transition-colors"
          >
            Haqqımızda
          </a>
          <a
            href="#order"
            className="text-xs font-light tracking-[0.14em] text-muted hover:text-foreground transition-colors"
          >
            Sifariş
          </a>
        </div>
        <button className="px-4 py-2 rounded-none bg-primary text-primary-foreground text-xs font-normal tracking-wide hover:opacity-90 transition-opacity">
          Sifariş Et
        </button>
      </div>
    </nav>
  )
}
