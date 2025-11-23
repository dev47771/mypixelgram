'use client'

import { PhotoState } from '@/features/post-creator/PostCreator'
import { PublicationForm, PublicationFormData } from '@/features/posts/forms/PublicationForm'
import { usePublishPost } from '@/features/posts/hooks'
import { Modal } from '@/shared/components/Modal'
import { isErrorInDataResponse } from '@/shared/utils/typeguards/isErrorInDataResponse'
import { alert } from '@/shared/components/Alert'
import { ErrorResponse } from '@/features/auth/api'
import { useState } from 'react'
import { applyFilterToImage } from '@/features/post-creator/utils/applyImageFilter'

type Props = {
   onBack: () => void
   photos: PhotoState[]
   onOpenChange: () => void
   closePostCreator: () => void
}

export const PublicationModal = ({ onBack, photos, onOpenChange, closePostCreator }: Props) => {
   const { publishPost, isLoading, error } = usePublishPost()
   const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0)

   const handlePublish = async (dataPostData: PublicationFormData) => {
      try {
         // Ждём обработки всех фото
         const processedPhotos = await Promise.all(photos.map(photo => applyFilterToImage(photo)))

         // Отправка данных на сервер вместе с обработанными фото
         await publishPost(dataPostData, processedPhotos)

         // Закрываем модалку после успешной публикации
         closePostCreator()
      } catch (error) {
         alert.error((error as ErrorResponse).errorsMessages[0].message || 'Something went wrong')
      }
   }

   return (
      <Modal open className="w-full max-w-[972px]" onOpenChange={onOpenChange}>
         <PublicationForm
            onSubmit={handlePublish}
            onBack={onBack}
            errorsFromApi={isErrorInDataResponse(error) ? error?.data.errorsMessages : undefined}
            isLoading={isLoading}
            images={photos.map(photo =>
               photo.modifiedPreviewUrl && photo.modifiedPreviewUrl !== ''
                  ? photo.modifiedPreviewUrl
                  : photo.previewUrl
            )}
            filters={photos.map(photo => photo.currentFilter)}
            onSlideChange={setCurrentPhotoIndex}
            currentSlide={currentPhotoIndex}
         />
      </Modal>
   )
}
