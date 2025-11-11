import React, { ComponentPropsWithRef } from 'react'
import 'keen-slider/keen-slider.min.css'
import { cn } from '@/shared/lib'

type Props = ComponentPropsWithRef<'div'>

export const SliderContent = ({ children, className, ref }: Props) => {
   return (
      <div ref={ref} className={cn('keen-slider relative h-full w-full', className)}>
         {children}
      </div>
   )
}
