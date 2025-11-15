'use client'
import { PostModal } from '@/shared/components/PostModal'
import Image, { StaticImageData } from 'next/image'
import { ChangeEvent, ReactNode, useCallback, useEffect, useReducer, useRef, useState } from 'react'
import {
   CrossIcon,
   ExpandOutline,
   ImageOutline,
   MaximizeOutline,
   PlusCircleOutline,
} from '@/shared/icons'
import { cn } from '@/shared/lib'
import { RangeControl } from '@/shared/components/RangeControl'
import type { Area } from 'react-easy-crop'
import Cropper from 'react-easy-crop'
import { croppingReducer, initialState } from './croppingReducer'
import { loadImageMeta } from '@/shared/utils'
import { Slider } from '@/shared/components/Slider'
import { getCroppedImg } from '@/shared/utils/images/cropImage'
import { ACCEPTED_IMAGE_TYPES, MAX_FILE_SIZE } from '@/shared/schema'
import { alert } from '@/shared/components/Alert'

type Props = {
   isOpen: boolean
   onOpenChange: (value: boolean) => void
   images: StaticImageData[]
   onNext: () => void
   currentIndex: number
   setCurrentIndex: (idx: number) => void
   setImages: (images: StaticImageData[]) => void
}

export const CroppingModal = ({
   currentIndex,
   setCurrentIndex,
   isOpen,
   onNext,
   images,
   onOpenChange,
   setImages,
}: Props) => {
   const [state, dispatch] = useReducer(croppingReducer, initialState)
   const { showZoomScale, showAspectRatio, showImageGallery, imageStates } = state
   const [isProcessing, setIsProcessing] = useState(false)

   // Получаем состояние для текущего изображения
   const currentImageState = imageStates[currentIndex] || {
      crop: { x: 0, y: 0 },
      zoomScale: [20],
      aspect: undefined,
      naturalAspect: undefined,
      croppedAreaPixels: null,
   }

   const { crop, zoomScale, aspect, naturalAspect } = currentImageState

   const fileInputRef = useRef<HTMLInputElement | null>(null)

   const handleAddImageClick = () => {
      fileInputRef.current?.click()
   }

   const handleFilesSelected = async (e: ChangeEvent<HTMLInputElement>) => {
      if (!e.target.files?.length) return

      const file = e.target.files[0]

      if (file.size > MAX_FILE_SIZE) {
         alert.error('File size exceeds 5MB. Please choose a smaller file.')
         return
      }

      const src = URL.createObjectURL(file)

      const { width, height } = await loadImageMeta(src)

      setImages([...images, { src, width, height }])
   }

   const deleteImage = (idxToDelete: number) => {
      const newImages = images.filter((_, idx) => idx !== idxToDelete)
      setImages(newImages)

      if (currentIndex >= newImages.length) {
         setCurrentIndex(Math.max(newImages.length - 1, 0))
      }
   }

   const handleThumbnailClick = (idx: number) => {
      setCurrentIndex(idx)
   }

   const image = images[currentIndex]

   const zoom = 1 + (zoomScale[0] / 100) * 2

   // Инициализируем состояние для изображения
   useEffect(() => {
      if (!image) return

      const naturalAspectValue = image.width / image.height

      if (!imageStates[currentIndex]) {
         dispatch({
            type: 'INIT_IMAGE_STATE',
            payload: {
               index: currentIndex,
               naturalAspect: naturalAspectValue,
            },
         })
      }
   }, [image, currentIndex, imageStates])

   // Сохраняем финальные данные об обрезке
   const onCropComplete = useCallback(
      (_: Area, croppedAreaPixels: Area) => {
         dispatch({
            type: 'SET_CROPPED_AREA',
            payload: {
               index: currentIndex,
               croppedAreaPixels,
            },
         })
      },
      [currentIndex]
   )

   const handleCropChange = useCallback(
      (crop: { x: number; y: number }) => {
         dispatch({
            type: 'SET_CROP',
            payload: {
               index: currentIndex,
               crop,
            },
         })
      },
      [currentIndex]
   )

   const handleChangeRange = (newZoomScale: number[]) => {
      dispatch({
         type: 'SET_ZOOM_SCALE',
         payload: {
            index: currentIndex,
            zoomScale: newZoomScale,
         },
      })
   }

   const handleZoomChange = (newZoom: number) => {
      const newZoomScaleValue = [((newZoom - 1) / 2) * 100]
      dispatch({
         type: 'SET_ZOOM_SCALE',
         payload: {
            index: currentIndex,
            zoomScale: newZoomScaleValue,
         },
      })
   }

   const toggleAspectRatio = () => {
      dispatch({ type: 'TOGGLE_ASPECT_RATIO' })
   }

   const toggleZoomScale = () => dispatch({ type: 'TOGGLE_ZOOM_SCALE' })

   const toggleGallery = () => dispatch({ type: 'TOGGLE_IMAGE_GALLERY' })

   const handleSliderNavigation = (newIndex: number) => {
      setCurrentIndex(newIndex)
   }

   // Функция для обрезки всех изображений и сохранения их в состоянии
   const processAndSaveCroppedImages = async (): Promise<StaticImageData[]> => {
      return await Promise.all(
         images.map(async (image, index) => {
            const imageState = imageStates[index]

            // Если есть данные об обрезке - создаем обрезанное изображение
            if (imageState?.croppedAreaPixels) {
               try {
                  const croppedSrc = await getCroppedImg(image.src, imageState.croppedAreaPixels)
                  return {
                     src: croppedSrc,
                     width: imageState.croppedAreaPixels.width,
                     height: imageState.croppedAreaPixels.height,
                  }
               } catch (error) {
                  console.error('Error cropping image:', error)
                  // В случае ошибки возвращаем оригинальное изображение
                  return image
               }
            } else {
               // Если обрезки не было - возвращаем оригинал
               return image
            }
         })
      )
   }

   // Обработчик для кнопки Next - обрезаем изображения и сохраняем
   const handleNext = async () => {
      setIsProcessing(true)
      try {
         const croppedImages = await processAndSaveCroppedImages()
         // Сохраняем обрезанные изображения в состоянии
         setImages(croppedImages)
         // Вызываем оригинальный onNext
         onNext()
      } catch (error) {
         console.error('Error processing images:', error)
         // В случае ошибки просто переходим дальше с оригинальными изображениями
         onNext()
      } finally {
         setIsProcessing(false)
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
         onNext={isProcessing ? undefined : handleNext}
         className={'relative'}
      >
         {isProcessing && (
            <div className="bg-dark-700 bg-opacity-80 absolute inset-0 z-50 flex items-center justify-center">
               <div className="text-light-100">Processing images...</div>
            </div>
         )}

         {showImageGallery ? (
            <div className="bg-dark-700 relative h-full w-full">
               <Slider
                  images={images.map(img => img.src)}
                  currentIndex={currentIndex}
                  onIndexChangeAction={handleSliderNavigation}
                  className="h-full w-full"
               />
            </div>
         ) : (
            <div className="bg-dark-700 h-[400px] w-full">
               <Cropper
                  image={image?.src}
                  crop={crop}
                  zoom={zoom}
                  aspect={aspect}
                  onCropChange={handleCropChange}
                  onZoomChange={handleZoomChange}
                  onCropComplete={onCropComplete}
                  classes={{
                     containerClassName: 'absolute inset-0',
                     mediaClassName: 'max-h-full max-w-full',
                  }}
                  style={{
                     containerStyle: {
                        backgroundColor: '#000000',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                     },
                  }}
               />
            </div>
         )}

         {!showImageGallery && (
            <>
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
            </>
         )}

         {showAspectRatio && !showImageGallery && (
            <div
               className={
                  'bg-dark-500 absolute bottom-[49px] left-[11px] flex h-[152px] w-[156px] flex-col rounded-xs opacity-80'
               }
            >
               <AspectOption
                  label="Original"
                  value={naturalAspect}
                  aspect={aspect}
                  onClick={() =>
                     dispatch({
                        type: 'SET_ASPECT',
                        payload: {
                           index: currentIndex,
                           aspect: naturalAspect,
                        },
                     })
                  }
                  Icon={<ImageOutline />}
               />

               <AspectOption
                  label="1:1"
                  value={1}
                  aspect={aspect}
                  onClick={() =>
                     dispatch({
                        type: 'SET_ASPECT',
                        payload: {
                           index: currentIndex,
                           aspect: 1,
                        },
                     })
                  }
                  boxClass="h-[18px] w-[18px]"
               />

               <AspectOption
                  label="4:5"
                  value={4 / 5}
                  aspect={aspect}
                  onClick={() =>
                     dispatch({
                        type: 'SET_ASPECT',
                        payload: {
                           index: currentIndex,
                           aspect: 4 / 5,
                        },
                     })
                  }
                  boxClass="h-[26px] w-[18px]"
               />

               <AspectOption
                  label="16:9"
                  value={16 / 9}
                  aspect={aspect}
                  onClick={() =>
                     dispatch({
                        type: 'SET_ASPECT',
                        payload: {
                           index: currentIndex,
                           aspect: 16 / 9,
                        },
                     })
                  }
                  boxClass="h-[20px] w-[26px]"
               />
            </div>
         )}

         {showZoomScale && !showImageGallery && (
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
                  <div
                     key={i.src}
                     className={cn(
                        'relative cursor-pointer',
                        currentIndex === idx && 'ring-accent-500 rounded-xs ring-2'
                     )}
                     onClick={() => handleThumbnailClick(idx)}
                  >
                     <div className="relative h-[82px] w-20">
                        <Image
                           src={i.src}
                           alt={`Cropped image ${idx + 1}`}
                           fill
                           sizes="80px"
                           style={{
                              objectFit: 'contain',
                           }}
                        />
                     </div>
                     <button
                        onClick={e => {
                           e.stopPropagation()
                           deleteImage(idx)
                        }}
                        className={
                           'bg-dark-500 absolute top-[2px] right-[2px] flex h-3 w-3 cursor-pointer items-center justify-center rounded-xs'
                        }
                     >
                        <CrossIcon />
                     </button>
                  </div>
               ))}
               <button
                  onClick={handleAddImageClick}
                  className={'flex h-9 w-9 cursor-pointer align-top'}
               >
                  <PlusCircleOutline />
               </button>
               <input
                  ref={fileInputRef}
                  type="file"
                  accept={ACCEPTED_IMAGE_TYPES.join(',')}
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
