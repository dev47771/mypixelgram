'use client'
import { useEffect } from 'react'
import { useMeQuery } from '@/features/auth/api'
import { usePathname, useRouter } from 'next/navigation'
import { PrivateRoutes } from '@/shared/enums'

export const NoAgeNotAllowed = () => {
   const router = useRouter()
   const pathname = usePathname()
   const { data: meData, isLoading } = useMeQuery()

   useEffect(() => {
      if (meData && !isLoading && meData.dateOfBirth === null) {
         router.push(PrivateRoutes.settings(meData.login))
      }
   }, [isLoading, meData, router, pathname])

   return null
}
