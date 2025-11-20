/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unused-vars, react-hooks/exhaustive-deps */
'use client'

import { useEffect, useState } from 'react'
import { MODALS, useModalStack } from '.'
import { FilterModal } from './ui/modals/FilterModal/FilterModal'
import { nanoid } from '@reduxjs/toolkit'
import { AddPhotoModal } from '@/entities/posts/ui/modals/addPhotoModal'
import { useSearchParams } from 'next/navigation'
import { PublicationModal } from '@/entities/posts/ui/modals/PublicationModal'

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

   const searchParams = useSearchParams()

   const action = searchParams.get('action')
   const isAddPhotoAction = action === 'create'

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
                     onClose={requestClose}
                     isOpen={isAddPhotoAction}
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
                     onBack={() => openMainModal(MODALS.CROPPING)}
                     onNext={() => openMainModal(MODALS.PUBLICATION)}
                     images={photos.map(photo => photo.previewUrl)}
                     currentFilter={photos[currentPhotoIndex]?.currentFilter || 'filter-none'}
                     onSlideChange={setCurrentPhotoIndex}
                     onFilterChange={applyFilterToCurrentPhoto}
                  />
               )
               break

            case MODALS.PUBLICATION:
               return (
                  <PublicationModal
                     key="publication"
                     // @ts-expect-error
                     photos={photos}
                     onBack={() => openMainModal(MODALS.FILTERS)}
                     onClose={requestClose}
                  />
               )
               break

            //модалка закрытия для PostCreator
            case MODALS.CLOSE:
               // return <CloseModal
               //     key="close"
               //     onConfirm={closeTopModal} //для кнопки no, крестика в модалке close и при клике где-то вне зоны модалки close
               //     onCancel={handleCompleteClose} //для кнопки yes (закроет PostCreator)
               // />;
               break

            default:
               return null
         }
      })
   }

   return <>{renderModals()}</>
}
