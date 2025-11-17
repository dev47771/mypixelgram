'use client'
import { useParams, usePathname, useRouter } from 'next/navigation'
import { ComponentType, useEffect } from 'react'
import { profileRoutes, PublicRoutes } from '@/shared/enums'
import { Loader } from '@/shared/components/Loader'
import { useMeQuery } from '@/features/auth/api'

//если пользователь авторизован — не пускать на публичные страницы
export const withPublicRoute = <P extends object>(WrappedComponent: ComponentType<P>) => {
   // eslint-disable-next-line react/display-name
   return (props: P) => {
      const router = useRouter()
      const { id } = useParams<{ id: string }>()
      const pathname = usePathname()

      const { data, isLoading } = useMeQuery()

      useEffect(() => {
         if (data && !pathname.includes(PublicRoutes.createNewPassword)) {
            if (id && pathname === profileRoutes.public(id)) {
               router.replace(profileRoutes.private(id))
            } else {
               router.replace(profileRoutes.private(data.userId))
            }
         }
      }, [data, id, pathname, router])

      if (isLoading) {
         return <Loader />
      }

      if (data) {
         return null
      }

      return <WrappedComponent {...props} />
   }
}
