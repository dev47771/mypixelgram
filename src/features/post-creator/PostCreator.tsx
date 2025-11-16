'use client'
/* eslint-disable */

import { useEffect, useState } from 'react'
import { MODALS, useModalStack } from '.'
import { AddPhotoModal } from '@/entities/posts/ui/modals/addPhotoModal'
import { usePathname, useSearchParams, useRouter } from 'next/navigation'
import { PublicationModal } from '@/entities/posts/ui/modals/PublicationModal'
import { CroppingModal } from '@/entities/posts/ui/modals/croppingModal'
import { StaticImageData } from 'next/image'

type Props = {
   onCloseAction?: () => void
}

export const PostCreator = ({ onCloseAction }: Props) => {
   const { modalStack, openMainModal, openOverlayModal, closeTopModal, resetModalStack } =
      useModalStack()
   const [photos, setPhotos] = useState<StaticImageData[]>([])
   const [currentIndex, setCurrentIndex] = useState(0)
   const searchParams = useSearchParams()
   const pathname = usePathname()
   const router = useRouter()

   const action = searchParams.get('action')
   const isAddPhotoAction = action === 'create'
   // массив для ссылок на файлы для карусели????
   // const [urlPhotos, setUrlPhotos] = useState<string[]>([]);

   //при закрытии PostCreator сработает очистка массива с фото и сбросится до initial состояния массив modalStack
   useEffect(() => {
      return () => {
         resetModalStack()
         setPhotos([])
      }
   }, [])

   console.log('modalStack', modalStack)

   //закрытие PostCreator
   const handleCompleteClose = () => {
      onCloseAction?.() // вызовет router.back() из компонента profile
   }

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
            //основные модальные окошки PostCreator
            case MODALS.ADD_PHOTO:
               // return <AddPhotoModal
               //     key="add_photo"
               //     onPhotoSelected={(file: File) => {
               //         setPhotos([file]);
               //         openMainModal(MODALS.CROPPING);
               //     }}
               //     onClose={requestClose}
               // />;
               return (
                  <AddPhotoModal
                     key="add_photo"
                     onPhotoSelected={(file: StaticImageData) => {
                        setPhotos([file])
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
               // return <CroppingModal
               //     key="cropping"
               //     photos={photos}
               //     onNext={() => openMainModal(MODALS.FILTERS)}
               //     onBack={() => openMainModal(MODALS.ADD_PHOTO)}
               //     onClose={requestClose}
               // />;
               return (
                  <CroppingModal
                     key="cropping"
                     isOpen
                     onOpenChange={() => {}}
                     onBack={() => {
                        openMainModal(MODALS.ADD_PHOTO)
                        setPhotos([])
                     }}
                     images={photos}
                     onNext={() => {}}
                     currentIndex={currentIndex}
                     setCurrentIndex={setCurrentIndex}
                     setImages={setPhotos}
                  />
               )
            case MODALS.FILTERS:
               // return <FiltersModal
               //     key="filters"
               //     photos={photos}
               //     onNext={() => openMainModal(MODALS.PUBLICATION)}
               //     onBack={() => openMainModal(MODALS.CROPPING)}
               //     onClose={requestClose}
               // />;
               break
            case MODALS.PUBLICATION:
               // return <PublicationModal
               //     key="publication"
               //     photos={photos}
               //     publish={() => null} //тут будет отправка публикации вместо null + нужно добавить закрытие PostCreator после успешного создания поста и отображение поста в ленте пользователя
               //     onBack={() => openMainModal(MODALS.FILTERS)}
               //     onClose={requestClose}
               // />;
               //в PublicationModal publish передавать не надо внутри прописан
               // return (
               //    <PublicationModal
               //       key="publication"
               //       photos={photos}
               //       onBack={() => openMainModal(MODALS.FILTERS)}
               //       onClose={requestClose}
               //    />
               //)
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
