'use client'

import { type ComponentPropsWithRef } from 'react'
import { cn } from '@/shared/lib'
import { ROUTES } from '@/shared/constants'
import { usePathname } from 'next/navigation'
import { useMeQuery } from '@/features/auth/api'

const PUBLIC_ROUTES = Object.values(ROUTES.public) as string[]

export function PageContainer({ className, ...rest }: ComponentPropsWithRef<'main'>) {
   const pathname = usePathname()
   const { data, isLoading } = useMeQuery()
   const isAuthorized = !!data && !isLoading

   const isPublic = PUBLIC_ROUTES.includes(pathname)
   const isHomePage = pathname === ROUTES.public.main

   return (
      <main
         className={cn(
            'mx-auto flex w-full max-w-[1280px] flex-col items-center px-[60px] pt-6',
            isPublic ? '' : 'pr-[0px] pl-[24px]',
            isHomePage && (isAuthorized ? 'pr-[0px] pl-[24px]' : 'pr-0 pl-0'),
            className
         )}
         {...rest}
      />
   )
}
