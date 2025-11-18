'use client'

import { PublicationForm, PublicationFormData } from '@/features/posts/forms/PublicationForm'
import { usePublishPost } from '@/features/posts/hooks'
import { Modal } from '@/shared/components/Modal'
import { isErrorInDataResponse } from '@/shared/utils/typeguards/isErrorInDataResponse'
import { PhotoState } from '@/features/post-creator/PostCreator'
import { hasModifiedFile } from '@/shared/utils'

type Props = {
   onBack: () => void
   photos: PhotoState[]
   onClose: () => void
}

export const PublicationModal = ({ onBack, photos, onClose }: Props) => {
   const { publishPost, isLoading, error } = usePublishPost()

   const photosToPost = photos.filter(hasModifiedFile).map(photo => photo.modifiedFile)

   //mock data for uploadFile
   /*   photos = [
      new File([], 'placeholder1.jpg'),
      new File([], 'placeholder2.png'),
      new File([], 'placeholder3.png'),
   ]*/

   //mock data for slider
   //const images = ['./public/404.jpg', './public/logo-light.png', './public/logo-dark.png']

   const handlePublish = async (dataPostData: PublicationFormData) => {
      await publishPost(dataPostData, photosToPost)
      onClose()
   }

   return (
      <Modal open className="w-full max-w-[972px]">
         <PublicationForm
            onSubmit={handlePublish}
            onBack={onBack}
            errorsFromApi={isErrorInDataResponse(error) ? error?.data.errorsMessages : undefined}
            isLoading={isLoading}
            images={photos.map(photo => photo.modifiedPreviewUrl)}
         />
      </Modal>
   )
}
