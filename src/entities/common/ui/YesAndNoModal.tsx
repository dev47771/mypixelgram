'use client'

import { Modal, ModalTitle, ModalBody, ModalClose } from '@/shared/components/Modal'
import { Button } from '@/shared/components/Button'
import { Typography } from '@/shared/components/Typography'
import { CrossIcon } from '@/shared/icons'

type YesAndNoModalProps = {
   open: boolean
   title: string
   description?: React.ReactNode | string
   onConfirm: () => void
   onCancel: () => void
   confirmText?: string
   cancelText?: string
}

export const YesAndNoModal = ({
   open,
   title,
   description,
   onConfirm,
   onCancel,
   confirmText = 'Yes',
   cancelText = 'No',
}: YesAndNoModalProps) => {
   return (
      <Modal open={open} onOpenChange={onCancel}>
         <ModalTitle className="flex items-center justify-between">
            <Typography variant="h1">{title}</Typography>
            <ModalClose asChild>
               <CrossIcon />
            </ModalClose>
         </ModalTitle>

         <hr className="text-dark-100 h-[1px]" />

         <ModalBody className="flex max-w-[378px] flex-col gap-4 px-6 py-3">
            {description && <Typography>{description}</Typography>}
            <span className="flex gap-2 self-end">
               <Button onClick={onCancel} variant="outlined" className="h-[36px] w-[96px]">
                  {cancelText}
               </Button>
               <Button onClick={onConfirm} className="h-[36px] w-[96px]">
                  {confirmText}
               </Button>
            </span>
         </ModalBody>
      </Modal>
   )
}
