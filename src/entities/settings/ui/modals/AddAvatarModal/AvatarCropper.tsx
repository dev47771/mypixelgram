import { createImage } from '@/shared/utils'
import { useState, forwardRef, useImperativeHandle, useEffect, useCallback } from 'react'
import Cropper, { Area } from 'react-easy-crop'

type AvatarCropperProps = {
   image: string
   onFinish: (img: File) => void
   size?: number
}

export type AvatarCropperRef = {
   save: () => void
}

export const AvatarCropper = forwardRef<AvatarCropperRef, AvatarCropperProps>(
   function AvatarCropper({ image, onFinish, size = 316 }, ref) {
      const [crop, setCrop] = useState<{ x: number; y: number }>({ x: 0, y: 0 })
      const [zoom, setZoom] = useState(1)
      const [minZoom, setMinZoom] = useState(1)
      const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null)

      const onCropComplete = useCallback((_croppedArea: Area, pixels: Area) => {
         setCroppedAreaPixels(pixels)
      }, [])

      // Auto-zoom to cover the circle
      useEffect(() => {
         const img = new Image()
         img.crossOrigin = 'anonymous'
         img.src = image

         img.onload = () => {
            const w = img.width
            const h = img.height
            const ratio = w / h

            let normW: number, normH: number
            if (ratio > 1) {
               normW = size
               normH = size / ratio
            } else {
               normH = size
               normW = size * ratio
            }

            const neededZoom = size / Math.min(normW, normH)

            setMinZoom(neededZoom)
            setZoom(neededZoom)
            setCrop({ x: 0, y: 0 })
         }
      }, [image, size])

      // Saving a crop to PNG
      const save = useCallback(async () => {
         if (!croppedAreaPixels) return

         //createImage export in cropImage
         //createImage - image URL into an HTMLImageElement object using a Promise
         const img = await createImage(image)
         const canvas = document.createElement('canvas')
         canvas.width = size
         canvas.height = size
         const ctx = canvas.getContext('2d')!

         // Round mask
         ctx.beginPath()
         ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2)
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
            size,
            size
         )

         canvas.toBlob(blob => {
            if (!blob) return
            const file = new File([blob], 'avatar.png', { type: 'image/png' })
            onFinish(file)
         }, 'image/png')
      }, [croppedAreaPixels, image, onFinish, size])

      // Exporting func save through ref
      useImperativeHandle(ref, () => ({ save }), [save])

      return (
         <div className="flex flex-col items-center">
            <div
               style={{
                  width: size,
                  height: size,
                  position: 'relative',
               }}
            >
               <Cropper
                  image={image}
                  crop={crop}
                  zoom={zoom}
                  minZoom={minZoom}
                  aspect={1}
                  cropSize={{ width: size, height: size }}
                  cropShape="round"
                  restrictPosition={true}
                  showGrid={false}
                  onCropChange={setCrop}
                  onZoomChange={setZoom}
                  onCropComplete={onCropComplete}
               />
            </div>

            {/* Zoom slider */}
            <input
               type="range"
               min={minZoom}
               max={minZoom + 3}
               step={0.01}
               value={zoom}
               onChange={e => setZoom(Number(e.target.value))}
               className="mt-4 w-64"
               aria-label="Zoom"
            />
         </div>
      )
   }
)
