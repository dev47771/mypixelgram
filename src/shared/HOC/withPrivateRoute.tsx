'use client'
import { usePathname, useRouter } from 'next/navigation'
import { ComponentType, useEffect } from 'react'

import { Loader } from '@/shared/components/Loader'
import { useMeQuery } from '@/features/auth/api'
import { ROUTES } from '@/shared/constants'

//если пользователь не авторизован — не пускать на приватные страницы
export const withPrivateRoute = <P extends object>(WrappedComponent: ComponentType<P>) => {
   // eslint-disable-next-line react/display-name
   return (props: P) => {
      const router = useRouter()
      const pathname = usePathname()

      const { data, isFetching } = useMeQuery()

      useEffect(() => {
         if (!data && !isFetching) {
            router.replace(ROUTES.public.signIn)
         }
      }, [data, isFetching, pathname, router])

      if (isFetching) {
         return <Loader />
      }

      if (!data) {
         return null
      }

      return <WrappedComponent {...props} />
   }
}
