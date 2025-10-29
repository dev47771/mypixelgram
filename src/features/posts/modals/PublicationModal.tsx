'use client'

import { Button } from '@/shared/components/Button'
import { Input } from '@/shared/components/Input'
import { Modal, ModalBody, ModalTitle } from '@/shared/components/Modal'
import { Textarea } from '@/shared/components/Textarea'
import { Typography } from '@/shared/components/Typography'
import { ArrowLeftIcon } from '@/shared/icons'
import { ReactNode, useState } from 'react'

type Props = {
   open: boolean
   description?: ReactNode
   onConfirm: () => void
   onCancel: () => void
   confirmText?: string
   cancelText?: string
}

export const PublicationModal = ({ open, onConfirm, onCancel }: Props) => {
   const [text, setText] = useState(0)

   const handleChange = (value: string) => {
      setText(value.length)
   }

   return (
      <Modal open={open} onOpenChange={onCancel} className="w-[972px]">
         <ModalTitle className="flex items-center justify-between px-[0px]">
            <Button variant="textButton" className="text-light-100">
               <ArrowLeftIcon />
            </Button>
            <Typography variant="h1">Publication</Typography>
            <Button onClick={onConfirm} variant="textButton" className="h-[36px] w-[96px]">
               Publish
            </Button>
         </ModalTitle>

         <hr className="text-dark-100 h-[1px]" />

         <ModalBody className="flex flex-row">
            <div className="h-[503px] w-[490px] bg-gray-900">carousel</div>
            <div className="flex-1">
               <div className="p-[24px]">
                  <div className="flex items-center gap-3 pb-[24px]">
                     <div className="h-9 w-9 rounded-full bg-gray-400" />
                     <span className="font-medium text-white">UrlProfile</span>
                  </div>

                  <Textarea
                     label={'Add publication descriptions'}
                     placeholder="Text-area"
                     className="min-h-[120px]"
                     onChange={e => handleChange(e.target.value)}
                     maxLength={500}
                  />

                  <Typography
                     as={'span'}
                     variant={'captionRegular'}
                     className="text-light-900 flex justify-end"
                  >
                     {text}/500
                  </Typography>
               </div>
               <hr className="text-dark-100 h-[1px]" />
               <div className="p-[24px]">
                  <Input label="Add location" type="location" placeholder="Enter location" />
                  <div className="mt-3 flex flex-col gap-2">
                     {[
                        { city: 'New York', place: 'Washington Square Park' },
                        { city: 'New York', place: 'Times Square' },
                     ].map((item, idx) => (
                        <div key={idx} className="cursor-pointer">
                           <Typography>{item.city}</Typography>
                           <Typography variant="captionRegular" className="text-light-900">
                              {item.place}
                           </Typography>
                        </div>
                     ))}
                  </div>
               </div>
            </div>
         </ModalBody>
      </Modal>
   )
}
