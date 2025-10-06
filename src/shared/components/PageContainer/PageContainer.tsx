import { type ComponentPropsWithRef } from 'react'
import { cn } from '@/shared/lib'

type Props = ComponentPropsWithRef<'main'> & {
   className?: string
}

export function PageContainer({ className, ...rest }: Props) {
   return (
      <main
         className={cn(
            'mx-auto flex w-full max-w-[1280px] flex-col items-center px-[60px] pt-6',
            className
         )}
         {...rest}
      />
   )
}
