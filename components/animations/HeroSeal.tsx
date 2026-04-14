'use client'

import { GreenzaPinwheel } from '../icons/GreenzaPinwheel'

export function HeroSeal() {
  return (
    <div
      className="w-[320px] h-[320px] rounded-full border border-border flex items-center justify-center"
      style={{ backgroundColor: '#F2EFE9' }}
    >
      <GreenzaPinwheel size={138} color="#2C5E3A" animate={false} />
    </div>
  )
}
