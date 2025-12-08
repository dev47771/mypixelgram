import React, { ComponentPropsWithRef } from 'react'
import { cn } from '@/shared/lib'

type Props = ComponentPropsWithRef<'div'>

export const SliderRoot = ({ children, className }: Props) => (
   <div className={cn('relative h-[300px] w-[300px]', className)}>{children}</div>
)
