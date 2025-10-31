'use client'

import { Modal } from '@/shared/components/Modal'
import { useState } from 'react'
import { PublicationForm, PublicationFormData } from '../forms/PublicationForm'

type Props = {
   open: boolean
   onConfirm: (data: PublicationFormData) => Promise<void>
   onCancel: () => void
   images: string[]
}

export const PublicationModal = ({ open, onConfirm, onCancel, images }: Props) => {
   const [isSubmitting, setIsSubmitting] = useState(false)

   images = ['./public/404.jpg', './public/logo-light.png', './public/logo-dark.png']

   const handlePublish = async (data: PublicationFormData) => {
      setIsSubmitting(true)
      try {
         await onConfirm(data)
         onCancel()
      } catch (error) {
         console.warn('Error', error)
      } finally {
         setIsSubmitting(false)
      }
   }

   return (
      <Modal open={open} onOpenChange={onCancel} className="w-full max-w-[972px]">
         <PublicationForm
            onSubmit={handlePublish}
            onCancel={onCancel}
            isSubmitting={isSubmitting}
            images={images}
         />
      </Modal>
   )
}
