'use client'

import { PublicationForm, PublicationFormData } from '@/features/posts/forms/PublicationForm'
import { usePublishPost } from '@/features/posts/hooks'
import { Modal } from '@/shared/components/Modal'
import { isErrorInDataResponse } from '@/shared/utils/typeguards/isErrorInDataResponse'

type Props = {
   onBack: () => void
   photos: File[]
}

export const PublicationModal = ({ onBack, photos }: Props) => {
   const { publishPost, isLoading, error } = usePublishPost()

   //mock data for uploadFile
   photos = [
      new File([], 'placeholder1.jpg'),
      new File([], 'placeholder2.png'),
      new File([], 'placeholder3.png'),
   ]

   //mock data for slider
   const images = ['./public/404.jpg', './public/logo-light.png', './public/logo-dark.png']

   const handlePublish = (dataPostData: PublicationFormData) => {
      publishPost(dataPostData, photos)
   }

   return (
      <Modal open className="w-full max-w-[972px]">
         <PublicationForm
            onSubmit={handlePublish}
            onBack={onBack}
            errorsFromApi={isErrorInDataResponse(error) ? error?.data.errorsMessages : undefined}
            isLoading={isLoading}
            images={images}
         />
      </Modal>
   )
}
