'use client'

import { useEffect, useState } from 'react'
import { MODALS, useModalStack } from '.'
import { nanoid } from '@reduxjs/toolkit'
import { AddPhotoModal } from '@/entities/posts/ui/modals/addPhotoModal'
import { PublicationModal } from '@/entities/posts/ui/modals/PublicationModal'
import { FilterModal } from '@/entities/posts/ui/modals/FilterModal/FilterModal'
import { CloseCreatePostModal } from '@/entities/posts/ui/modals/CloseCreatePostModal'

export type PhotoState = {
   id: string
   originalFile: File // Исходный файл
   previewUrl: string // URL.createObjectURL(file)
   currentFilter: string // Текущий активный фильтр
}

type Props = {
   onClose?: () => void
}

export const PostCreator = ({ onClose }: Props) => {
   const { modalStack, openMainModal, openOverlayModal, closeTopModal, resetModalStack } =
      useModalStack()

   //массив с объектами фото
   const [photos, setPhotos] = useState<PhotoState[]>([])

   //индекс текущего фото в слайдере
   const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0)

   //добавление новых фото
   const handleAddPhotos = (newFiles: File[]) => {
      const newPhotos: PhotoState[] = newFiles.map(file => ({
         id: nanoid(),
         originalFile: file,
         previewUrl: URL.createObjectURL(file),
         currentFilter: 'filter-none',
      }))

      setPhotos(prev => [...prev, ...newPhotos])
   }

   //применение фильтра к текущему фото
   const applyFilterToCurrentPhoto = (filter: string) => {
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

   //при закрытии PostCreator сработает очистка массива с фото и сбросится до initial состояния массив modalStack
   useEffect(() => {
      return () => {
         resetModalStack()
         photos.forEach(photo => {
            URL.revokeObjectURL(photo.previewUrl)
         })
         setPhotos([])
      }
   }, [])

   //закрытие PostCreator
   const handleCompleteClose = () => {
      onClose?.() // вызовет router.back() из компонента profile
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
                        handleAddPhotos([file])
                        openMainModal(MODALS.CROPPING)
                     }}
                     onOpenChange={requestClose}
                  />
               )
               break

            case MODALS.CROPPING:
               // return <CroppingModal
               //     key="cropping"
               //     photos={photos}
               //     onNext={() => openMainModal(MODALS.FILTERS)}
               //     onBack={() => openMainModal(MODALS.ADD_PHOTO)}
               //     onClose={requestClose}
               // />;
               break

            case MODALS.FILTERS:
               return (
                  <FilterModal
                     key="filters"
                     onBack={() => openMainModal(MODALS.CROPPING)}
                     onNext={() => openMainModal(MODALS.PUBLICATION)}
                     images={photos.map(photo => photo.previewUrl)}
                     currentFilter={photos[currentPhotoIndex]?.currentFilter || 'filter-none'}
                     onSlideChange={setCurrentPhotoIndex}
                     onFilterChange={applyFilterToCurrentPhoto}
                     onOpenChange={requestClose}
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
