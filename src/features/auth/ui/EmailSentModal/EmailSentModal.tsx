import React from 'react'
import { Modal, ModalBody, ModalClose, ModalTitle } from '@/shared/components/Modal'
import { Typography } from '@/shared/components/Typography'
import { Button } from '@/shared/components/Button'
import { CrossIcon } from '@/shared/icons'

type Props = {
   email: string | null
   onClose: (email: string | null) => void
}

export const EmailSentModal = ({ email, onClose }: Props) => {
   const handleCloseModal = () => onClose(null)

   return (
      <Modal open={!!open} onOpenChange={handleCloseModal}>
         <ModalTitle className={'flex items-center justify-between'}>
            <Typography variant={'h1'}>Email sent</Typography>
            <ModalClose asChild>
               <CrossIcon />
            </ModalClose>
         </ModalTitle>

         <hr className={'text-dark-100 h-[1px]'} />

         <ModalBody className={'flex max-w-[378px] flex-col gap-[18px] px-6 py-3'}>
            <Typography>We have sent a link to confirm your email to {email}</Typography>
            <Button onClick={handleCloseModal} className={'self-end'}>
               OK
            </Button>
         </ModalBody>
      </Modal>
   )
}
