import { ArrowLeftIcon, CrossIcon } from '@/shared/icons'
import { cn } from '@/shared/lib'
import * as Dialog from '@radix-ui/react-dialog'
import React, { ComponentPropsWithRef, ReactNode } from 'react'
import { Button } from '../Button'
import { Modal, ModalBody, ModalClose, ModalTitle } from '../Modal'
import { Typography } from '../Typography'

type ModalSize = 'image-upload' | 'post-management' | 'social-list' | 'profile-crop'
type HeaderVariant = 'close-only' | 'with-navigation'
type ContentColumns = 'one' | 'two'

type Props = {
   size: ModalSize
   headerVariant?: HeaderVariant
   headerText?: string
   contentColumns: ContentColumns

   leftContent?: ReactNode
   rightContent?: ReactNode

   children?: ReactNode

   leftContentClassName?: string
   rightContentClassName?: string

   onBack?: () => void
   onNext?: () => void
   publish?: () => void
   //onClose?: () => void
   className?: string

   portal?: React.ElementType
} & ComponentPropsWithRef<typeof Dialog.Root>

export const PostModal = ({
   size,
   headerVariant,
   headerText,
   contentColumns,
   leftContent,
   leftContentClassName,
   rightContent,
   children,
   rightContentClassName,
   onBack,
   onNext,
   publish,
   //onClose,
   className,
   portal,
   ...props
}: Props) => {
   const sizeClasses = {
      'image-upload': 'w-[492px] h-[564px]', // addPhoto, cropping, addProfilePhoto
      'post-management': 'w-[972px] h-[564px]', // filters, publication, editPost, myPost, FriendPost
      'social-list': 'w-[644px] h-[564px]', // subscribers, followers, likes
      'profile-crop': 'w-[492px] h-[536px]', // AddProfilePhotoCropping
   }

   return (
      <Modal open {...props} className={cn(sizeClasses[size])} portal={portal}>
         {/* HEADER*/}

         {/* нет Header */}
         {/* кнопка закрытия находится вне модального окна */}
         {!headerText && (
            <>
               <ModalTitle className={'sr-only'}>dialog window</ModalTitle>
               <ModalClose className="absolute -top-[36px] -right-[42px] z-10 cursor-pointer">
                  <CrossIcon />
               </ModalClose>
            </>
         )}

         {/* есть Header */}
         {headerText && (
            <>
               {/* только title и кнопка закрытия */}
               {headerVariant === 'close-only' && (
                  <ModalTitle className={'flex items-center justify-between'}>
                     <Typography variant={'h1'} className={'pointer-events-none'}>
                        {headerText}
                     </Typography>
                     <ModalClose asChild>
                        <CrossIcon />
                     </ModalClose>
                  </ModalTitle>
               )}

               {/* title, кнопка "назад" и Next*/}
               {headerVariant === 'with-navigation' && (
                  <ModalTitle className={'flex items-center justify-between'}>
                     <Button
                        onClick={onBack}
                        variant="textButton"
                        className="text-light-100 min-w-[60px] border-none p-0"
                     >
                        <ArrowLeftIcon />
                     </Button>
                     <Typography variant={'h1'} className={'pointer-events-none'}>
                        {headerText}
                     </Typography>
                     <Button
                        onClick={onNext ? onNext : publish}
                        variant="textButton"
                        className="min-w-[60px] border-none p-0"
                     >
                        Next
                     </Button>
                  </ModalTitle>
               )}

               {/* для всех видов Header */}
               <hr className={'text-dark-100 h-[1px]'} />
            </>
         )}

         {/* BODY */}

         <ModalBody
            className={cn(
               contentColumns === 'two'
                  ? !headerText
                     ? // модалка БЕЗ header с 2 колонками (myPost, FriendPost)
                       'grid h-[562px] grid-cols-[490px_481px]'
                     : // модалка с header с 2 колонками (filters, publication, editPost)
                       'grid h-[501px] grid-cols-[490px_481px]'
                  : size !== 'profile-crop'
                    ? // модалка высотой h-[564px] с header с 1 колонкой (addPhoto, cropping, addProfilePhoto, subscribers, followers, likes)
                      'h-[501px] w-full overflow-hidden rounded-[1px]'
                    : // модалка высотой h-[536px] с header с 1 колонкой (AddProfilePhotoCropping)
                      'h-[473px] w-full overflow-hidden rounded-[1px]',
               className
            )}
         >
            {/* Контент для модалки с 2 колонками передаем пропсами leftContent и rightContent */}
            {contentColumns === 'two' ? (
               <div className="contents">
                  {/* Контент левой колонки модалке с 2 колонками (как правило это фото) */}
                  <div
                     className={cn(
                        leftContentClassName,
                        'border-dark-100 overflow-hidden border-r'
                     )}
                  >
                     {leftContent}
                  </div>

                  {/* Контент правой колонки модалке с 2 колонками (как правило это текст) */}
                  <div className={cn(rightContentClassName, 'overflow-hidden')}>{rightContent}</div>
               </div>
            ) : (
               // Контент для модалки с 2 колонками передаем пропсами как children (внутрь компоненты PostModal)
               children
            )}
         </ModalBody>
      </Modal>
   )
}
