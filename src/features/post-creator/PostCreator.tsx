'use client'

import { useEffect, useRef, useState } from 'react'
import { FilterValue, MODALS, useModalStack } from '.'
import { FilterModal } from './ui/modals/FilterModal/FilterModal'
import { nanoid } from '@reduxjs/toolkit'
import { AddPhotoModal } from '@/entities/posts/ui/modals/addPhotoModal'
import { usePathname, useSearchParams, useRouter } from 'next/navigation'
import { CroppingModal } from '@/entities/posts/ui/modals/croppingModal'
import { PublicationModal } from '@/entities/posts/ui/modals/PublicationModal'

export type PhotoState = {
   id: string
   originalFile: File // Исходный файл
   previewUrl: string // URL.createObjectURL(file)
   modifiedFile: null | File // Исходный файл
   modifiedPreviewUrl: string // URL.createObjectURL(file)
   currentFilter: FilterValue // Текущий активный фильтр
}

// type Props = {
//    onCloseAction?: () => void
// }

export const PostCreator = () => {
   const { modalStack, openMainModal, resetModalStack, openOverlayModal } = useModalStack()
   const [photos, setPhotos] = useState<PhotoState[]>([])
   const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0)

   const photosRef = useRef(photos)

   const searchParams = useSearchParams()
   const pathname = usePathname()
   const router = useRouter()

   const action = searchParams.get('action')
   const isAddPhotoAction = action === 'create'

   const handleAddPhotos = (File: File) => {
      const newPhoto = {
         id: nanoid(),
         originalFile: File,
         previewUrl: URL.createObjectURL(File),
         modifiedFile: null,
         modifiedPreviewUrl: '',
         currentFilter: 'filter-none',
      } satisfies PhotoState

      setPhotos(prev => [...prev, newPhoto])
   }

   const applyFilterToCurrentPhoto = (filter: FilterValue) => {
      setPhotos(prev =>
         prev.map((photo, index) =>
            index === currentPhotoIndex
               ? {
                    ...photo,
                    currentFilter: filter,
                 }
               : photo
         )
      )
   }
   //to remove photos from useEffect deps
   useEffect(() => {
      photosRef.current = photos
   })

   //при закрытии PostCreator сработает очистка массива с фото и сбросится до initial состояния массив modalStack
   useEffect(() => {
      return () => {
         resetModalStack()
         const currentPhotos = photosRef.current
         currentPhotos.forEach(photo => {
            URL.revokeObjectURL(photo.previewUrl)
            if (photo.modifiedPreviewUrl) {
               URL.revokeObjectURL(photo.modifiedPreviewUrl)
            }
         })
         setPhotos([])
      }
   }, [resetModalStack])

   //закрытие PostCreator
   // const handleCompleteClose = () => {
   //    onCloseAction?.() // вызовет router.back() из компонента profile
   // }
   const requestClose = () => {
      openOverlayModal(MODALS.CLOSE)
   }

   const closeAddPhotoModalHandler = () => {
      const params = new URLSearchParams(searchParams.toString())
      params.delete('action')
      router.replace(pathname)
   }

   const renderModals = () => {
      return modalStack.map(modalName => {
         switch (modalName) {
            case MODALS.ADD_PHOTO:
               return (
                  <AddPhotoModal
                     key="add_photo"
                     onPhotoSelected={(file: File) => {
                        handleAddPhotos(file)
                        openMainModal(MODALS.CROPPING)
                     }}
                     onClose={() => {
                        openMainModal(MODALS.CROPPING)
                     }}
                     isOpen={isAddPhotoAction}
                     onOpenChange={closeAddPhotoModalHandler}
                  />
               )
            case MODALS.CROPPING:
               return (
                  <CroppingModal
                     key="cropping"
                     isOpen
                     onOpenChange={() => {}}
                     onBack={() => {
                        openMainModal(MODALS.ADD_PHOTO)
                        setPhotos([])
                     }}
                     photos={photos}
                     onNext={() => {
                        openMainModal(MODALS.FILTERS)
                     }}
                     currentIndex={currentPhotoIndex}
                     setCurrentIndex={setCurrentPhotoIndex}
                     onPhotosUpdate={setPhotos}
                  />
               )
            case MODALS.FILTERS:
               return (
                  <FilterModal
                     key="filtering"
                     onBack={() => {
                        openMainModal(MODALS.CROPPING)
                        setPhotos(prev => prev.map(i => ({ ...i, currentFilter: 'filter-none' })))
                     }}
                     onNext={() => openMainModal(MODALS.PUBLICATION)}
                     images={photos}
                     currentFilter={photos[currentPhotoIndex]?.currentFilter || 'filter-none'}
                     onSlideChange={setCurrentPhotoIndex}
                     onFilterChange={applyFilterToCurrentPhoto}
                     currentIndex={currentPhotoIndex}
                  />
               )
            case MODALS.PUBLICATION:
               return (
                  <PublicationModal
                     key="publication"
                     photos={photos}
                     onBack={() => openMainModal(MODALS.FILTERS)}
                     onClose={requestClose}
                  />
               )
            //модалка закрытия для PostCreator
            case MODALS.CLOSE:
               /*  return (
                  <CloseModal
                     key="close"
                     onConfirm={closeTopModal} //для кнопки no, крестика в модалке close и при клике где-то вне зоны модалки close
                     onCancel={handleCompleteClose} //для кнопки yes (закроет PostCreator)
                  />
               )*/
               break
            default:
               return null
         }
      })
   }

   return <>{renderModals()}</>
}
