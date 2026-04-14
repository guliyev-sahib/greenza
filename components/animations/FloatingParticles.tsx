'use client'

import { motion } from 'framer-motion'
import { useReducedMotion } from 'framer-motion'

interface Particle {
  id: number
  x: number
  y: number
  duration: number
  delay: number
}

function generateParticles(count: number): Particle[] {
  const particles: Particle[] = []
  for (let i = 0; i < count; i++) {
    particles.push({
      id: i,
      x: Math.random() * 100 - 50,
      y: Math.random() * 100 - 50,
      duration: 8 + Math.random() * 12,
      delay: Math.random() * 2,
    })
  }
  return particles
}

export function FloatingParticles({ count = 12 }: { count?: number }) {
  const particles = generateParticles(count)
  const shouldReduceMotion = useReducedMotion()

  if (shouldReduceMotion) {
    return null
  }

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          initial={{
            x: particle.x,
            y: particle.y,
            opacity: 0.3,
          }}
          animate={{
            x: particle.x + (Math.random() * 100 - 50),
            y: particle.y + (Math.random() * 100 - 50),
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute w-1 h-1 bg-gold rounded-full"
          style={{
            left: '50%',
            top: '50%',
            marginLeft: '-2px',
            marginTop: '-2px',
          }}
        />
      ))}
    </div>
  )
}
