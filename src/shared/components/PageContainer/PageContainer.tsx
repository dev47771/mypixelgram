'use client'

import { type ComponentPropsWithRef } from 'react'
import { cn } from '@/shared/lib'
import { PublicRoutes } from '@/shared/enums'
import { usePathname } from 'next/navigation'

type Props = ComponentPropsWithRef<'main'> & {
   className?: string
}

const PUBLIC_ROUTES = Object.values(PublicRoutes) as string[]

export function PageContainer({ className, ...rest }: Props) {
   const pathname = usePathname()
   const isPublic = PUBLIC_ROUTES.includes(pathname)
   const isHomePage = pathname === PublicRoutes.main

   return (
      <main
         className={cn(
            'mx-auto flex w-full max-w-[1280px] flex-col items-center px-[60px] pt-6',
            isPublic ? '' : 'pr-[0px] pl-[24px]',
            isHomePage ? 'pr-[0px] pr-[24px] pl-[24px]' : '',
            className
         )}
         {...rest}
      />
   )
}
