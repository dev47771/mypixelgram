'use client'

import { useParams, usePathname, useRouter } from 'next/navigation'
import { useGetUserByLoginQuery } from '@/entities/user'
import { useCreateQueryString } from '@/shared/hooks'

export function useProfilePageBase() {
   const { login } = useParams<{ login: string }>()
   const { data: userProfile, isLoading } = useGetUserByLoginQuery(login)

   const router = useRouter()
   const pathname = usePathname()
   const createQueryString = useCreateQueryString()

   const openPostHandler = (postId: string) => {
      router.push(pathname + '?' + createQueryString('postId', postId))
   }

   return {
      login,
      userProfile,
      isLoading,
      openPostHandler,
   }
}
