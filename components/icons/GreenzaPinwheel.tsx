'use client'

import { motion } from 'framer-motion'

interface GreenzaPinwheelProps {
  size?: number
  color?: string
  animate?: boolean
  staggerPetals?: boolean
  className?: string
}

export function GreenzaPinwheel({
  size = 100,
  color = '#1c3a28',
  animate = true,
  staggerPetals = false,
  className = '',
}: GreenzaPinwheelProps) {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      animate={animate ? { rotate: 360 } : {}}
      transition={
        animate ? { duration: 18, repeat: Infinity, ease: 'linear' } : {}
      }
    >
      {/* Petal 1 - Top */}
      <motion.g
        initial={staggerPetals ? { opacity: 0, scale: 0 } : {}}
        animate={staggerPetals ? { opacity: 1, scale: 1 } : {}}
        transition={staggerPetals ? { delay: 0, duration: 0.6 } : {}}
      >
        {/* Curved leaf petal */}
        <path
          d="M 50 8 Q 58 12 62 24 Q 64 35 58 42 Q 52 45 48 40 Q 48 28 50 8"
          fill={color}
          opacity="0.85"
        />
        {/* Curved stem */}
        <path
          d="M 53 42 Q 55 48 56 55"
          stroke={color}
          strokeWidth="1.2"
          fill="none"
          strokeLinecap="round"
        />
        {/* Dot at stem tip */}
        <circle cx="56" cy="58" r="1.5" fill={color} />
      </motion.g>

      {/* Petal 2 - Right */}
      <motion.g
        initial={staggerPetals ? { opacity: 0, scale: 0 } : {}}
        animate={staggerPetals ? { opacity: 1, scale: 1 } : {}}
        transition={staggerPetals ? { delay: 0.2, duration: 0.6 } : {}}
      >
        <path
          d="M 92 50 Q 88 58 76 62 Q 65 64 58 58 Q 56 52 62 48 Q 72 48 92 50"
          fill={color}
          opacity="0.85"
        />
        <path
          d="M 58 55 Q 52 57 45 58"
          stroke={color}
          strokeWidth="1.2"
          fill="none"
          strokeLinecap="round"
        />
        <circle cx="42" cy="58" r="1.5" fill={color} />
      </motion.g>

      {/* Petal 3 - Bottom */}
      <motion.g
        initial={staggerPetals ? { opacity: 0, scale: 0 } : {}}
        animate={staggerPetals ? { opacity: 1, scale: 1 } : {}}
        transition={staggerPetals ? { delay: 0.4, duration: 0.6 } : {}}
      >
        <path
          d="M 50 92 Q 42 88 38 76 Q 36 65 42 58 Q 48 55 52 60 Q 52 72 50 92"
          fill={color}
          opacity="0.85"
        />
        <path
          d="M 47 58 Q 45 52 44 45"
          stroke={color}
          strokeWidth="1.2"
          fill="none"
          strokeLinecap="round"
        />
        <circle cx="44" cy="42" r="1.5" fill={color} />
      </motion.g>

      {/* Petal 4 - Left */}
      <motion.g
        initial={staggerPetals ? { opacity: 0, scale: 0 } : {}}
        animate={staggerPetals ? { opacity: 1, scale: 1 } : {}}
        transition={staggerPetals ? { delay: 0.6, duration: 0.6 } : {}}
      >
        <path
          d="M 8 50 Q 12 42 24 38 Q 35 36 42 42 Q 44 48 38 52 Q 28 52 8 50"
          fill={color}
          opacity="0.85"
        />
        <path
          d="M 42 45 Q 48 43 55 42"
          stroke={color}
          strokeWidth="1.2"
          fill="none"
          strokeLinecap="round"
        />
        <circle cx="58" cy="42" r="1.5" fill={color} />
      </motion.g>

      {/* Center hub */}
      <circle cx="50" cy="50" r="3.5" fill={color} />
    </motion.svg>
  )
}
