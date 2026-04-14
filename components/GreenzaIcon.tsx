'use client'

import { motion } from 'framer-motion'

interface GreenzaIconProps {
  size?: number
  color?: string
  animate?: boolean
  className?: string
}

export default function GreenzaIcon({
  size = 120,
  color = '#2C5E3A',
  animate = false,
  className = '',
}: GreenzaIconProps) {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      animate={animate ? { rotate: 360 } : undefined}
      transition={animate ? { duration: 20, repeat: Infinity, ease: 'linear' } : undefined}
      style={{ transformOrigin: '50% 50%' }}
    >
      {Array.from({ length: 5 }).map((_, index) => (
        <g key={index} transform={`rotate(${index * 72} 50 50)`}>
          <path
            d="M50 50 C56 34, 72 29, 81 39 C88 47, 87 62, 77 69 C68 75, 57 70, 50 58 C48 55, 48 52, 50 50Z"
            fill={color}
          />
          <ellipse
            cx="83"
            cy="40"
            rx="4"
            ry="2"
            transform="rotate(-24 83 40)"
            fill={color}
          />
        </g>
      ))}
      <circle cx="50" cy="50" r="3" fill={color} />
    </motion.svg>
  )
}
