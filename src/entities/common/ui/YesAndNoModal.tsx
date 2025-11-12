'use client'

import { Modal, ModalTitle, ModalBody, ModalClose } from '@/shared/components/Modal'
import { Button } from '@/shared/components/Button'
import { Typography } from '@/shared/components/Typography'
import { CrossIcon } from '@/shared/icons'
import { ReactNode } from 'react'
import { cn } from '@/shared/lib'

type Props = {
   open: boolean
   title: string
   description?: ReactNode
   onConfirm: () => void
   onCancel: () => void
   confirmText?: string
   cancelText?: string
   className?: string
}

export const YesAndNoModal = ({
   open,
   title,
   description,
   onConfirm,
   onCancel,
   confirmText = 'Yes',
   cancelText = 'No',
   className,
}: Props) => {
   return (
      <Modal open={open} onOpenChange={onCancel}>
         <ModalTitle className="flex items-center justify-between">
            <Typography variant="h1">{title}</Typography>
            <ModalClose asChild>
               <CrossIcon />
            </ModalClose>
         </ModalTitle>

         <hr className="text-dark-100 h-[1px]" />

         <ModalBody
            className={cn(
               'flex max-w-[438px] flex-col gap-[29px] px-[24px] py-[30px_36px] whitespace-pre-line',
               className
            )}
         >
            {description && <Typography>{description}</Typography>}
            <span className="flex gap-[24px] self-end">
               <Button onClick={onConfirm} variant="outlined" className="h-[36px] w-[96px]">
                  {confirmText}
               </Button>
               <Button onClick={onCancel} className="h-[36px] w-[96px]">
                  {cancelText}
               </Button>
            </span>
         </ModalBody>
      </Modal>
   )
}
