'use client'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-background text-foreground py-12 px-6 border-t border-border">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          <div>
            <h3 className="text-3xl text-primary mb-2">
              Greenza
            </h3>
            <p className="text-xs text-muted leading-relaxed max-w-xs">
              Zərərsiz. Təbii. Effektiv. Sənətlə hazırlanmış, xalis təbii məhsullar.
            </p>
          </div>

          <div>
            <h4 className="text-sm text-foreground mb-3">
              Məlumat
            </h4>
            <ul className="space-y-2 text-xs text-muted">
              <li>
                <a href="#products" className="hover:text-foreground transition-colors">
                  Məhsullar
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-foreground transition-colors">
                  Haqqımızda
                </a>
              </li>
              <li>
                <a href="#order" className="hover:text-foreground transition-colors">
                  Sifariş
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm text-foreground mb-3">
              Sosial
            </h4>
            <ul className="space-y-2 text-xs text-muted">
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Instagram
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  WhatsApp
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  TikTok
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-8 text-center">
          <p className="text-xs text-muted">
            © {currentYear} Greenza. Bütün hüquqlar qorunur. • Ekoloji gözəllik üçün.
          </p>
        </div>
      </div>
    </footer>
  )
}
