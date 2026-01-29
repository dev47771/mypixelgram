import type { ComponentPropsWithRef, ElementType } from 'react'
import { cn } from '@/shared/lib'

type Props<T extends ElementType = 'div'> = {
   as?: T
} & ComponentPropsWithRef<T>

export const Card = <T extends ElementType = 'div'>({ as, className, ...rest }: Props<T>) => {
   const Component = as || 'div'

   return (
      <Component
         className={cn('bg-dark-500 border-dark-300 rounded-xs border', className)}
         {...rest}
      />
   )
}
