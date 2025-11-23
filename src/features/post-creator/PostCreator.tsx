'use client'

import { useEffect, useState, useRef } from 'react'
import { MODALS, useModalStack } from '.'
import { nanoid } from '@reduxjs/toolkit'
import { AddPhotoModal } from '@/entities/posts/ui/modals/AddPhotoModal'
//import { useSearchParams } from 'next/navigation'
import { CroppingModal } from '@/entities/posts/ui/modals/CroppingModal'
import { PublicationModal } from '@/entities/posts/ui/modals/PublicationModal'
import { CloseCreatePostModal } from '@/entities/posts/ui/modals/CloseCreatePostModal'
import { FilterModal } from '@/entities/posts/ui/modals/FilterModal/FilterModal'

export type PhotoState = {
   id: string
   originalFile: File
   previewUrl: string
   modifiedFile: null | File
   modifiedPreviewUrl: string
   currentFilter: string
}

type Props = {
   onCloseAction?: () => void
}

export const PostCreator = ({ onCloseAction }: Props) => {
   const { modalStack, openMainModal, openOverlayModal, closeTopModal, resetModalStack } =
      useModalStack()

   //массив с объектами фото
   const [photos, setPhotos] = useState<PhotoState[]>([])

   //индекс текущего фото в слайдере
   const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0)

   const photosRef = useRef(photos)

   //добавление новых фото
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

   const applyFilterToCurrentPhoto = (filter: string) => {
      setPhotos(prev =>
         prev.map((photo, index) =>
            index === currentPhotoIndex ? { ...photo, currentFilter: filter } : photo
         )
      )
   }

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
   }, [])

   //закрытие PostCreator
   const handleCompleteClose = () => {
      onCloseAction?.() // вызовет router.back() из компонента profile
   }

   const requestClose = () => {
      openOverlayModal(MODALS.CLOSE)
   }

   const renderModals = () => {
      return modalStack.map(modalName => {
         switch (modalName) {
            //основные модальные окошки PostCreator
            case MODALS.ADD_PHOTO:
               return (
                  <AddPhotoModal
                     key="add_photo"
                     onPhotoSelected={(file: File) => {
                        handleAddPhotos(file)
                        openMainModal(MODALS.CROPPING)
                     }}
                     onOpenChange={handleCompleteClose}
                  />
               )
               break

            case MODALS.CROPPING:
               return (
                  <CroppingModal
                     key="cropping"
                     isOpen
                     onOpenChange={requestClose}
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
               break

            case MODALS.FILTERS:
               return (
                  <FilterModal
                     key="filters"
                     onBack={() => openMainModal(MODALS.CROPPING)}
                     onNext={() => openMainModal(MODALS.PUBLICATION)}
                     images={photos.map(photo =>
                        photo.modifiedPreviewUrl && photo.modifiedPreviewUrl !== ''
                           ? photo.modifiedPreviewUrl
                           : photo.previewUrl
                     )}
                     filters={photos.map(photo => photo.currentFilter)}
                     onSlideChange={setCurrentPhotoIndex}
                     onFilterChange={applyFilterToCurrentPhoto}
                     onOpenChange={requestClose}
                     currentSlide={currentPhotoIndex}
                  />
               )
               break

            case MODALS.PUBLICATION:
               return (
                  <PublicationModal
                     key="publication"
                     photos={photos}
                     onBack={() => openMainModal(MODALS.FILTERS)}
                     onOpenChange={requestClose}
                     closePostCreator={handleCompleteClose}
                  />
               )
               break

            //модалка закрытия для PostCreator
            case MODALS.CLOSE:
               return (
                  <CloseCreatePostModal
                     key="close"
                     onSaveDraft={handleCompleteClose} //должна быть функция сохранения в Drafts
                     onDiscard={handleCompleteClose} //функция просто закроет PostCreator без сохранения поста
                     onCloseModal={closeTopModal} //функция просто закроет CloseCreatePostModal
                  />
               )
               break

            default:
               return null
         }
      })
   }

   return <>{renderModals()}</>
}
