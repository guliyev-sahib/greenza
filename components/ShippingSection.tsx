'use client'

import { motion } from 'framer-motion'

const shippingFeatures = [
  {
    title: 'Sürətli Çatdırılma',
    description: '3-5 iş günü',
    icon: '✈️',
  },
  {
    title: 'Təhlükəsiz Qablaşdırma',
    description: 'Ekoloji və dayanıqlı',
    icon: '📦',
  },
  {
    title: 'Bütün Ölkələrə',
    description: 'Dünya üzrə göndəriş',
    icon: '🌍',
  },
  {
    title: 'Geri Qaytarma',
    description: '30 gün moneyback',
    icon: '↩️',
  },
]

export default function ShippingSection() {
  return (
    <section className="py-24 bg-black-bg">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: false }}
        >
          <h2 className="text-6xl font-display italic text-warm-cream mb-4">
            Niyə Greenza Seçməlisən?
          </h2>
          <p className="text-sm font-body font-light text-warm-cream/60 tracking-widest">
            PREMIUM XIDMƏT VƏ KEYFIYYƏT
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-4 gap-6">
          {shippingFeatures.map((feature, idx) => (
            <motion.div
              key={idx}
              className="group relative p-8 border border-gold/20 text-center hover:border-gold/60 transition-colors duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              viewport={{ once: false }}
              whileHover={{ y: -4 }}
            >
              {/* Background gradient on hover */}
              <motion.div
                className="absolute inset-0 -z-10 bg-gradient-to-br from-deep-green/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                whileHover={{ scale: 1.02 }}
              ></motion.div>

              {/* Icon */}
              <motion.div
                className="text-4xl mb-4"
                whileHover={{ scale: 1.2, rotate: 5 }}
                transition={{ duration: 0.3 }}
              >
                {feature.icon}
              </motion.div>

              {/* Title */}
              <h3 className="text-base font-display italic text-warm-cream mb-2 group-hover:text-gold transition-colors">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-xs font-body font-light text-warm-cream/60">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
