'use client'
import { usePathname, useRouter } from 'next/navigation'
import { ComponentType, useEffect } from 'react'
import { ROUTES } from '@/shared/constants'
import { Loader } from '@/shared/components/Loader'
import { useMeQuery } from '@/features/auth/api'

//если пользователь авторизован — не пускать на публичные страницы
export const withPublicRoute = <P extends object>(WrappedComponent: ComponentType<P>) => {
   // eslint-disable-next-line react/display-name
   return (props: P) => {
      const router = useRouter()
      const pathname = usePathname()

      const { data, isLoading } = useMeQuery()

      useEffect(() => {
         if (
            data &&
            !pathname.includes(ROUTES.public.createNewPassword) &&
            !pathname.includes(ROUTES.public.privacyPolicy) &&
            !pathname.includes(ROUTES.public.termsOfService)
         ) {
            router.replace(ROUTES.private.feed)
         }
      }, [data, pathname, router])

      if (isLoading) {
         return <Loader />
      }

      if (
         data &&
         !pathname.includes(ROUTES.public.privacyPolicy) &&
         !pathname.includes(ROUTES.public.termsOfService)
      ) {
         return null
      }

      return <WrappedComponent {...props} />
   }
}
