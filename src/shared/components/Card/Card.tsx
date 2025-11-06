import type { ComponentPropsWithRef, ElementType } from 'react'
import { clsx } from 'clsx'

type Props<T extends ElementType = 'div'> = {
   as?: T
   withBaseStyles?: boolean
} & ComponentPropsWithRef<T>

export const Card = <T extends ElementType = 'div'>({
   as,
   className,
   withBaseStyles = true,
   ...rest
}: Props<T>) => {
   const Component = as || 'div'

   const base = withBaseStyles ? 'bg-dark-500 border-dark-300 rounded-xs border' : ''

   return <Component className={clsx(base, className)} {...rest} />
}
