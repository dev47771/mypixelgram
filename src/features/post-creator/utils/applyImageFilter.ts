import { IMAGE_FILTERS } from "../constants/imageFilters"
import { PhotoState } from "../PostCreator"

//функция applyFilterToImage меняет файлы фото применяя фильтры к ним (применяется к каждому фото в массиве)
//нужно запускать в момент нажатия кнопки Publish, упаковывая в массив получающиеся объекты типа File:

// пример от чата

// const handlePublish = async () => {
//   try { 

//ждем окончательной обработки всех фото и загрузку их в массив

//     const processedPhotos = await Promise.all(
//       photos.map(photo => applyFilterToImage(photo))
//     )

//     await api.createPost(processedPhotos) //отправка на сервер, у нас по-другому

//   } catch (error) {
//     console.error('Ошибка обработки фото:', error) ???нужна нам проверка???
//   }
// }

export const applyFilterToImage = async (photo: PhotoState): Promise<File> => {

    const canvas = document.createElement('canvas') //создаем типа холст
    const ctx = canvas.getContext('2d')! //инструменты для 2d рисования 

    const img = new Image() //создаем img
    img.src = photo.previewUrl //берем ссылку на фото

    await new Promise(resolve => img.onload = resolve) //ждем, когда загрузка фото закончится

    //размер холста будет такой же как и у фото исходного
    canvas.width = img.width
    canvas.height = img.height

    ctx.filter = IMAGE_FILTERS[photo.currentFilter as keyof typeof IMAGE_FILTERS] || 'none' //устанавливаем фильтры для фото
    ctx.drawImage(img, 0, 0) //заполняет наш img фото с фильтром начиная с координат 0,0

    const blob = await new Promise<Blob>(resolve =>
        canvas.toBlob(resolve as any, 'image/jpeg', 0.9)
    ) //конвертируем в бинарные данные формата 'image/jpeg' и сжатием 90% (рекомендуют именно 90% мол качество не сильно страдает, но вес значительно уменьшится)

    return new File([blob], photo.originalFile.name, { type: 'image/jpeg' })//создается новый объект File
}