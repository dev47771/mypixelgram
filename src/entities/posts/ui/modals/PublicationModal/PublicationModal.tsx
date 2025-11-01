'use client'

import { useUploadFileMutation, useUploadPostDataMutation } from '@/features/posts/api'
import { PublicationForm, PublicationFormData } from '@/features/posts/forms/PublicationForm'
import { Modal } from '@/shared/components/Modal'

type Props = {
   open: boolean
   onBack: () => void
   images: string[]
}

export const PublicationModal = ({ open, onBack, images }: Props) => {
   const [uploadFile, { isLoading: isUploadingFile }] = useUploadFileMutation()
   const [uploadPostData, { isLoading: isUploadingPost }] = useUploadPostDataMutation()

   const isLoading = isUploadingFile || isUploadingPost

   images = ['./public/404.jpg', './public/logo-light.png', './public/logo-dark.png']

   const handlePublish = async (dataPostData: PublicationFormData) => {
      await uploadFile({ files: images }).unwrap()
      await uploadPostData(dataPostData).unwrap()
   }

   return (
      <Modal open={open} onOpenChange={onBack} className="w-full max-w-[972px]">
         <PublicationForm
            onSubmit={handlePublish}
            onBack={onBack}
            isLoading={isLoading}
            images={images}
         />
      </Modal>
   )
}
