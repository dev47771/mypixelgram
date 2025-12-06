import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useCreateQueryString } from '@/shared/hooks'

export function usePostUrlState() {
   const router = useRouter()
   const pathname = usePathname()
   const searchParams = useSearchParams()
   const createQueryString = useCreateQueryString()

   const postId = searchParams.get('postId')
   const isPostOpen = !!postId

   const openPostModal = (id: string) => {
      router.push(pathname + '?' + createQueryString('postId', id))
   }

   const closePostModal = () => {
      const params = new URLSearchParams(searchParams.toString())
      params.delete('postId')
      params.delete('action')
      router.push(pathname + '?' + params.toString())
   }

   const action = searchParams.get('action')
   const isEditOpen = action === 'edit'

   const openEditPostModal = () => {
      router.push(pathname + '?' + createQueryString('action', 'edit'))
   }

   const closeEditPostModal = () => {
      const params = new URLSearchParams(searchParams.toString())
      params.delete('action')
      router.replace(pathname + '?' + params.toString())
   }

   return {
      postId,
      isPostOpen,
      openPostModal,
      closePostModal,
      isEditOpen,
      openEditPostModal,
      closeEditPostModal,
   }
}
