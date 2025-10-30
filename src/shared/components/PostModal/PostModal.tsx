import { ArrowLeftIcon, CrossIcon } from '@/shared/icons'
import { Modal, ModalBody, ModalClose, ModalTitle } from '../Modal'
import { Typography } from '../Typography'
import * as Dialog from '@radix-ui/react-dialog'
import { ComponentPropsWithRef } from 'react'
import clsx from 'clsx'

type ModalSize = 'image-upload' | 'post-management' | 'social-list' | 'profile-crop'
type HeaderVariant = 'close-only' | 'with-navigation'
type ContentColumns = 'one' | 'two'

type Props = {
   size: ModalSize
   hasHeader?: boolean
   headerVariant?: HeaderVariant
   headerText?: string
   contentColumns: ContentColumns

   leftContent?: React.ReactNode
   rightContent?: React.ReactNode

   children?: React.ReactNode

   leftContentClassName?: string
   rightContentClassName?: string

   onBack?: () => void
   onNext?: () => void
} & ComponentPropsWithRef<typeof Dialog.Root>

export const PostModal = ({
   size,
   hasHeader,
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
   ...props
}: Props) => {
   const sizeClasses = {
      'image-upload': 'w-[492px] h-[564px]', // addPhoto, cropping, addProfilePhoto
      'post-management': 'w-[972px] h-[564px]', // filters, publication, editPost, myPost, FriendPost
      'social-list': 'w-[644px] h-[564px]', // subscribers, followers, likes
      'profile-crop': 'w-[492px] h-[536px]', // AddProfilePhotoCropping
   }

   return (
      <Modal open {...props} className={clsx(sizeClasses[size], 'outline-none')}>
         {!hasHeader && (
            <ModalClose className="absolute -top-[36px] -right-[42px] z-10 cursor-pointer outline-none">
               <CrossIcon />
            </ModalClose>
         )}
         {hasHeader && (
            <>
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
               {headerVariant === 'with-navigation' && (
                  <ModalTitle className={'flex items-center justify-between'}>
                     <button onClick={onBack} className={'cursor-pointer outline-none'}>
                        <ArrowLeftIcon />
                     </button>
                     <Typography variant={'h1'} className={'pointer-events-none'}>
                        {headerText}
                     </Typography>
                     <button onClick={onNext} className={'cursor-pointer outline-none'}>
                        <Typography variant={'h3'} className={'text-accent-500'}>
                           Next
                        </Typography>
                     </button>
                  </ModalTitle>
               )}
               <hr className={'text-dark-100 h-[1px]'} />
            </>
         )}
         <ModalBody
            className={clsx(
               contentColumns === 'two'
                  ? !hasHeader
                     ? 'grid h-[562px] grid-cols-[490px_482px]'
                     : 'grid h-[501px] grid-cols-[490px_482px]'
                  : 'h-[501px] w-full overflow-hidden rounded-[1px]'
            )}
         >
            {contentColumns === 'two' ? (
               <>
                  <div className={clsx(leftContentClassName, 'border-dark-100 border-r')}>
                     {leftContent}
                  </div>
                  <div className={rightContentClassName}>{rightContent}</div>
               </>
            ) : (
               children
            )}
         </ModalBody>
      </Modal>
   )
}
