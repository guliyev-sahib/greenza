'use client'

import { GreenzaPinwheel } from './icons/GreenzaPinwheel'

interface GreenzaLogoProps {
  textOnly?: boolean
  variant?: 'navbar' | 'hero' | 'footer'
  size?: 'sm' | 'md' | 'lg'
  animate?: boolean
}

const sizeMap = {
  sm: { icon: 20, text: 'text-xs', gap: 'gap-1.5' },
  md: { icon: 40, text: 'text-base', gap: 'gap-2' },
  lg: { icon: 160, text: 'text-4xl', gap: 'gap-4' },
}

export function GreenzaLogo({
  textOnly = false,
  variant = 'navbar',
  size = 'md',
  animate = true,
}: GreenzaLogoProps) {
  const sizeConfig = sizeMap[size]

  // Navbar: Horizontal layout, pinwheel + text side by side
  if (variant === 'navbar') {
    return (
      <div className={`flex items-center ${sizeConfig.gap}`}>
        <GreenzaPinwheel
          size={sizeConfig.icon}
          color="#2C5E3A"
          animate={animate}
        />
        <span className="relative font-display text-foreground font-light">
          Greenza
          <svg
            width="8"
            height="8"
            viewBox="0 0 20 20"
            className="absolute -top-0.5 -right-1"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M 15 8 Q 18 5 16 2"
              stroke="#1a1a18"
              strokeWidth="0.8"
              fill="none"
              strokeLinecap="round"
            />
            <circle cx="16" cy="2" r="0.6" fill="#1a1a18" />
          </svg>
        </span>
      </div>
    )
  }

  // Hero: Vertical layout, icon over text, large
  return (
    <div className="flex flex-col items-center gap-3">
      <GreenzaPinwheel
        size={sizeConfig.icon}
        color="#2C5E3A"
        animate={animate}
      />
      <div className="relative text-center">
        <div className={`${sizeConfig.text} font-display text-primary font-light`}>
          Greenza
        </div>
        <svg
          width="16"
          height="16"
          viewBox="0 0 20 20"
          className="absolute top-0 right-0 transform translate-x-1 -translate-y-1"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M 15 8 Q 18 5 16 2"
            stroke="#2C5E3A"
            strokeWidth="1.2"
            fill="none"
            strokeLinecap="round"
          />
          <circle cx="16" cy="2" r="1.2" fill="#2C5E3A" />
        </svg>
      </div>
    </div>
  )
}
