import React from 'react'
import { Modal, ModalBody, ModalClose, ModalTitle } from '@/shared/components/Modal'
import { Typography } from '@/shared/components/Typography'
import { CrossIcon } from '@/shared/icons'
import { Button } from '@/shared/components/Button'

type Props = {
   isOpen: boolean
   onClose: () => void
}

export const OAuthErrorModal = ({ isOpen, onClose }: Props) => {
   return (
      <Modal open={isOpen} onOpenChange={onClose}>
         <ModalTitle className={'flex items-center justify-between'}>
            <Typography variant={'h1'}>OAuth Error</Typography>
            <ModalClose asChild>
               <CrossIcon />
            </ModalClose>
         </ModalTitle>

         <hr className={'text-dark-100 h-[1px]'} />

         <ModalBody className="flex max-w-[378px] flex-col gap-4 px-6 py-3">
            <Typography>Oops... something went wrong. Try again please.</Typography>
            <Button onClick={onClose} className={'self-end'}>
               OK
            </Button>
         </ModalBody>
      </Modal>
   )
}
