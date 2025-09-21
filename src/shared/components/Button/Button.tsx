import type { ComponentPropsWithRef } from 'react'
import { Slot } from '@radix-ui/react-slot'
import { clsx } from 'clsx'

type Props = {
   variant?: 'primary' | 'secondary' | 'outlined' | 'textButton'
   asChild?: boolean
   fullWidth?: boolean
} & ComponentPropsWithRef<'button'>

export const Button = ({ asChild, variant = 'primary', className, fullWidth, ...rest }: Props) => {
   const variantClasses: Record<string, string> = {
      button: 'unset cursor-pointer flex justify-center items-center bg-success-300',
      /*large: 'text-xxl font-semibold leading-l',
      h1: 'text-xl font-bold leading-l',
      h2: 'text-l font-bold leading-m',
      h3: 'text-m font-semibold leading-m',
      bodyRegular: 'text-m font-regular leading-m',
      bodyBold: 'text-m font-bold leading-m',
      captionRegular: 'text-s font-regular leading-m',
      captionMedium: 'text-s font-medium leading-m',
      captionBold: 'text-s font-bold leading-m',
      smallRegular: 'text-xs font-regular  leading-s',
      smallBold: 'text-xs font-semibold leading-s',
      linkRegular: 'cursor-pointer text-s font-regular text-accent-500 underline leading-m',
      linkSmall: 'cursor-pointer text-s font-regular text-accent-500 underline leading-s',*/
   }

   const Component = asChild ? Slot : 'button'

   return (
      <Component
         className={clsx(variantClasses['button'], variantClasses[variant], className)}
         {...rest}
      />
   )
}
