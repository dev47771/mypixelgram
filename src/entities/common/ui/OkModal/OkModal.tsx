'use client'

import { Modal, ModalTitle, ModalBody, ModalClose } from '@/shared/components/Modal'
import { Button } from '@/shared/components/Button'
import { Typography } from '@/shared/components/Typography'
import { CrossIcon } from '@/shared/icons'
import { ReactNode } from 'react'
import { cn } from '@/shared/lib'

export type YesAndNoModalProps = {
   open: boolean
   title: string
   description: ReactNode
   onOpenChangeAction: () => void
   buttonText: string
   className?: string
}

export const OkModal = ({
   open,
   title,
   description,
   onOpenChangeAction,
   buttonText,
   className,
}: YesAndNoModalProps) => {
   return (
      <Modal open={open} onOpenChange={onOpenChangeAction}>
         <ModalTitle className="flex items-center justify-between">
            <Typography variant="h1">{title}</Typography>
            <ModalClose asChild>
               <CrossIcon />
            </ModalClose>
         </ModalTitle>

         <hr className="text-dark-100 h-[1px]" />

         <ModalBody
            className={cn(
               'flex max-w-[438px] min-w-[366px] flex-col gap-[54px] px-[24px] py-[18px_36px] whitespace-pre-line',
               className
            )}
         >
            <Typography>{description}</Typography>
            <Button onClick={onOpenChangeAction}>{buttonText}</Button>
         </ModalBody>
      </Modal>
   )
}
