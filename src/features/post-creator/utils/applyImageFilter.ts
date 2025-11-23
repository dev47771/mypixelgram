import { IMAGE_FILTERS } from '../constants/imageFilters'
import { PhotoState } from '../PostCreator'

export const applyFilterToImage = async (photo: PhotoState): Promise<File> => {
   const canvas = document.createElement('canvas') //создаем типа холст
   const ctx = canvas.getContext('2d')! //инструменты для 2d рисования

   const imageUrl =
      photo.modifiedPreviewUrl && photo.modifiedPreviewUrl !== ''
         ? photo.modifiedPreviewUrl
         : photo.previewUrl

   const img = new Image() //создаем img
   img.src = imageUrl //берем ссылку на фото

   await new Promise(resolve => (img.onload = resolve)) //ждем, когда загрузка фото закончится

   //размер холста будет такой же как и у фото исходного
   canvas.width = img.width
   canvas.height = img.height

   ctx.filter = IMAGE_FILTERS[photo.currentFilter as keyof typeof IMAGE_FILTERS] || 'none' //устанавливаем фильтры для фото
   ctx.drawImage(img, 0, 0) //заполняет наш img фото с фильтром начиная с координат 0,0

   const blob = await new Promise<Blob>((resolve, reject) => {
      canvas.toBlob(
         blob => {
            if (blob) {
               resolve(blob)
            } else {
               reject(new Error('Canvas is empty - cannot create blob'))
            }
         },
         'image/jpeg',
         0.9
      )
   })
   return new File([blob], photo.originalFile.name, { type: 'image/jpeg' }) //создается новый объект File
}
