import { useState, forwardRef, useImperativeHandle, useEffect, useCallback } from 'react'
import Cropper, { Area } from 'react-easy-crop'

/* 
The AvatarCropper component displays an image that can be cropped into a 
circular area and scaled using a slider. The user changes the position and zoom, 
and the crop coordinates are stored in the croppedAreaPixels state. When the save method 
is called via ref, a canvas with the cropped image is created and returned as a PNG via onFinish.
*/

type AvatarCropperProps = {
   image: string
   onFinish: (img: string) => void
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

      // Function for loading an image into HTMLImageElement
      const loadImage = useCallback((url: string) => {
         return new Promise<HTMLImageElement>((resolve, reject) => {
            const img = new Image()
            img.crossOrigin = 'anonymous'
            img.onload = () => resolve(img)
            img.onerror = reject
            img.src = url
         })
      }, [])

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

         const img = await loadImage(image)
         const canvas = document.createElement('canvas')
         canvas.width = size
         canvas.height = size
         const ctx = canvas.getContext('2d')!

         // Круглая маска
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

         onFinish(canvas.toDataURL('image/png'))
      }, [croppedAreaPixels, image, onFinish, loadImage, size])

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
