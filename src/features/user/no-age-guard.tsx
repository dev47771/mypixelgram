'use client'
import { useEffect } from 'react'
import { useMeQuery } from '@/entities/user/api'
import { usePathname, useRouter } from 'next/navigation'
import { ROUTES } from '@/shared/constants'
import { alert } from '@/shared/components/Alert'

export const NoAgeGuard = () => {
   const router = useRouter()
   const pathname = usePathname()
   const { data: meData, isLoading } = useMeQuery()

   useEffect(() => {
      if (meData && !isLoading && meData.dateOfBirth === null) {
         alert.error('Please ❤🙌 set you age !')
         router.push(ROUTES.settings.base)
      }
   }, [isLoading, meData, router, pathname])

   return null
}
