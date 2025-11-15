import { useReducer, useRef, useState, useCallback, useEffect } from 'react'
import { ChangeEvent } from 'react'
import { StaticImageData } from 'next/image'
import { Area } from 'react-easy-crop'
import { croppingReducer, initialState } from './croppingReducer'
import { loadImageMeta, getCroppedImg } from '@/shared/utils'
import { MAX_FILE_SIZE } from '@/shared/schema'
import { alert } from '@/shared/components/Alert'

type UseCroppingModalProps = {
   images: StaticImageData[]
   currentIndex: number
   setCurrentIndex: (idx: number) => void
   setImages: (images: StaticImageData[]) => void
   onNext: () => void
}

export const useCroppingModal = ({
   images,
   currentIndex,
   setCurrentIndex,
   setImages,
   onNext,
}: UseCroppingModalProps) => {
   const [state, dispatch] = useReducer(croppingReducer, initialState)
   const { showZoomScale, showAspectRatio, showImageGallery, imageStates } = state
   const [isProcessing, setIsProcessing] = useState(false)

   const fileInputRef = useRef<HTMLInputElement | null>(null)

   // Получаем состояние для текущего изображения
   const currentImageState = imageStates[currentIndex] || {
      crop: { x: 0, y: 0 },
      zoomScale: [20],
      aspect: undefined,
      naturalAspect: undefined,
      croppedAreaPixels: null,
   }

   const { crop, zoomScale, aspect, naturalAspect } = currentImageState
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

   // Обработчики установки аспекта
   const setAspect = useCallback(
      (newAspect: number | undefined) => {
         dispatch({
            type: 'SET_ASPECT',
            payload: {
               index: currentIndex,
               aspect: newAspect,
            },
         })
      },
      [currentIndex]
   )

   const handleSetOriginalAspect = useCallback(() => {
      setAspect(naturalAspect)
   }, [setAspect, naturalAspect])

   const handleSet1_1Aspect = useCallback(() => {
      setAspect(1)
   }, [setAspect])

   const handleSet4_5Aspect = useCallback(() => {
      setAspect(4 / 5)
   }, [setAspect])

   const handleSet16_9Aspect = useCallback(() => {
      setAspect(16 / 9)
   }, [setAspect])

   // Обработчики файлов
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

   // Обработчики кроппера
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

   // Переключение режимов
   const toggleAspectRatio = () => {
      dispatch({ type: 'TOGGLE_ASPECT_RATIO' })
   }

   const toggleZoomScale = () => dispatch({ type: 'TOGGLE_ZOOM_SCALE' })

   const toggleGallery = () => dispatch({ type: 'TOGGLE_IMAGE_GALLERY' })

   const handleSliderNavigation = (newIndex: number) => {
      setCurrentIndex(newIndex)
   }

   // Обрезка изображений
   const processAndSaveCroppedImages = async (): Promise<StaticImageData[]> => {
      return await Promise.all(
         images.map(async (image, index) => {
            const imageState = imageStates[index]

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
                  return image
               }
            } else {
               return image
            }
         })
      )
   }

   const handleNext = async () => {
      setIsProcessing(true)
      try {
         const croppedImages = await processAndSaveCroppedImages()
         setImages(croppedImages)
         onNext()
      } catch (error) {
         console.error('Error processing images:', error)
         onNext()
      } finally {
         setIsProcessing(false)
      }
   }

   return {
      // Состояние
      showZoomScale,
      showAspectRatio,
      showImageGallery,
      isProcessing,
      crop,
      zoom,
      aspect,
      naturalAspect,
      image,
      zoomScale,
      fileInputRef,

      // Обработчики файлов
      handleAddImageClick,
      handleFilesSelected,
      deleteImage,
      handleThumbnailClick,

      // Обработчики кроппера
      onCropComplete,
      handleCropChange,
      handleChangeRange,
      handleZoomChange,

      // Обработчики аспекта
      handleSetOriginalAspect,
      handleSet1_1Aspect,
      handleSet4_5Aspect,
      handleSet16_9Aspect,

      // Переключение режимов
      toggleAspectRatio,
      toggleZoomScale,
      toggleGallery,
      handleSliderNavigation,

      // Обрезка
      handleNext,

      // Диспатч для AspectOption
      dispatch,
      currentIndex,
   }
}
