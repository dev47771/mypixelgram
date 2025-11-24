import React, { ComponentPropsWithRef } from 'react'
import { cn } from '@/shared/lib'

type Props = ComponentPropsWithRef<'button'>

export const SliderArrow = ({ children, onClick, className }: Props) => (
   <button
      onClick={onClick}
      className={cn(
         'bg-dark-300/50 absolute top-[50%] flex h-12 w-12 -translate-y-1/2 cursor-pointer items-center justify-center rounded-xs',
         'group hover:bg-dark-300/80',
         className
      )}
      type="button"
   >
      {children}
   </button>
)
