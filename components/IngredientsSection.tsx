'use client'

import { motion } from 'framer-motion'

const ingredients = [
  { name: 'Zeytun yağı', latinName: 'Olea europaea' },
  { name: 'Aloe Vera', latinName: 'Aloe barbadensis' },
  { name: 'Argan', latinName: 'Argania spinosa' },
  { name: 'Lavanda', latinName: 'Lavandula angustifolia' },
  { name: 'Bal', latinName: 'Apis mellifera' },
  { name: 'Çay ağacı', latinName: 'Melaleuca alternifolia' },
]

export default function IngredientsSection() {
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
            Təbii İnqrediyentlər
          </h2>
          <p className="text-sm font-body font-light text-warm-cream/60 tracking-widest">
            YALNIZ SƏNƏTLƏ HAZIRLANMIS, XALIS MƏHSULLAR
          </p>
        </motion.div>

        {/* Ingredients Grid */}
        <div className="grid grid-cols-3 gap-8 max-w-4xl mx-auto">
          {ingredients.map((ingredient, idx) => (
            <motion.div
              key={idx}
              className="group cursor-pointer"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              viewport={{ once: false }}
              whileHover={{ scale: 1.05 }}
            >
              {/* Circular frame */}
              <div className="relative w-40 h-40 mx-auto mb-4">
                {/* Outer border */}
                <div className="absolute inset-0 border border-gold/40 rounded-full group-hover:border-gold transition-colors duration-300"></div>

                {/* Inner decorative circle */}
                <div className="absolute inset-3 border border-gold/20 rounded-full"></div>

                {/* Center dot */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-gold rounded-full"></div>

                {/* Bloom effect on hover */}
                <motion.div
                  className="absolute inset-0 rounded-full bg-gradient-to-br from-gold/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  whileHover={{ scale: 1.2 }}
                ></motion.div>
              </div>

              {/* Text Content */}
              <div className="text-center">
                <h3 className="text-lg font-display italic text-warm-cream mb-2 group-hover:text-gold transition-colors">
                  {ingredient.name}
                </h3>
                <p className="text-xs font-body font-light text-warm-cream/50 italic">
                  {ingredient.latinName}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
