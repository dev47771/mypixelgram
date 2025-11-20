import { isErrorInDataResponse } from '@/shared/utils/typeguards/isErrorInDataResponse'
import { useUploadFileMutation, useUploadPostDataMutation } from '../api'
import { PublicationFormData } from '../forms/PublicationForm'

export const usePublishPost = () => {
   const [uploadFile, { isLoading: isUploadingFile }] = useUploadFileMutation()
   const [uploadPostData, { isLoading: isUploadingPost, error }] = useUploadPostDataMutation()

   const isLoading = isUploadingFile || isUploadingPost

   const publishPost = async (data: PublicationFormData, files: File[]) => {
      const uploadedFiles = await uploadFile(files).unwrap()
      return uploadPostData({
         description: data.description,
         location: data.location,
         fields: uploadedFiles.fields,
      }).unwrap()
   }

   return {
      publishPost,
      isLoading,
      error: isErrorInDataResponse(error) ? error.data.errorsMessages : undefined,
   }
}
