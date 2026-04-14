'use client'

import { motion } from 'framer-motion'

export function CandleFlame() {
  return (
    <div className="relative w-80 h-96 flex items-center justify-center">
      {/* Background glow halo - animated pulse */}
      <motion.div
        className="absolute w-96 h-96 rounded-full blur-3xl pointer-events-none glow-pulse"
        style={{
          background: 'radial-gradient(circle, rgba(201, 169, 110, 0.15) 0%, transparent 70%)',
        }}
      />

      {/* Floating particles around candle */}
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i / 8) * Math.PI * 2
        const distance = 140
        const x = Math.cos(angle) * distance
        const y = Math.sin(angle) * distance
        const duration = 4 + Math.random() * 3

        return (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-gold/40"
            style={{
              left: '50%',
              top: '50%',
            }}
            animate={{
              x: [x * 0.8, x, x * 0.8],
              y: [y * 0.8 - 20, y, y * 0.8 + 20],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        )
      })}

      {/* Main candle SVG */}
      <svg
        viewBox="0 0 200 400"
        className="w-full h-full relative z-10"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Wax texture gradient */}
          <linearGradient id="waxGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style={{ stopColor: '#f0ead8', stopOpacity: 1 }} />
            <stop offset="50%" style={{ stopColor: '#e8dcc4', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: '#c4b99a', stopOpacity: 1 }} />
          </linearGradient>

          {/* Glossy wax pool */}
          <radialGradient id="poolGloss" cx="50%" cy="40%">
            <stop offset="0%" style={{ stopColor: '#f0ead8', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: '#e8dcc4', stopOpacity: 0.8 }} />
          </radialGradient>

          {/* Warm cast glow */}
          <filter id="warmGlow">
            <feGaussianBlur stdDeviation="4" />
          </filter>
        </defs>

        {/* Cast shadow/glow on background */}
        <ellipse
          cx="100"
          cy="320"
          rx="80"
          ry="30"
          fill="#c9a96e"
          opacity="0.08"
          filter="url(#warmGlow)"
        />

        {/* Candle body - thick cylinder with drip texture */}
        <g>
          {/* Main body */}
          <rect
            x="70"
            y="180"
            width="60"
            height="140"
            fill="url(#waxGradient)"
            rx="3"
          />

          {/* Left shadow for depth */}
          <rect
            x="70"
            y="180"
            width="8"
            height="140"
            fill="#c4b99a"
            opacity="0.6"
            rx="3"
          />

          {/* Wax drip on right side */}
          <path
            d="M 130 220 Q 135 230 133 240 L 132 250 Q 131 260 130 270"
            stroke="#e8dcc4"
            strokeWidth="2"
            fill="none"
            opacity="0.6"
          />

          {/* Another drip */}
          <path
            d="M 129 280 Q 133 295 131 310 L 130 320"
            stroke="#e8dcc4"
            strokeWidth="1.5"
            fill="none"
            opacity="0.5"
          />
        </g>

        {/* Wax pool at top of candle */}
        <ellipse
          cx="100"
          cy="180"
          rx="30"
          ry="12"
          fill="url(#poolGloss)"
          opacity="0.9"
        />

        {/* Highlight on wax pool for gloss */}
        <ellipse
          cx="95"
          cy="176"
          rx="12"
          ry="5"
          fill="#fefdf8"
          opacity="0.3"
        />

        {/* Wick - thin dark line */}
        <line
          x1="100"
          y1="170"
          x2="100"
          y2="80"
          stroke="#2a2a2a"
          strokeWidth="1.5"
        />

        {/* Ember glow at wick tip */}
        <circle
          cx="100"
          cy="78"
          r="2.5"
          fill="#ffd700"
          opacity="0.8"
        />

        {/* Flame group with sway animation */}
        <g
          className="candle-flame-group"
          style={{
            transformOrigin: '100px 60px',
          }}
        >
          {/* Outer flame - orange, flickers at 1.8s */}
          <g className="candle-flame-outer">
            <path
              d="M 100 20 Q 75 40 77 70 Q 80 55 100 35 Q 120 55 123 70 Q 125 40 100 20"
              fill="#c9a96e"
              opacity="0.4"
            />
          </g>

          {/* Inner flame - yellow-white, flickers at 2.3s */}
          <g className="candle-flame-inner">
            <path
              d="M 100 35 Q 85 50 86 68 Q 90 55 100 42 Q 110 55 114 68 Q 115 50 100 35"
              fill="#fff3d6"
              opacity="0.95"
            />
          </g>

          {/* Core flame - white, flickers at 1.5s */}
          <g className="candle-flame-core">
            <ellipse
              cx="100"
              cy="55"
              rx="6"
              ry="12"
              fill="#fefdf8"
              opacity="1"
            />
            <path
              d="M 100 48 Q 102 52 100 60"
              stroke="#fefdf8"
              strokeWidth="1"
              fill="none"
              opacity="0.6"
            />
          </g>
        </g>

        {/* Smoke wisps above flame */}
        <g opacity="0.2">
          {/* Left wisp */}
          <motion.path
            d="M 85 15 Q 80 5 85 -5"
            stroke="#f0ead8"
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
            animate={{ y: [-5, -20] }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />

          {/* Center wisp */}
          <motion.path
            d="M 100 10 Q 98 -5 102 -15"
            stroke="#f0ead8"
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
            animate={{ y: [-8, -25] }}
            transition={{
              duration: 3.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />

          {/* Right wisp */}
          <motion.path
            d="M 115 15 Q 120 5 115 -5"
            stroke="#f0ead8"
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
            animate={{ y: [-6, -22] }}
            transition={{
              duration: 2.8,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </g>
      </svg>
    </div>
  )
}
