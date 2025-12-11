'use client'

import { useState, forwardRef, useImperativeHandle, useEffect } from 'react'
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
      const [minZoom, setMinZoom] = useState(1)
      //eslint-disable-next-line
      const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null)
      //eslint-disable-next-line
      const onCropComplete = (_: any, pixels: any) => {
         setCroppedAreaPixels(pixels)
      }

      // ---- LOAD IMAGE & AUTO-SET ZOOM TO COVER CIRCLE ----
      useEffect(() => {
         const img = new Image()
         img.crossOrigin = 'anonymous'
         img.src = image

         img.onload = () => {
            const w = img.width
            const h = img.height

            // размеры вписанной картинки (fit = "contain") при zoom=1
            const ratio = w / h
            const box = CIRCLE

            let normW, normH

            if (ratio > 1) {
               // горизонтальное
               normW = box
               normH = box / ratio
            } else {
               // вертикальное
               normH = box
               normW = box * ratio
            }

            const neededZoom = box / Math.min(normW, normH)

            setMinZoom(neededZoom)
            setZoom(neededZoom)

            // центр по X/Y
            setCrop({ x: 0, y: 0 })
         }
      }, [image])

      // -------- Сохранение canvas --------
      const loadImage = (url: string) =>
         new Promise<HTMLImageElement>((resolve, reject) => {
            const img = new Image()
            img.crossOrigin = 'anonymous'
            img.onload = () => resolve(img)
            img.onerror = reject
            img.src = url
         })

      const save = async () => {
         if (!croppedAreaPixels) return

         const img = await loadImage(image)

         const canvas = document.createElement('canvas')
         canvas.width = CIRCLE
         canvas.height = CIRCLE
         const ctx = canvas.getContext('2d')!

         // круглая маска
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

      useImperativeHandle(ref, () => ({ save }))

      return (
         <div className="flex flex-col items-center">
            <div
               style={{
                  width: CIRCLE,
                  height: CIRCLE,
                  position: 'relative',
               }}
            >
               <Cropper
                  image={image}
                  crop={crop}
                  zoom={zoom}
                  minZoom={minZoom}
                  aspect={1}
                  cropSize={{ width: CIRCLE, height: CIRCLE }}
                  cropShape="round"
                  restrictPosition={true}
                  showGrid={false}
                  onCropChange={setCrop}
                  onZoomChange={setZoom}
                  onCropComplete={onCropComplete}
               />
            </div>

            {/* Зум-ползунок */}
            <input
               type="range"
               min={minZoom}
               max={minZoom + 3}
               step={0.01}
               value={zoom}
               onChange={e => setZoom(Number(e.target.value))}
               className="mt-4 w-64"
            />
         </div>
      )
   }
)
