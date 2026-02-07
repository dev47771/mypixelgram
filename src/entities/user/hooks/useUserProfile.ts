'use client'
import { useParams } from 'next/navigation'
import { useGetUserByLoginQuery } from '../api/user.service'

export function useUserProfile() {
   const { login } = useParams<{ login: string }>()
   const { data: userProfile, isLoading } = useGetUserByLoginQuery(login, {
      skip: !login,
   })

   return { login, userProfile, isLoading }
}
