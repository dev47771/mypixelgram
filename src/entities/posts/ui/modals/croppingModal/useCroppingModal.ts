import { useReducer, useRef, useState, useCallback, useEffect } from 'react'
import { ChangeEvent } from 'react'
import { Area } from 'react-easy-crop'
import { getCroppedImg } from '@/shared/utils'
import { MAX_FILE_SIZE } from '@/shared/schema'
import { alert } from '@/shared/components/Alert'
import { PhotoState } from '@/features/post-creator/PostCreator'
import { nanoid } from '@reduxjs/toolkit'
import { croppingReducer, initialState } from './croppingReducer'

type UseCroppingModalProps = {
   photos: PhotoState[]
   currentIndex: number
   setCurrentIndex: (idx: number) => void
   onPhotosUpdate: (photos: PhotoState[]) => void
   onNext: () => void
}

export const useCroppingModal = ({
   photos,
   currentIndex,
   setCurrentIndex,
   onPhotosUpdate,
   onNext,
}: UseCroppingModalProps) => {
   const [state, dispatch] = useReducer(croppingReducer, initialState)
   const { showZoomScale, showAspectRatio, showImageGallery, isEditingMode, imageStates } = state ////isEditingMode
   const [isProcessing, setIsProcessing] = useState(false)
   const blobUrlsRef = useRef<Set<string>>(new Set())

   const fileInputRef = useRef<HTMLInputElement | null>(null)

   // Получаем состояние для текущего изображения
   const currentImageState = imageStates[currentIndex] || {
      crop: { x: 0, y: 0 },
      // zoomScale: [20],
      zoomScale: [0],
      aspect: undefined,
      naturalAspect: undefined,
      croppedAreaPixels: null,
   }

   const { crop, zoomScale, aspect, naturalAspect } = currentImageState
   const currentPhoto = photos[currentIndex]
   const zoom = 1 + (zoomScale[0] / 100) * 2

   // Инициализируем состояние для изображения
   useEffect(() => {
      if (!currentPhoto) return

      const img = new Image()
      img.src = currentPhoto.previewUrl
      img.onload = () => {
         const naturalAspectValue = img.naturalWidth / img.naturalHeight

         if (!imageStates[currentIndex]) {
            dispatch({
               type: 'INIT_IMAGE_STATE',
               payload: {
                  index: currentIndex,
                  naturalAspect: naturalAspectValue,
               },
            })
         }
      }
   }, [currentPhoto, currentIndex, imageStates])

   useEffect(() => {
      const currentBlobUrls = blobUrlsRef.current
      return () => {
         currentBlobUrls.forEach(url => URL.revokeObjectURL(url))
         currentBlobUrls.clear()
      }
   }, [])

   // Создаем обрезанные фото сразу при выходе из режима редактирования
   useEffect(() => {
      if (!isEditingMode) {
         // Проверяем, есть ли фото которые нужно обработать (новые или измененные)
         const needsProcessing = photos.some((photo, index) => {
            const imageState = imageStates[index]
            return imageState?.croppedAreaPixels // Есть настройки кропа
         })

         if (needsProcessing) {
            // Создаем обрезанные версии для ВСЕХ фото у которых есть croppedAreaPixels
            const createCroppedImages = async () => {
               const updatedPhotos = await Promise.all(
                  photos.map(async (photo, index) => {
                     const imageState = imageStates[index]

                     if (imageState?.croppedAreaPixels) {
                        try {
                           const croppedBlob = await getCroppedImg(
                              photo.previewUrl,
                              imageState.croppedAreaPixels
                           )
                           const croppedFile = new File(
                              [croppedBlob],
                              `cropped-${photo.originalFile.name}`,
                              { type: 'image/jpeg', lastModified: Date.now() }
                           )
                           const croppedPreviewUrl = URL.createObjectURL(croppedFile)

                           // Освобождаем старый URL если есть
                           if (photo.modifiedPreviewUrl) {
                              URL.revokeObjectURL(photo.modifiedPreviewUrl)
                           }

                           return {
                              ...photo,
                              modifiedFile: croppedFile,
                              modifiedPreviewUrl: croppedPreviewUrl,
                           }
                        } catch (error) {
                           console.error('Error cropping image:', error)
                           return photo
                        }
                     } else {
                        return photo
                     }
                  })
               )

               onPhotosUpdate(updatedPhotos)
            }

            createCroppedImages()
         }
      }
   }, [isEditingMode, photos, imageStates, onPhotosUpdate])

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

      const newPhoto = {
         id: nanoid(),
         previewUrl: URL.createObjectURL(file),
         originalFile: file,
         modifiedFile: null,
         modifiedPreviewUrl: '',
         currentFilter: 'filter-none',
      } satisfies PhotoState

      onPhotosUpdate([...photos, newPhoto])
      e.target.value = ''
   }

   const deleteImage = (idxToDelete: number) => {
      const photoToDelete = photos[idxToDelete]

      // Освобождаем Blob URL
      URL.revokeObjectURL(photoToDelete.previewUrl)
      if (photoToDelete.modifiedPreviewUrl) {
         URL.revokeObjectURL(photoToDelete.modifiedPreviewUrl)
      }

      const newPhotos = photos.filter((_, idx) => idx !== idxToDelete)
      onPhotosUpdate(newPhotos)

      if (currentIndex >= newPhotos.length) {
         setCurrentIndex(Math.max(newPhotos.length - 1, 0))
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

   const closeAllPanels = useCallback(() => {
      dispatch({ type: 'CLOSE_ALL_PANELS' })
   }, [])

   const handleSliderNavigation = (newIndex: number) => {
      setCurrentIndex(newIndex)
   }

   // Обрезка изображений - СОЗДАЕМ ТОЛЬКО MODIFIED ФАЙЛЫ
   // const processAndSaveCroppedImages = async (): Promise<void> => {
   //    const updatedPhotos = await Promise.all(
   //       photos.map(async (photo, index) => {
   //          const imageState = imageStates[index]

   //          if (imageState?.croppedAreaPixels) {
   //             try {
   //                // Создаем обрезанное изображение
   //                const croppedBlob = await getCroppedImg(
   //                   photo.previewUrl,
   //                   imageState.croppedAreaPixels
   //                )
   //                const croppedFile = new File(
   //                   [croppedBlob],
   //                   `cropped-${photo.originalFile.name}`,
   //                   {
   //                      type: 'image/jpeg', // Явно указываем тип
   //                      lastModified: Date.now(),
   //                   }
   //                )
   //                const croppedPreviewUrl = URL.createObjectURL(croppedFile)

   //                // Освобождаем старый modifiedPreviewUrl если он есть
   //                if (photo.modifiedPreviewUrl) {
   //                   URL.revokeObjectURL(photo.modifiedPreviewUrl)
   //                }

   //                return {
   //                   ...photo,
   //                   modifiedFile: croppedFile,
   //                   modifiedPreviewUrl: croppedPreviewUrl,
   //                }
   //             } catch (error) {
   //                console.error('Error cropping image:', error)
   //                return photo
   //             }
   //          } else {
   //             // Если кроп не применялся, оставляем как есть
   //             return photo
   //          }
   //       })
   //    )

   //    onPhotosUpdate(updatedPhotos)
   // }

   const handleNext = async () => {
      setIsProcessing(true)
      try {
         // await processAndSaveCroppedImages()
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
      isEditingMode, // ← ДОБАВИТЬ ЭТУ СТРОКУ
      isProcessing,
      crop,
      zoom,
      aspect,
      naturalAspect,
      currentPhoto,
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
      closeAllPanels,

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

      currentIndex,
   }
}
