'use client'

import { motion } from 'framer-motion'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import { useState, useEffect } from 'react'

function CountUpNumber({ target }: { target: number }) {
  const [count, setCount] = useState(0)
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.5 })

  useEffect(() => {
    if (!isVisible) return

    const duration = 2
    const steps = 60
    const increment = target / steps
    let current = 0

    const timer = setInterval(() => {
      current += increment
      if (current >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, (duration * 1000) / steps)

    return () => clearInterval(timer)
  }, [isVisible, target])

  return <span ref={ref as any}>{count}</span>
}

export default function StatsStrip() {
  const stats = [
    { label: 'Məhsul', value: 79 },
    { label: 'Müştəri', value: 928 },
    { label: 'Ölkə', value: 45 },
  ]

  return (
    <section className="bg-deep-green text-warm-cream py-12 px-6">
      <div className="max-w-7xl mx-auto flex items-center justify-around">
        {stats.map((stat, idx) => (
          <motion.div
            key={idx}
            className="flex flex-col items-center gap-2 text-center"
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: idx * 0.1 }}
            viewport={{ once: false }}
          >
            <div className="text-4xl font-display font-light text-gold">
              <CountUpNumber target={stat.value} />
            </div>
            <div className="text-xs font-body font-light tracking-widest text-warm-cream/70">
              {stat.label}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
