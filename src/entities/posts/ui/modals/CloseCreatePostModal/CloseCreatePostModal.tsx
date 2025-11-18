import { Modal, ModalBody, ModalClose, ModalTitle } from '@/shared/components/Modal'
import React from 'react'
import { Typography } from '@/shared/components/Typography'
import { CrossIcon } from '@/shared/icons'
import { Button } from '@/shared/components/Button'

type Props = {
   onDiscard: () => void
   onSaveDraft: () => void
   onCloseModal: () => void
}

export const CloseCreatePostModal = ({ onSaveDraft, onDiscard, onCloseModal }: Props) => {
   return (
      <Modal open onOpenChange={onCloseModal}>
         <ModalTitle className={'flex items-center justify-between'}>
            <Typography variant={'h1'}>Close</Typography>{' '}
            <ModalClose asChild>
               <CrossIcon />
            </ModalClose>
         </ModalTitle>

         <hr className={'text-dark-100 h-[1px]'} />

         <ModalBody className="flex max-w-[378px] flex-col gap-4 px-6 pt-7.5 pb-9">
            <Typography>
               Do you really want to close the creation of a publication?
               <br /> If you close everything will be deleted
            </Typography>

            <div className="flex items-center justify-between">
               <Button onClick={onDiscard} variant={'outlined'}>
                  Discard
               </Button>
               <Button onClick={onSaveDraft}>Save draft</Button>
            </div>
         </ModalBody>
      </Modal>
   )
}
