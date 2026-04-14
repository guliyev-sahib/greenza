'use client'

const products = [
  {
    id: 1,
    name: 'Sabunlar',
    description: 'Əl ilə hazırlanmış təbii sabunlar',
    ingredients: ['Zeytun yağı', 'Lavanda', 'Aromatik bitkilər'],
  },
  {
    id: 2,
    name: 'Skrablar',
    description: 'Qiymətli inqrediyentli peeling skrablar',
    ingredients: ['Argan yağı', 'Tuz', 'Aloevera'],
  },
  {
    id: 3,
    name: 'Nəmləndiricilar',
    description: 'Cildə dərin nemlənmə və qoruması',
    ingredients: ['Bal', 'Şəkərkadifu', 'Camomile'],
  },
]

export default function ProductsGrid() {
  return (
    <section id="products" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16 text-center">
          <h2 className="text-5xl md:text-6xl text-foreground mb-3">
            Bizim Məhsullar
          </h2>
          <p className="text-xs font-light text-muted uppercase tracking-[0.16em]">
            Təbii baxım üçün sadə kolleksiya
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.map((product) => (
            <article
              key={product.id}
              className="bg-white border border-border p-8 transition-transform duration-200 hover:scale-[1.02] hover:shadow-[0_12px_30px_rgba(26,26,24,0.08)]"
            >
              <h3 className="text-4xl text-primary mb-3">{product.name}</h3>
              <p className="text-sm text-muted mb-6">{product.description}</p>
              <ul className="space-y-2 border-t border-border pt-5">
                {product.ingredients.map((ingredient) => (
                  <li key={ingredient} className="text-xs text-muted uppercase tracking-[0.08em]">
                    {ingredient}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
