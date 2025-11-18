'use client'

import { PhotoState } from '@/features/post-creator/PostCreator'
import { applyFilterToImage } from '@/features/post-creator/utils/applyImageFilter'
import { PublicationForm, PublicationFormData } from '@/features/posts/forms/PublicationForm'
import { usePublishPost } from '@/features/posts/hooks'
import { Modal } from '@/shared/components/Modal'
import { isErrorInDataResponse } from '@/shared/utils/typeguards/isErrorInDataResponse'
import { alert } from '@/shared/components/Alert'
import { ErrorResponse } from '@/features/auth/api'

type Props = {
   onBack: () => void
   photos: PhotoState[]
   onClose: () => void
}

export const PublicationModal = ({ onBack, photos, onClose }: Props) => {
   const { publishPost, isLoading, error } = usePublishPost()

   //mock data for uploadFile
   // photos = [
   //    new File([], 'placeholder1.jpg'),
   //    new File([], 'placeholder2.png'),
   //    new File([], 'placeholder3.png'),
   // ]

   //mock data for slider
   //const images = ['./public/404.jpg', './public/logo-light.png', './public/logo-dark.png']

   // const handlePublish = async (dataPostData: PublicationFormData) => {
   //    await publishPost(dataPostData, photos)
   //    onClose()
   // }

   const handlePublish = async (dataPostData: PublicationFormData) => {
      try {
         // Ждём обработки всех фото
         const processedPhotos = await Promise.all(photos.map(photo => applyFilterToImage(photo)))

         // Отправка данных на сервер вместе с обработанными фото
         await publishPost(dataPostData, processedPhotos)

         // Закрываем модалку после успешной публикации
         onClose()
      } catch (error) {
         alert.error((error as ErrorResponse).errorsMessages[0].message || 'Something went wrong')
      }
   }

   return (
      <Modal open className="w-full max-w-[972px]">
         <PublicationForm
            onSubmit={handlePublish}
            onBack={onBack}
            errorsFromApi={isErrorInDataResponse(error) ? error?.data.errorsMessages : undefined}
            isLoading={isLoading}
            images={photos.map(photo => photo.previewUrl)}
         />
      </Modal>
   )
}
