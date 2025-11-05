import type { ComponentPropsWithRef } from 'react'
import { Slot } from '@radix-ui/react-slot'
import { clsx } from 'clsx'
import { cn } from '@/shared/lib'

type Props = {
   variant?: 'primary' | 'secondary' | 'outlined' | 'textButton'
   asChild?: boolean
   fullWidth?: boolean
} & ComponentPropsWithRef<'button'>

export const Button = ({
   asChild = false,
   variant = 'primary',
   className,
   fullWidth = false,
   ...rest
}: Props) => {
   const baseClasses = clsx(
      'cursor-pointer inline-flex justify-center items-center box-border px-5.75 py-1.25 rounded-sm  text-m font-semibold leading-m transition-all duration-200 ease-in-out gap-2.5',
      'focus:outline-none',
      'disabled:cursor-not-allowed',
      {
         'w-full': fullWidth,
      }
   )

   const variantClasses: Record<string, string> = {
      primary: clsx(
         'text-light-100 bg-accent-500 border border-transparent',
         'hover:bg-accent-100',
         'active:bg-accent-700 active:text-light-500',
         'focus:ring-2 focus:ring-accent-700',
         'disabled:bg-accent-900 disabled:text-light-900'
      ),
      secondary: clsx(
         'text-light-100 bg-dark-300 border border-transparent',
         'hover:bg-dark-100',
         'active:bg-misc-primary-100 ',
         'focus:ring focus:ring-accent-300',
         'disabled:bg-dark-500 disabled:text-light-900'
      ),
      outlined: clsx(
         'border border-accent-500 text-accent-500 bg-transparent',
         'hover:border-accent-100 hover:text-accent-100',
         'active:border-accent-700 active:text-accent-700',
         'focus:ring focus:ring-accent-700  focus:border-accent-700 focus:text-accent-700',
         'focus:hover:text-accent-100',
         'disabled:border-accent-900 disabled:text-accent-900'
      ),
      textButton: clsx(
         'text-accent-500 bg-transparent border border-transparent',
         'hover:text-accent-100',
         'active:text-accent-700',
         'focus:ring-2 focus:ring-accent-700',
         'disabled:text-accent-900'
      ),
   }

   const Component = asChild ? Slot : 'button'

   return <Component className={cn(baseClasses, variantClasses[variant], className)} {...rest} />
}
