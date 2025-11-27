import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useDeletePostMutation } from '@/features/posts/api'
import { useState } from 'react'

export const usePostMenuActions = (postId: string) => {
   const router = useRouter()
   const pathname = usePathname()
   const searchParams = useSearchParams()

   const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
   const [deletePost] = useDeletePostMutation()

   const openDeletePostModal = () => setIsDeleteModalOpen(true)
   const closeDeletePostModal = () => setIsDeleteModalOpen(false)

   const confirmDelete = async () => {
      try {
         await deletePost(postId).unwrap()

         const params = new URLSearchParams(searchParams.toString())
         params.delete('postId')
         router.push(pathname + '?' + params.toString())

         closeDeletePostModal()
      } catch (e) {
         console.error('Failed to delete post', e)
      }
   }

   const handleAction = async (action: string) => {
      switch (action) {
         case 'delete':
            openDeletePostModal()
            break

         default:
            break
      }
   }

   return { handleAction, isDeleteModalOpen, confirmDelete, closeDeletePostModal }
}
