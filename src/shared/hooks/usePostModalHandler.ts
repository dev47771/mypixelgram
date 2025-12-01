'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'

import { useCreateQueryString } from '@/shared/hooks'

export function usePostModalHandler() {
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
      postId,
      isPostOpen,
      openPostHandler,
      closePostHandler,
   }
}
