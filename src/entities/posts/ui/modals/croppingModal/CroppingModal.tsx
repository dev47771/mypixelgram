import { PostModal } from '@/shared/components/PostModal'
import { StaticImageData } from 'next/image'
import { ChangeEvent, ReactNode, useCallback, useEffect, useRef, useState } from 'react'
import {
   CrossIcon,
   ExpandOutline,
   ImageOutline,
   MaximizeOutline,
   PlusCircleOutline,
} from '@/shared/icons'
import { cn } from '@/shared/lib'
import { RangeControl } from '@/shared/components/RangeControl'
import Cropper from 'react-easy-crop'
import type { Area } from 'react-easy-crop'

type Props = {
   isOpen: boolean
   onOpenChange: (value: boolean) => void
   images: StaticImageData[]
   onNext: () => void
   currentIndex: number
   setCurrentIndex: (n: number) => void
   setImages: (images: StaticImageData[]) => void
}

export const CroppingModal = ({
   currentIndex,
   setCurrentIndex,
   isOpen,
   onNext,
   images,
   onOpenChange,
   setImages
}: Props) => {
   const [crop, setCrop] = useState({ x: 0, y: 0 })
   const [aspect, setAspect] = useState<number | undefined>(undefined)
   const [showZoomScale, setShowZoomScale] = useState(false)
   const [zoomScale, setZoomScale] = useState([20])
   const [showAspectRatio, setShowAspectRatio] = useState(false)
   const [showImageGallery, setShowImageGallery] = useState(false)

   const naturalAspectRef = useRef<undefined | number>(undefined)

   const fileInputRef = useRef<HTMLInputElement | null>(null)

   const handleAddImageClick = () => {
      fileInputRef.current?.click()
   }

   const loadImageMeta = (src: string): Promise<{width: number; height: number}> => {
      return new Promise(resolve => {
         const img = new Image()
         img.onload = () => resolve({ width: img.width, height: img.height })
         img.src = src
      })
   }


   const handleFilesSelected = async (e: ChangeEvent<HTMLInputElement>) => {
      if (!e.target.files?.length) return

      const file = e.target.files[0]
      const src = URL.createObjectURL(file)

      const { width, height } = await loadImageMeta(src)

      setImages([...images, { src, width, height }])
   }

   const deleteImage = (idxToDelete: number) => {
      const newImages = images.filter((_, idx) => idx !== idxToDelete)

      setImages(newImages)

      // если текущий индекс удалили — корректируем
      if (currentIndex >= newImages.length) {
         setCurrentIndex(Math.max(newImages.length - 1, 0))
      }
   }


   const image = images[currentIndex]

   // Конвертируем zoomScale в значение для react-easy-crop (1-3)
   const zoom = 1 + (zoomScale[0] / 100) * 2

   const resetCropState = () => {
      setCrop({ x: 0, y: 0 })
      setZoomScale([20])
      setAspect(naturalAspectRef.current)
   }

   useEffect(() => {
      if (!image) return

      const naturalAspect = image.width / image.height

      naturalAspectRef.current = naturalAspect
      setAspect(naturalAspect)
      resetCropState()
   }, [image])

   const onCropComplete = useCallback((croppedArea: Area, croppedAreaPixels: Area) => {
      // Сохраняем данные о кропе если нужно
   }, [])

   const handleChangeRange = (newZoomScale: number[]) => {
      setZoomScale(newZoomScale)
   }

   const handleZoomChange = (newZoom: number) => {
      const newZoomScaleValue = [((newZoom - 1) / 2) * 100] //приобразовываем в массив для интерфейса rangeControl
      setZoomScale(newZoomScaleValue)
   }

   const toggleAspectRatio = () => {
      setShowAspectRatio(prev => !prev)
   }

   const toggleZoomScale = () => setShowZoomScale(prev => !prev)

   const toggleGallery = () => setShowImageGallery(prev => !prev)

   const nextImage = () => {
      if (currentIndex < images.length - 1) {
         setCurrentIndex(currentIndex + 1)
         resetCropState()
      }
   }

   const prevImage = () => {
      if (currentIndex > 0) {
         setCurrentIndex(currentIndex - 1)
         resetCropState()
      }
   }

   const baseInteractiveButtonStyle =
      'cursor-pointer w-9 h-9 rounded-xs bg-dark-500 absolute bottom-[11px] flex items-center justify-center opacity-80'

   return (
      <PostModal
         open={isOpen}
         onOpenChange={onOpenChange}
         size={'image-upload'}
         headerText={'Cropping'}
         headerVariant={'with-navigation'}
         contentColumns={'one'}
         onNext={onNext}
         className={'relative'}
      >
         <div className="bg-dark-700 relative h-[400px] w-full">
            <Cropper
               image={image.src}
               crop={crop}
               zoom={zoom}
               aspect={aspect}
               onCropChange={setCrop}
               onZoomChange={handleZoomChange}
               onCropComplete={onCropComplete}
               style={{
                  containerStyle: {
                     backgroundColor: '#374151',
                  },
               }}
            />
         </div>
         <button
            className={cn(
               baseInteractiveButtonStyle,
               'left-[11px]',
               showAspectRatio && 'text-accent-500'
            )}
            onClick={toggleAspectRatio}
         >
            <ExpandOutline />
         </button>
         <button
            className={cn(
               baseInteractiveButtonStyle,
               'left-[71px]',
               showZoomScale && 'text-accent-500'
            )}
            onClick={toggleZoomScale}
         >
            <MaximizeOutline />
         </button>
         {showAspectRatio && (
            <div
               className={
                  'bg-dark-500 absolute bottom-[49px] left-[11px] flex h-[152px] w-[156px] flex-col rounded-xs opacity-80'
               }
            >
               <AspectOption
                  label="Original"
                  value={naturalAspectRef.current}
                  aspect={aspect}
                  onClick={() => setAspect(naturalAspectRef.current)}
                  Icon={<ImageOutline />}
               />

               <AspectOption
                  label="1:1"
                  value={1}
                  aspect={aspect}
                  onClick={() => setAspect(1)}
                  boxClass="h-[18px] w-[18px]"
               />

               <AspectOption
                  label="4:5"
                  value={4 / 5}
                  aspect={aspect}
                  onClick={() => setAspect(4 / 5)}
                  boxClass="h-[26px] w-[18px]"
               />

               <AspectOption
                  label="16:9"
                  value={16 / 9}
                  aspect={aspect}
                  onClick={() => setAspect(16 / 9)}
                  boxClass="h-[20px] w-[26px]"
               />
            </div>
         )}
         {showZoomScale && (
            <div
               className={
                  'bg-dark-500 absolute bottom-[50px] left-[71px] flex h-[36px] w-[124px] items-center justify-center rounded-xs opacity-80'
               }
            >
               <RangeControl
                  max={100}
                  min={0}
                  step={1}
                  value={zoomScale}
                  onValueChange={handleChangeRange}
                  className={'w-25 cursor-pointer'}
               />
            </div>
         )}
         <button onClick={toggleGallery} className={cn(baseInteractiveButtonStyle, 'right-[11px]')}>
            <ImageOutline />
         </button>
         {showImageGallery && (
            <div
               className={
                  'bg-dark-500 absolute right-[11px] bottom-[49px] flex gap-3 rounded-xs p-3 opacity-80'
               }
            >
               {images.map((i, idx) => (
                  <div    key={i.src} className={'relative'}>
                     <img
                        className={'h-[82px] w-20 object-contain'}

                        src={i.src}
                        alt={`Cropped image ${idx + 1}`}
                     />
                     <button onClick={() => deleteImage(idx)} className={'cursor-pointer absolute top-[2px] right-[2px] w-3 h-3 bg-dark-500 rounded-xs flex items-center justify-center'}>
                        <CrossIcon />
                     </button>
                  </div>
               ))}
               <button onClick={handleAddImageClick} className={'flex h-9 w-9 cursor-pointer align-top'}>
                  <PlusCircleOutline />
               </button>
               <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFilesSelected}
               />
            </div>
         )}
      </PostModal>
   )
}

function AspectOption({
   label,
   value,
   aspect,
   Icon,
   boxClass,
   onClick,
}: {
   label: string
   value: number | undefined
   aspect: number | undefined
   Icon?: ReactNode
   boxClass?: string
   onClick: () => void
}) {
   const isActive = value === aspect

   return (
      <button
         onClick={onClick}
         className={cn(
            'flex h-[38px] w-full cursor-pointer items-center justify-between px-3 py-2.5',
            isActive ? 'text-light-100' : 'text-light-900'
         )}
      >
         {label}

         {Icon ? (
            Icon
         ) : (
            <div
               className={cn(
                  'relative right-[3px] inline-block rounded-xs border-2',
                  boxClass,
                  isActive ? 'border-light-100' : 'border-light-900'
               )}
            />
         )}
      </button>
   )
}
