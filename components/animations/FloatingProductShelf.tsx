'use client'

import { motion } from 'framer-motion'

export function FloatingProductShelf() {
  return (
    <div className="relative w-full h-full flex items-center justify-end pr-12">
      {/* Ambient glow behind products */}
      <div className="absolute w-96 h-96 rounded-full blur-3xl pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(74, 107, 82, 0.25) 0%, transparent 70%)',
          right: '10%',
          top: '10%',
        }}
      />

      {/* Container for all floating elements */}
      <div className="relative w-96 h-96">
        {/* Dotted botanical connecting lines */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox="0 0 400 400"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <filter id="productNoise">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.9"
                numOctaves="4"
                result="noise"
                seed="2"
              />
              <feDisplacementMap
                in="SourceGraphic"
                in2="noise"
                scale="2"
              />
            </filter>
          </defs>

          {/* Dotted line from jar to soap */}
          <line
            x1="120"
            y1="80"
            x2="280"
            y2="200"
            stroke="#c9a96e"
            strokeWidth="1"
            strokeDasharray="4 6"
            opacity="0.15"
          />

          {/* Dotted line from soap to scrub */}
          <line
            x1="280"
            y1="200"
            x2="200"
            y2="320"
            stroke="#c9a96e"
            strokeWidth="1"
            strokeDasharray="4 6"
            opacity="0.12"
          />

          {/* Scattered botanical elements */}
          {/* Small leaf */}
          <g opacity="0.25">
            <path
              d="M 350 120 Q 360 130 350 140"
              stroke="#c9a96e"
              strokeWidth="1"
              fill="none"
            />
            <ellipse cx="352" cy="130" rx="2" ry="4" fill="#c9a96e" opacity="0.3" />
          </g>

          {/* Asterisk herb sprig */}
          <g opacity="0.25">
            <line x1="60" y1="200" x2="70" y2="210" stroke="#c9a96e" strokeWidth="0.8" />
            <line x1="70" y1="200" x2="60" y2="210" stroke="#c9a96e" strokeWidth="0.8" />
            <line x1="65" y1="190" x2="65" y2="220" stroke="#c9a96e" strokeWidth="0.8" />
          </g>

          {/* Small dots scattered */}
          <circle cx="340" cy="80" r="1.5" fill="#c9a96e" opacity="0.25" />
          <circle cx="30" cy="120" r="1" fill="#c9a96e" opacity="0.2" />
          <circle cx="360" cy="280" r="1" fill="#c9a96e" opacity="0.2" />
          <circle cx="80" cy="320" r="1.5" fill="#c9a96e" opacity="0.25" />
        </svg>

        {/* Product 1: Cream Jar - Foreground */}
        <motion.div
          className="absolute"
          style={{
            left: '60px',
            top: '80px',
            zIndex: 30,
          }}
          animate={{ y: [0, -12, 0] }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <svg
            width="120"
            height="140"
            viewBox="0 0 120 140"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="jarGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" style={{ stopColor: '#e8dcc4', stopOpacity: 1 }} />
                <stop offset="50%" style={{ stopColor: '#f0ead8', stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: '#c4b99a', stopOpacity: 1 }} />
              </linearGradient>
              <radialGradient id="jarGloss">
                <stop offset="0%" style={{ stopColor: '#fefdf8', stopOpacity: 0.4 }} />
                <stop offset="100%" style={{ stopColor: '#f0ead8', stopOpacity: 0 }} />
              </radialGradient>
            </defs>

            {/* Shadow below jar */}
            <ellipse
              cx="60"
              cy="125"
              rx="45"
              ry="10"
              fill="#000000"
              opacity="0.08"
            />

            {/* Jar lid */}
            <rect
              x="35"
              y="15"
              width="50"
              height="12"
              fill="#2a4a35"
              rx="2"
            />

            {/* Jar body */}
            <path
              d="M 35 27 L 30 45 Q 30 105 50 115 L 70 115 Q 90 105 90 45 L 85 27"
              fill="url(#jarGradient)"
              stroke="#c4b99a"
              strokeWidth="1"
              opacity="0.9"
            />

            {/* Gloss highlight */}
            <ellipse
              cx="45"
              cy="50"
              rx="12"
              ry="20"
              fill="url(#jarGloss)"
            />

            {/* Cream inside (slight texture) */}
            <path
              d="M 35 70 Q 35 100 50 110 L 70 110 Q 85 100 85 70"
              fill="#e8dcc4"
              opacity="0.6"
            />
          </svg>
        </motion.div>

        {/* Product 2: Soap Bar - Mid layer */}
        <motion.div
          className="absolute"
          style={{
            right: '40px',
            top: '180px',
            zIndex: 20,
          }}
          animate={{ y: [0, -8, 0] }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1,
          }}
        >
          <svg
            width="140"
            height="100"
            viewBox="0 0 140 100"
            xmlns="http://www.w3.org/2000/svg"
            style={{ transform: 'rotate(8deg)' }}
          >
            <defs>
              <linearGradient id="soapGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: '#c4b99a', stopOpacity: 1 }} />
                <stop offset="50%" style={{ stopColor: '#b8935a', stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: '#a67c52', stopOpacity: 1 }} />
              </linearGradient>
              <radialGradient id="soapGloss">
                <stop offset="0%" style={{ stopColor: '#f0ead8', stopOpacity: 0.3 }} />
                <stop offset="100%" style={{ stopColor: '#b8935a', stopOpacity: 0 }} />
              </radialGradient>
            </defs>

            {/* Shadow */}
            <ellipse
              cx="70"
              cy="88"
              rx="55"
              ry="8"
              fill="#000000"
              opacity="0.12"
            />

            {/* Soap body - rounded rectangle */}
            <rect
              x="15"
              y="20"
              width="110"
              height="65"
              rx="8"
              fill="url(#soapGradient)"
              stroke="#9a7d4a"
              strokeWidth="1"
            />

            {/* Subtle texture lines */}
            <line
              x1="30"
              y1="40"
              x2="110"
              y2="35"
              stroke="#9a7d4a"
              strokeWidth="0.5"
              opacity="0.2"
            />
            <line
              x1="25"
              y1="60"
              x2="115"
              y2="65"
              stroke="#9a7d4a"
              strokeWidth="0.5"
              opacity="0.15"
            />

            {/* Gloss highlight on soap */}
            <ellipse
              cx="40"
              cy="40"
              rx="20"
              ry="12"
              fill="url(#soapGloss)"
            />
          </svg>
        </motion.div>

        {/* Product 3: Scrub Pot - Background/Back layer */}
        <motion.div
          className="absolute"
          style={{
            left: '140px',
            bottom: '20px',
            zIndex: 10,
          }}
          animate={{ y: [0, -6, 0] }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 0.5,
          }}
        >
          <svg
            width="110"
            height="120"
            viewBox="0 0 110 120"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="scrubBody" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: '#b8935a', stopOpacity: 1 }} />
                <stop offset="50%" style={{ stopColor: '#a67c52', stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: '#8a6646', stopOpacity: 1 }} />
              </linearGradient>
              <linearGradient id="scrubLid" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: '#3a5a45', stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: '#2a4a35', stopOpacity: 1 }} />
              </linearGradient>
            </defs>

            {/* Shadow */}
            <ellipse
              cx="55"
              cy="108"
              rx="40"
              ry="7"
              fill="#000000"
              opacity="0.1"
            />

            {/* Pot body */}
            <path
              d="M 25 45 L 20 75 Q 20 100 40 108 L 70 108 Q 90 100 90 75 L 85 45"
              fill="url(#scrubBody)"
              stroke="#704d35"
              strokeWidth="1"
            />

            {/* Lid - top circle */}
            <ellipse
              cx="55"
              cy="45"
              rx="35"
              ry="10"
              fill="url(#scrubLid)"
            />

            {/* Lid rim highlight */}
            <ellipse
              cx="55"
              cy="42"
              rx="35"
              ry="5"
              fill="#4a7a55"
              opacity="0.5"
            />

            {/* Scrub texture pattern inside */}
            <g opacity="0.3">
              <circle cx="40" cy="65" r="2" fill="#d4a574" />
              <circle cx="60" cy="72" r="2" fill="#d4a574" />
              <circle cx="70" cy="60" r="1.5" fill="#d4a574" />
              <circle cx="45" cy="82" r="1.5" fill="#d4a574" />
            </g>
          </svg>
        </motion.div>
      </div>

      {/* Vertical label beside products - rotated */}
      <motion.div
        className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.8 }}
      >
        <div
          style={{
            writingMode: 'vertical-rl',
            transform: 'rotate(180deg)',
            fontSize: '10px',
            fontFamily: 'DM Serif Display, serif',
            fontStyle: 'italic',
            letterSpacing: '3px',
            color: '#c9a96e',
            opacity: 0.6,
            whiteSpace: 'nowrap',
          }}
        >
          ÉL İLƏ HAZIRLANMIS
        </div>
      </motion.div>
    </div>
  )
}
