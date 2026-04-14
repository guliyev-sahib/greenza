'use client'

const steps = [
  {
    title: 'Təmizlə',
    description: 'Sabunla gündəlik təmizləmə',
  },
  {
    title: 'Eksfolya',
    description: 'Həftəda 2-3 dəfə skrab istifadə et',
  },
  {
    title: 'Nəmləndər',
    description: 'Gündəlik nəmləndirici maskası',
  },
]

export default function DaysSection() {
  return (
    <section className="py-24 bg-surface" id="about">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl text-foreground mb-4">
            Dərini Dəyişdirən Rutin
          </h2>
          <p className="text-xs text-muted uppercase tracking-[0.16em]">
            Sadə 3 addım, 21 gün
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-10 items-start">
          <div className="text-[120px] leading-none text-primary/45 font-display font-light">21</div>
          <ol className="space-y-7">
            {steps.map((step, idx) => (
              <li key={step.title} className="flex gap-4">
                <span className="text-primary font-display text-2xl leading-none mt-0.5">{idx + 1}.</span>
                <div>
                  <h3 className="text-2xl text-foreground">{step.title}</h3>
                  <p className="text-sm text-muted mt-1">{step.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
