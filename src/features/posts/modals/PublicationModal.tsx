'use client'

import { Button } from '@/shared/components/Button'
import { Modal, ModalBody, ModalTitle } from '@/shared/components/Modal'
import { Textarea } from '@/shared/components/Textarea'
import { Typography } from '@/shared/components/Typography'
import { ArrowLeftIcon } from '@/shared/icons'
import { ReactNode } from 'react'

type Props = {
   open: boolean
   description?: ReactNode
   onConfirm: () => void
   onCancel: () => void
   confirmText?: string
   cancelText?: string
}

export const PublicationModal = ({ open, onConfirm, onCancel }: Props) => {
   return (
      <Modal open={open} onOpenChange={onCancel} className="h-[564px] w-[972px]">
         <ModalTitle className="flex items-center justify-between">
            <Button variant="textButton" className="text-light-100">
               <ArrowLeftIcon />
            </Button>
            <Typography variant="h1">Publication</Typography>
            <Button onClick={onConfirm} variant="textButton" className="h-[36px] w-[96px]">
               Publish
            </Button>
         </ModalTitle>

         <hr className="text-dark-100 h-[1px]" />

         <ModalBody className="flex max-w-[972px] flex-row">
            <div className="h-[503px] w-[490px] bg-gray-900">carousel</div>
            <div className="p-[24px]">
               <div>
                  <div className="flex items-center gap-3 pb-[24px]">
                     <div className="h-9 w-9 rounded-full bg-gray-400" />
                     <span className="font-medium text-white">UrlProfile</span>
                  </div>

                  <Textarea label={'Add publication descriptions'} />
               </div>
               <div>123</div>
            </div>
         </ModalBody>
      </Modal>
   )
}
