'use client'
import { useRouter } from 'next/navigation'
import { ComponentType, useEffect } from 'react'
import { PublicRoutes } from '@/shared/enums'
import { Loader } from '@/shared/components/Loader'
import { useMeQuery } from '@/features/auth/api'

export const withPrivateRoute = <P extends object>(WrappedComponent: ComponentType<P>) => {
   // eslint-disable-next-line react/display-name
   return (props: P) => {
      const router = useRouter()

      const { data, isFetching } = useMeQuery()

      useEffect(() => {
         if (!data && !isFetching) {
            router.replace(PublicRoutes.signIn)
         }
      }, [data, isFetching, router])

      if (isFetching) {
         return <Loader />
      }

      if (!data) {
         return null
      }

      return <WrappedComponent {...props} />
   }
}
