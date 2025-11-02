'use client'

import { useUploadFileMutation, useUploadPostDataMutation } from '@/features/posts/api'
import { PublicationForm, PublicationFormData } from '@/features/posts/forms/PublicationForm'
import { PostModal } from '@/shared/components/PostModal'
import { isErrorInDataResponse } from '@/shared/utils/typeguards/isErrorInDataResponse'

type Props = {
   onBack: () => void
}

export const PublicationModal = ({ onBack }: Props) => {
   const [uploadFile, { isLoading: isUploadingFile }] = useUploadFileMutation()
   const [uploadPostData, { error, isLoading: isUploadingPost }] = useUploadPostDataMutation()

   const isLoading = isUploadingFile || isUploadingPost

   const images = ['./public/404.jpg', './public/logo-light.png', './public/logo-dark.png']

   //вынести в отдельный хук?
   const handlePublish = (dataPostData: PublicationFormData) => {
      uploadFile({ files: images }).unwrap()
      uploadPostData(dataPostData).unwrap()
   }

   return (
      <PostModal
         size="post-management"
         headerText="Publication"
         headerVariant="with-navigation"
         contentColumns="two"
         rightContentClassName="p-5"
      >
         <PublicationForm
            onSubmit={handlePublish}
            onBack={onBack}
            errorsFromApi={isErrorInDataResponse(error) ? error?.data.errorsMessages : undefined}
            isLoading={isLoading}
            images={images}
         />
      </PostModal>
   )
}
