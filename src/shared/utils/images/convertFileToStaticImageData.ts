import { StaticImageData } from 'next/image'

export const convertFileToStaticImageData = (file: File): Promise<StaticImageData> => {
   return new Promise((resolve, reject) => {
      const img = new Image()
      const objectUrl = URL.createObjectURL(file)

      img.onload = () => {
         const staticImageData: StaticImageData = {
            src: objectUrl,
            width: img.width,
            height: img.height,
         }
         resolve(staticImageData)
      }

      img.onerror = () => {
         URL.revokeObjectURL(objectUrl)
         reject(new Error('Failed to load image'))
      }

      img.src = objectUrl
   })
}
