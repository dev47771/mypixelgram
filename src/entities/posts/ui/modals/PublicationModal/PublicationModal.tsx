'use client'

import { useUploadFileMutation, useUploadPostDataMutation } from '@/features/posts/api'
import { PublicationForm, PublicationFormData } from '@/features/posts/forms/PublicationForm'
import { Modal } from '@/shared/components/Modal'
import { isErrorInDataResponse } from '@/shared/utils/typeguards/isErrorInDataResponse'

type Props = {
   open: boolean
   onBack: () => void
}

export const PublicationModal = ({ open, onBack }: Props) => {
   const [uploadFile, { isLoading: isUploadingFile }] = useUploadFileMutation()
   const [uploadPostData, { error, isLoading: isUploadingPost }] = useUploadPostDataMutation()

   const isLoading = isUploadingFile || isUploadingPost

   const images = ['./public/404.jpg', './public/logo-light.png', './public/logo-dark.png']

   const handlePublish = async (dataPostData: PublicationFormData) => {
      await uploadFile({ files: images }).unwrap()
      await uploadPostData(dataPostData).unwrap()
   }

   return (
      <Modal open={open} onOpenChange={onBack} className="w-full max-w-[972px]">
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
