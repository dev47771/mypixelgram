import { useDeletePostMutation } from '@/features/post/api'
import { useState } from 'react'

export function usePostDelete(postId: string | null, closePostModal: () => void) {
   const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
   const [deletePost] = useDeletePostMutation()

   const openDeletePostModal = () => setIsDeleteModalOpen(true)
   const closeDeletePostModal = () => setIsDeleteModalOpen(false)

   const confirmDelete = async () => {
      if (!postId) return

      try {
         await deletePost(postId).unwrap()
         closePostModal()
         closeDeletePostModal()
      } catch (e) {
         console.error('Failed to delete post', e)
      }
   }

   return {
      isDeleteModalOpen,
      openDeletePostModal,
      closeDeletePostModal,
      confirmDelete,
   }
}
