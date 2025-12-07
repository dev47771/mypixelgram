'use client'

import { useState, forwardRef, useImperativeHandle, useCallback } from 'react'
import Cropper from 'react-easy-crop'

type AvatarCropperProps = {
   image: string
   onFinish: (img: string) => void
}

export type AvatarCropperRef = {
   save: () => void
}

export const AvatarCropper = forwardRef<AvatarCropperRef, AvatarCropperProps>(
   function AvatarCropper({ image, onFinish }, ref) {
      const CIRCLE = 316

      const [crop, setCrop] = useState({ x: 0, y: 0 })
      const [zoom, setZoom] = useState(1)
      //eslint-disable-next-line
      const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null)
      //eslint-disable-next-line
      const onCropComplete = useCallback((_: any, croppedPixels: any) => {
         setCroppedAreaPixels(croppedPixels)
      }, [])

      const createImage = (url: string) =>
         new Promise<HTMLImageElement>((resolve, reject) => {
            const img = new Image()
            img.crossOrigin = 'anonymous'
            img.onload = () => resolve(img)
            img.onerror = reject
            img.src = url
         })

      const saveCroppedImage = async () => {
         if (!croppedAreaPixels) return

         const img = await createImage(image)
         const canvas = document.createElement('canvas')
         canvas.width = CIRCLE
         canvas.height = CIRCLE
         const ctx = canvas.getContext('2d')!

         // круглый вырез
         ctx.beginPath()
         ctx.arc(CIRCLE / 2, CIRCLE / 2, CIRCLE / 2, 0, Math.PI * 2)
         ctx.closePath()
         ctx.clip()

         ctx.drawImage(
            img,
            croppedAreaPixels.x,
            croppedAreaPixels.y,
            croppedAreaPixels.width,
            croppedAreaPixels.height,
            0,
            0,
            CIRCLE,
            CIRCLE
         )

         onFinish(canvas.toDataURL('image/png'))
      }

      useImperativeHandle(ref, () => ({
         save: saveCroppedImage,
      }))

      return (
         <div className="flex flex-col items-center">
            {/* Контейнер круга с flex-центрированием */}
            <div
               style={{
                  width: CIRCLE,
                  height: CIRCLE,
                  borderRadius: '50%',
                  overflow: 'hidden',
                  position: 'relative',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
               }}
            >
               <Cropper
                  image={image}
                  crop={crop}
                  zoom={zoom}
                  aspect={1}
                  cropSize={{ width: CIRCLE, height: CIRCLE }}
                  cropShape="round"
                  showGrid={false}
                  onCropChange={setCrop}
                  onZoomChange={setZoom}
                  onCropComplete={onCropComplete}
                  restrictPosition={false} // zoom от центра
               />
            </div>

            {/* Зум */}
            <input
               type="range"
               min={1}
               max={3}
               step={0.01}
               value={zoom}
               onChange={e => setZoom(Number(e.target.value))}
               className="mt-4 w-64"
            />
         </div>
      )
   }
)

// //раб вариант 2
// 'use client'

// import { useState, forwardRef, useImperativeHandle, useCallback } from 'react'
// import Cropper from 'react-easy-crop'

// type AvatarCropperProps = {
//    image: string
//    onFinish: (img: string) => void
// }

// export type AvatarCropperRef = {
//    save: () => void
// }

// export const AvatarCropper = forwardRef<AvatarCropperRef, AvatarCropperProps>(
//    function AvatarCropper({ image, onFinish }, ref) {
//       const CIRCLE = 316

//       const [crop, setCrop] = useState({ x: 0, y: 0 })
//       const [zoom, setZoom] = useState(1)
//       const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null)

//       const onCropComplete = useCallback((_: any, croppedPixels: any) => {
//          setCroppedAreaPixels(croppedPixels)
//       }, [])

//       const createImage = (url: string) =>
//          new Promise<HTMLImageElement>((resolve, reject) => {
//             const img = new Image()
//             img.crossOrigin = 'anonymous'
//             img.onload = () => resolve(img)
//             img.onerror = reject
//             img.src = url
//          })

//       const saveCroppedImage = async () => {
//          if (!croppedAreaPixels) return

//          const img = await createImage(image)
//          const canvas = document.createElement('canvas')
//          canvas.width = CIRCLE
//          canvas.height = CIRCLE
//          const ctx = canvas.getContext('2d')!

//          // круглый вырез
//          ctx.beginPath()
//          ctx.arc(CIRCLE / 2, CIRCLE / 2, CIRCLE / 2, 0, Math.PI * 2)
//          ctx.closePath()
//          ctx.clip()

//          ctx.drawImage(
//             img,
//             croppedAreaPixels.x,
//             croppedAreaPixels.y,
//             croppedAreaPixels.width,
//             croppedAreaPixels.height,
//             0,
//             0,
//             CIRCLE,
//             CIRCLE
//          )

//          onFinish(canvas.toDataURL('image/png'))
//       }

//       useImperativeHandle(ref, () => ({
//          save: saveCroppedImage,
//       }))

//       return (
//          <div className="flex flex-col items-center">
//             {/* Контейнер круга с flex-центрированием */}
//             <div
//                style={{
//                   width: CIRCLE,
//                   height: CIRCLE,
//                   borderRadius: '50%',
//                   overflow: 'hidden',
//                   position: 'relative',
//                   display: 'flex',
//                   justifyContent: 'center',
//                   alignItems: 'center',
//                }}
//             >
//                <Cropper
//                   image={image}
//                   crop={crop}
//                   zoom={zoom}
//                   aspect={1}
//                   cropSize={{ width: CIRCLE, height: CIRCLE }}
//                   cropShape="round"
//                   showGrid={false}
//                   onCropChange={setCrop}
//                   onZoomChange={setZoom}
//                   onCropComplete={onCropComplete}
//                   restrictPosition={false} // zoom от центра
//                />
//             </div>

//             {/* Зум */}
//             <input
//                type="range"
//                min={1}
//                max={3}
//                step={0.01}
//                value={zoom}
//                onChange={e => setZoom(Number(e.target.value))}
//                className="mt-4 w-64"
//             />
//          </div>
//       )
//    }
// )

// //раб верчия 1
// 'use client'

// import { useState, forwardRef, useImperativeHandle, useCallback } from 'react'
// import Cropper from 'react-easy-crop'

// type AvatarCropperProps = {
//    image: string
//    onFinish: (img: string) => void
// }

// export type AvatarCropperRef = {
//    save: () => void
// }

// export const AvatarCropper = forwardRef<AvatarCropperRef, AvatarCropperProps>(
//    function AvatarCropper({ image, onFinish }, ref) {
//       const [crop, setCrop] = useState({ x: 0, y: 0 })
//       const [zoom, setZoom] = useState(1)
//       const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null)

//       const onCropComplete = useCallback((_: any, croppedPixels: any) => {
//          setCroppedAreaPixels(croppedPixels)
//       }, [])

//       const createImage = (url: string) =>
//          new Promise<HTMLImageElement>((resolve, reject) => {
//             const img = new Image()
//             img.crossOrigin = 'anonymous'
//             img.onload = () => resolve(img)
//             img.onerror = reject
//             img.src = url
//          })

//       const saveCroppedImage = async () => {
//          if (!croppedAreaPixels) return

//          const img = await createImage(image)
//          const CIRCLE = 316

//          const canvas = document.createElement('canvas')
//          canvas.width = CIRCLE
//          canvas.height = CIRCLE
//          const ctx = canvas.getContext('2d')!

//          // круглый вырез
//          ctx.beginPath()
//          ctx.arc(CIRCLE / 2, CIRCLE / 2, CIRCLE / 2, 0, Math.PI * 2)
//          ctx.closePath()
//          ctx.clip()

//          // переносим выбранный фрагмент изображения
//          ctx.drawImage(
//             img,
//             croppedAreaPixels.x,
//             croppedAreaPixels.y,
//             croppedAreaPixels.width,
//             croppedAreaPixels.height,
//             0,
//             0,
//             CIRCLE,
//             CIRCLE
//          )

//          onFinish(canvas.toDataURL('image/png'))
//       }

//       useImperativeHandle(ref, () => ({
//          save: saveCroppedImage,
//       }))

//       return (
//          <div className="flex flex-col items-center">
//             {/* ПОСТОЯННАЯ КРУГЛАЯ ОБЛАСТЬ 316×316 */}
//             <div
//                style={{
//                   width: 316,
//                   height: 316,
//                   borderRadius: '50%',
//                   overflow: 'hidden',
//                   position: 'relative',
//                }}
//             >
//                <Cropper
//                   image={image}
//                   crop={crop}
//                   zoom={zoom}
//                   aspect={1}
//                   cropSize={{ width: 316, height: 316 }}
//                   cropShape="rect"
//                   showGrid={false}
//                   onCropChange={setCrop}
//                   onZoomChange={setZoom}
//                   onCropComplete={onCropComplete}
//                />
//             </div>

//             {/* Зум */}
//             <input
//                type="range"
//                min={1}
//                max={3}
//                step={0.01}
//                value={zoom}
//                onChange={e => setZoom(Number(e.target.value))}
//                className="mt-4 w-64"
//             />
//          </div>
//       )
//    }
// )

// 'use client'

// import { useState, useCallback, forwardRef, useImperativeHandle } from 'react'
// import Cropper from 'react-easy-crop'

// type AvatarCropperProps = {
//    image: string
//    onFinish: (img: string) => void
// }

// export type AvatarCropperRef = {
//    save: () => void
// }

// export const AvatarCropper = forwardRef<AvatarCropperRef, AvatarCropperProps>(
//    function AvatarCropper({ image, onFinish }, ref) {
//       const [crop, setCrop] = useState({ x: 0, y: 0 })
//       const [zoom, setZoom] = useState(1)
//       const [croppedPixels, setCroppedPixels] = useState<any>(null)

//       const onCropComplete = useCallback((_, croppedAreaPixels) => {
//          setCroppedPixels(croppedAreaPixels)
//       }, [])

//       const createImage = (url: string) =>
//          new Promise<HTMLImageElement>((resolve, reject) => {
//             const img = new Image()
//             img.crossOrigin = 'anonymous'
//             img.onload = () => resolve(img)
//             img.onerror = reject
//             img.src = url
//          })

//       const getCroppedCircleImage = async () => {
//          if (!croppedPixels) return

//          const img = await createImage(image)
//          const { x, y, width, height } = croppedPixels
//          const size = 316 // Фиксированный размер 316px

//          const canvas = document.createElement('canvas')
//          const ctx = canvas.getContext('2d')!

//          canvas.width = size
//          canvas.height = size

//          // Создаем круглую маску
//          ctx.beginPath()
//          ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2)
//          ctx.closePath()
//          ctx.clip()

//          // Рисуем обрезанное изображение
//          // Масштабируем выбранную область до размера 316px
//          const scale = size / Math.min(width, height)
//          const drawWidth = width * scale
//          const drawHeight = height * scale
//          const drawX = (size - drawWidth) / 2
//          const drawY = (size - drawHeight) / 2

//          ctx.drawImage(
//             img,
//             x, y,           // Начало области обрезки на исходном изображении
//             width, height,  // Размеры области обрезки
//             drawX, drawY,   // Позиция на canvas
//             drawWidth, drawHeight // Размеры на canvas
//          )

//          const dataURL = canvas.toDataURL('image/png')
//          onFinish(dataURL)
//       }

//       useImperativeHandle(ref, () => ({
//          save: getCroppedCircleImage,
//       }))

//       return (
//          <div className="flex flex-col items-center gap-4">
//             {/* Контейнер с overlay */}
//             <div
//                className="relative"
//                style={{ width: 332, height: 340, borderRadius: '50%', overflow: 'hidden' }}
//             >
//                <Cropper
//                   image={image}
//                   crop={crop}
//                   zoom={zoom}
//                   aspect={1}
//                   cropShape="round" // Меняем на круглую форму
//                   cropSize={{ width: 316, height: 316 }} // Добавляем фиксированный размер
//                   showGrid={false}
//                   onCropChange={setCrop}
//                   onZoomChange={setZoom}
//                   onCropComplete={onCropComplete}
//                />

//                {/* затемнение вокруг круга */}
//                {/* <div
//                   style={{
//                      position: 'absolute',
//                      top: 0,
//                      left: 0,
//                      width: '100%',
//                      height: '100%',
//                      pointerEvents: 'none',
//                      borderRadius: '50%',
//                      boxShadow: '0 0 0 9999px rgba(29, 12, 12, 0.5)',
//                   }}
//                /> */}
//             </div>

//             <input
//                type="range"
//                min={1}
//                max={3}
//                step={0.1}
//                value={zoom}
//                onChange={e => setZoom(Number(e.target.value))}
//                className="w-64"
//             />

//             <button
//                onClick={getCroppedCircleImage}
//                className="rounded-lg bg-blue-600 px-4 py-2 text-white"
//             >
//                Save
//             </button>
//          </div>
//       )
//    }
// )
