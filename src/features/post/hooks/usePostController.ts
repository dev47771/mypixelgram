'use client'

import { usePostDelete, usePostUrlState } from '@/features/post/hooks'
import { useUserProfile } from '@/entities/user/hooks/useUserProfile'

export function usePostController() {
   const { login, userProfile, isLoading } = useUserProfile()

   const {
      postId,
      isPostOpen,
      openPostModal,
      closePostModal,
      isEditOpen,
      openEditPostModal,
      closeEditPostModal,
   } = usePostUrlState()

   const { isDeleteModalOpen, openDeletePostModal, closeDeletePostModal, confirmDelete } =
      usePostDelete(postId, closePostModal)

   const handleMenuAction = (action: string) => {
      switch (action) {
         case 'edit':
            openEditPostModal()
            break
         case 'delete':
            openDeletePostModal()
            break
      }
   }

   return {
      login,
      userProfile,
      isLoading,

      postId,
      isPostOpen,
      openPostModal,
      closePostModal,

      isEditOpen,
      openEditPostModal,
      closeEditPostModal,

      isDeleteModalOpen,
      openDeletePostModal,
      closeDeletePostModal,
      confirmDelete,

      handleMenuAction,
   }
}
