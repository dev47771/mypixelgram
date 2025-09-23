import type { ComponentPropsWithRef, ElementType } from 'react'
import { clsx } from 'clsx'

type Props<T extends ElementType = 'div'> = {
   as?: T
} & ComponentPropsWithRef<T>

export const Card = <T extends ElementType = 'div'>({ as, className, ...rest }: Props<T>) => {
   const Component = as || 'div'

   return (
      <Component
         className={clsx('bg-dark-500 border-dark-300 rounded border', className)}
         {...rest}
      />
   )
}
