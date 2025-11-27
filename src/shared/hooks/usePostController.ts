'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useDeletePostMutation } from '@/features/posts/api'
import { useGetUserByLoginQuery } from '@/entities/user'
import { useParams } from 'next/navigation'
import { useState } from 'react'
import { useCreateQueryString } from '@/shared/hooks'

export function usePostController() {
   const { login } = useParams<{ login: string }>()
   const { data: userProfile, isLoading } = useGetUserByLoginQuery(login)

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
      params.delete('action') // закрываем edit если открыт
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

   const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
   const [deletePost] = useDeletePostMutation()

   const openDeletePostModal = () => setIsDeleteModalOpen(true)
   const closeDeletePostModal = () => setIsDeleteModalOpen(false)

   const confirmDelete = async () => {
      if (!postId) return

      try {
         await deletePost(postId).unwrap()

         // закрываем пост после удаления
         closePostModal()
         closeDeletePostModal()
      } catch (e) {
         console.error('Failed to delete post', e)
      }
   }

   const handleMenuAction = (action: string) => {
      switch (action) {
         case 'edit':
            openEditPostModal()
            break
         case 'delete':
            openDeletePostModal()
            break
         default:
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
