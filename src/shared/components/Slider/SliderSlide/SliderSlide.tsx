import React, { ComponentPropsWithRef } from 'react'
import { cn } from '@/shared/lib'

type Props = ComponentPropsWithRef<'div'>

export const SliderSlide = ({ children, className }: Props) => (
   <div
      className={cn('keen-slider__slide flex h-full w-full items-center justify-center', className)}
   >
      {children}
   </div>
)
