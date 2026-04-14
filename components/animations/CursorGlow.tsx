'use client'

import { useMousePosition } from '@/hooks/useMousePosition'
import { useReducedMotion } from 'framer-motion'
import { useEffect, useState } from 'react'

export function CursorGlow() {
  const mousePosition = useMousePosition()
  const shouldReduceMotion = useReducedMotion()
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  if (shouldReduceMotion || !isVisible) {
    return null
  }

  return (
    <div
      className="fixed pointer-events-none z-50 mix-blend-screen"
      style={{
        left: `${mousePosition.x}px`,
        top: `${mousePosition.y}px`,
        transform: 'translate(-50%, -50%)',
      }}
    >
      <div
        className="rounded-full"
        style={{
          width: '400px',
          height: '400px',
          background: `radial-gradient(circle, rgba(201, 169, 110, 0.12) 0%, rgba(201, 169, 110, 0.04) 60%, transparent 100%)`,
          filter: 'blur(60px)',
        }}
      />
    </div>
  )
}
