import React from 'react'
import { cn } from '@/shared/lib'

type Props = {
   children: React.ReactNode
   className?: string
}

export const SliderSlide = ({ children, className }: Props) => (
   <div
      className={cn('keen-slider__slide flex h-full w-full items-center justify-center', className)}
   >
      {children}
   </div>
)
