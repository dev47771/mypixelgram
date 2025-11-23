import { isErrorInDataResponse } from '@/shared/utils/typeguards/isErrorInDataResponse'
import { PublicationFormData } from '../forms/PublicationForm'
import { useUploadFileMutation, useUploadPostDataMutation } from '../api'

export const usePublishPost = () => {
   const [uploadFile, { isLoading: isUploadingFile }] = useUploadFileMutation()
   const [uploadPostData, { isLoading: isUploadingPost, error }] = useUploadPostDataMutation()

   const isLoading = isUploadingFile || isUploadingPost

   const publishPost = async (data: PublicationFormData, files: File[]) => {
      // 1. Загружаем файлы
      const uploadedFiles = await uploadFile(files).unwrap()

      // 2. Берём ID файлов
      const filesId = uploadedFiles.data.map(file => file.fileId)

      // 3. Создаём пост
      return uploadPostData({
         description: data.description,
         location: data.location,
         filesId, // <-- здесь именно filesId
      }).unwrap()
   }

   return {
      publishPost,
      isLoading,
      error: isErrorInDataResponse(error) ? error.data.errorsMessages : undefined,
   }
}
