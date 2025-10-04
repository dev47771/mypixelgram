import { type ComponentPropsWithRef } from 'react'
import { cn } from '@/shared/lib'

type Props = ComponentPropsWithRef<'main'> & {
   className?: string
}

export function PageContainer({ className, ...rest }: Props) {
   return (
      <main className={cn('mx-auto w-full max-w-[1280px] px-[60px] py-6', className)} {...rest} />
   )
}
