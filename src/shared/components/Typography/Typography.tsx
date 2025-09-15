import { ComponentPropsWithRef, ElementType, ReactNode } from 'react'
import { TypographyVariant } from '@/shared/lib'
import { clsx } from 'clsx'
import { resolveTypographyTag } from '@/shared/components/Typography/resolveTag'
import { variantClasses } from '@/shared/components/Typography/variantClasses'
import Link from 'next/link'

export type TypographyProps<T extends ElementType> = {
   as?: T
   children?: ReactNode
   className?: string
   variant?: TypographyVariant
} & (T extends typeof Link ? ComponentPropsWithRef<typeof Link> : ComponentPropsWithRef<T>)

export const Typography = <T extends ElementType = 'p'>({
   as,
   children,
   className,
   variant = 'bodyRegular',
   ...rest
}: TypographyProps<T>) => {
   const Component = resolveTypographyTag(as, variant)
   const mergedClass =
      variant in variantClasses
         ? clsx(variantClasses[variant as TypographyVariant], className)
         : className

   return (
      <Component className={mergedClass} {...rest}>
         {children}
      </Component>
   )
}
