'use client'
import { useEffect } from 'react'
import { useMeQuery } from '@/features/auth/api'
import { useRouter } from 'next/navigation'

export const NoAgeNotAllowed = () => {
   const router = useRouter()
   const { data: meData, isLoading } = useMeQuery()
   console.log('ME DATA', meData)
   useEffect(() => {
      if (meData && !isLoading) {
         console.log('we here')
      }
   }, [])

   return null
}
