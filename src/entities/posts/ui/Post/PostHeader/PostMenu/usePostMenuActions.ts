import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useDeletePostMutation } from '@/features/posts/api'

export const usePostMenuActions = (postId: string) => {
   const router = useRouter()
   const pathname = usePathname()
   const searchParams = useSearchParams()

   const [deletePost] = useDeletePostMutation()

   const handleAction = async (action: string) => {
      switch (action) {
         case 'delete':
            try {
               await deletePost(postId).unwrap()
               const params = new URLSearchParams(searchParams.toString())
               params.delete('postId')
               router.push(pathname + '?' + params.toString())
            } catch (e) {
               console.error('Failed to delete post', e)
            }
            break

         default:
            break
      }
   }

   return { handleAction }
}
