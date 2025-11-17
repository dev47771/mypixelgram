'use client'
import { useParams, usePathname, useRouter } from 'next/navigation'
import { ComponentType, useEffect } from 'react'
import { profileRoutes, PublicRoutes } from '@/shared/enums'
import { Loader } from '@/shared/components/Loader'
import { useMeQuery } from '@/features/auth/api'

//если пользователь не авторизован — не пускать на приватные страницы
export const withPrivateRoute = <P extends object>(WrappedComponent: ComponentType<P>) => {
   // eslint-disable-next-line react/display-name
   return (props: P) => {
      const router = useRouter()
      const { id } = useParams<{ id: string }>()
      const pathname = usePathname()

      const { data, isFetching } = useMeQuery()

      useEffect(() => {
         if (!data && !isFetching) {
            if (id && pathname === profileRoutes.private(id)) {
               router.replace(profileRoutes.public(id))
            } else {
               router.replace(PublicRoutes.signIn)
            }
         }
      }, [data, isFetching, id, pathname, router])

      if (isFetching) {
         return <Loader />
      }

      if (!data) {
         return null
      }

      return <WrappedComponent {...props} />
   }
}
