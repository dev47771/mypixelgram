'use client'
import { useParams } from 'next/navigation'
import { useGetUserByLoginQuery } from '@/entities/user'

export function useUserProfile() {
   const { login } = useParams<{ login: string }>()
   const { data: userProfile, isLoading } = useGetUserByLoginQuery(login, {
      skip: !login,
   })

   return { login, userProfile, isLoading }
}
