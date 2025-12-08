'use client'

import { PhotoState } from '@/features/post-creator/PostCreator'
import { PublicationForm, PublicationFormData } from '@/features/posts/forms/PublicationForm'
import { usePublishPost } from '@/features/posts/hooks'
import { Modal } from '@/shared/components/Modal'
import { isErrorInDataResponse } from '@/shared/utils/typeguards/isErrorInDataResponse'
import { alert } from '@/shared/components/Alert'
import { ErrorResponse } from '@/features/auth/api'
import { useState } from 'react'
import { useApplyFilters } from '@/features/post-creator/hook/useApplyFilters'

type Props = {
   onBack: () => void
   photos: PhotoState[]
   onOpenChange: () => void
   closePostCreator: () => void
}

export const PublicationModal = ({ onBack, photos, onOpenChange, closePostCreator }: Props) => {
   const { publishPost, isLoading, error } = usePublishPost()
   const { applyFiltersToAllPhotos } = useApplyFilters()
   const [isProcessing, setIsProcessing] = useState(false)

   const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0)

   const handlePublish = async (dataPostData: PublicationFormData) => {
      try {
         setIsProcessing(true)
         const processedPhotos = await applyFiltersToAllPhotos(photos)
         await publishPost(dataPostData, processedPhotos)
         closePostCreator()
      } catch (error) {
         alert.error((error as ErrorResponse).errorsMessages[0].message || 'Something went wrong')
      } finally {
         setIsProcessing(false)
      }
   }

   return (
      <Modal open className="h-[564px] w-[972px]" onOpenChange={onOpenChange}>
         <PublicationForm
            onSubmit={handlePublish}
            onBack={onBack}
            errorsFromApi={isErrorInDataResponse(error) ? error?.data.errorsMessages : undefined}
            isLoading={isLoading || isProcessing}
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
