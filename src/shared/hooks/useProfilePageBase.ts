'use client'

import { useParams, usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useGetUserByLoginQuery } from '@/entities/user'
import { useCreateQueryString } from '@/shared/hooks'

export function useProfilePageBase() {
   const { login } = useParams<{ login: string }>()
   const { data: userProfile, isLoading } = useGetUserByLoginQuery(login)

   const router = useRouter()
   const pathname = usePathname()
   const searchParams = useSearchParams()
   const createQueryString = useCreateQueryString()

   const postId = searchParams.get('postId')
   const isPostOpen = !!postId
   const openPostHandler = (postId: string) => {
      router.push(pathname + '?' + createQueryString('postId', postId))
   }

   const closePostHandler = () => {
      const params = new URLSearchParams(searchParams.toString())
      params.delete('postId')
      router.push(pathname + '?' + params.toString())
   }

   return {
      login,
      userProfile,
      isLoading,
      postId,
      isPostOpen,
      openPostHandler,
      closePostHandler,
   }
}
