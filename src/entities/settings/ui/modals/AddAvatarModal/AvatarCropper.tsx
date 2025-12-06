'use client'

import { useState, useCallback, forwardRef, useImperativeHandle } from 'react'
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
      const [crop, setCrop] = useState({ x: 0, y: 0 })
      const [zoom, setZoom] = useState(1)

      // eslint-disable-next-line
      const [croppedPixels, setCroppedPixels] = useState<any>(null)
      // eslint-disable-next-line
      // @ts-ignore
      const onCropComplete = useCallback((_, croppedAreaPixels) => {
         setCroppedPixels(croppedAreaPixels)
      }, [])

      const createImage = (url: string) =>
         new Promise<HTMLImageElement>((resolve, reject) => {
            const img = new Image()
            img.crossOrigin = 'anonymous'
            img.onload = () => resolve(img)
            img.onerror = reject
            img.src = url
         })

      const getCroppedCircleImage = async () => {
         if (!croppedPixels) return

         const img = await createImage(image)
         const { x, y, width, height } = croppedPixels
         const size = Math.min(width, height)

         const canvas = document.createElement('canvas')
         const ctx = canvas.getContext('2d')!

         canvas.width = size
         canvas.height = size

         ctx.beginPath()
         ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2)
         ctx.closePath()
         ctx.clip()

         ctx.drawImage(img, x, y, size, size, 0, 0, size, size)

         const dataURL = canvas.toDataURL('image/png')
         onFinish(dataURL)
      }

      useImperativeHandle(ref, () => ({
         save: getCroppedCircleImage,
      }))

      return (
         <div className="flex flex-col items-center gap-4">
            {/* Контейнер с overlay */}
            <div
               className="relative"
               style={{ width: 332, height: 340, borderRadius: '50%', overflow: 'hidden' }}
            >
               <Cropper
                  image={image}
                  crop={crop}
                  zoom={zoom}
                  aspect={1}
                  cropShape="rect" // используем rect, круг делаем overlay
                  showGrid={false}
                  onCropChange={setCrop}
                  onZoomChange={setZoom}
                  onCropComplete={onCropComplete}
               />

               {/* затемнение вокруг круга */}
               <div
                  style={{
                     position: 'absolute',
                     top: 0,
                     left: 0,
                     width: '100%',
                     height: '100%',
                     pointerEvents: 'none',
                     borderRadius: '50%',
                     boxShadow: '0 0 0 9999px rgba(0,0,0,0.5)',
                  }}
               />
            </div>

            <input
               type="range"
               min={1}
               max={3}
               step={0.1}
               value={zoom}
               onChange={e => setZoom(Number(e.target.value))}
               className="w-64"
            />

            <button
               onClick={getCroppedCircleImage}
               className="rounded-lg bg-blue-600 px-4 py-2 text-white"
            >
               Save
            </button>
         </div>
      )
   }
)
