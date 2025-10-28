import React from 'react'
import { cn } from '@/shared/lib'

type Props = {
   children: React.ReactNode
   className?: string
}

export const SliderRoot = ({ children, className }: Props) => (
   <div className={cn('relative h-[300px] w-[300px]', className)}>{children}</div>
)
