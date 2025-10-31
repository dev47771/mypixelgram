'use client'

import { Modal } from '@/shared/components/Modal'
import { useState } from 'react'
import { PublicationForm, PublicationFormData } from '../forms/PublicationForm'

type Props = {
   open: boolean
   onConfirm: (data: PublicationFormData) => Promise<void>
   onCancel: () => void
   images: string[]
}

export const PublicationModal = ({ open, onConfirm, onCancel, images }: Props) => {
   const [isSubmitting, setIsSubmitting] = useState(false)

   images = ['./public/404.jpg', './public/logo-light.png', './public/logo-dark.png']

   const handlePublish = async (data: PublicationFormData) => {
      setIsSubmitting(true)
      try {
         await onConfirm(data)
         onCancel()
      } catch (error) {
         console.warn('Error', error)
      } finally {
         setIsSubmitting(false)
      }
   }

   return (
      <Modal open={open} onOpenChange={onCancel} className="w-[972px]">
         <PublicationForm
            onSubmit={handlePublish}
            onCancel={onCancel}
            isSubmitting={isSubmitting}
            images={images}
         />
      </Modal>
   )
}

/* 'use client'

import { Button } from '@/shared/components/Button'
import { ControlledInput, ControlledTextarea } from '@/shared/components/Controlled'
import { Modal, ModalBody, ModalTitle } from '@/shared/components/Modal'
import { Typography } from '@/shared/components/Typography'
import { ArrowLeftIcon } from '@/shared/icons'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import z from 'zod'

type PublicationFormData = z.infer<typeof publicationSchema>

const publicationSchema = z.object({
   description: z
      .string()
      .max(500, { message: 'Description must be less than 500 characters' })
      .optional(),
   location: z.string().max(20, { message: 'Location must be less than 20 characters' }).optional(),
})

type Props = {
   open: boolean
   onConfirm: (data: PublicationFormData) => Promise<void>
   onCancel: () => void
}

export const PublicationModal = ({ open, onConfirm, onCancel }: Props) => {
   const [isSubmitting, setIsSubmitting] = useState(false)

   const {
      control,
      handleSubmit,
      formState: { errors },
      watch,
   } = useForm<PublicationFormData>({
      resolver: zodResolver(publicationSchema),
   })

   const descriptionValue = watch('description')
   const descriptionLength = descriptionValue?.length || 0

   const handlePublish = async (data: PublicationFormData) => {
      setIsSubmitting(true)
      try {
         await onConfirm(data)
         onCancel() // ✅ Закрываем модалку только при успехе
      } catch (error) {
         // ❌ Ошибка обрабатывается автоматически через RTK Query
         // Модалка не закрывается, показывается alert
         console.warn('Error', error)
      } finally {
         setIsSubmitting(false)
      }
   }

   return (
      <Modal open={open} onOpenChange={onCancel} className="w-[972px]">
         <form onSubmit={handleSubmit(handlePublish)}>
            <ModalTitle className="flex items-center justify-between px-[0px]">
               <Button variant="textButton" className="text-light-100">
                  <ArrowLeftIcon />
               </Button>
               <Typography variant="h1">Publication</Typography>
               <Button type="submit" variant="textButton" disabled={isSubmitting}>
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
                     <ControlledTextarea
                        name={'description'}
                        control={control}
                        label={'Add publication descriptions'}
                        placeholder="Text-area"
                        className="min-h-[120px]"
                        maxLength={500}
                        errorMessage={errors.description?.message}
                     />

                     <Typography
                        as={'span'}
                        variant={'captionRegular'}
                        className="text-light-900 flex justify-end"
                     >
                        {descriptionLength}/500
                     </Typography>
                  </div>
                  <hr className="text-dark-100 h-[1px]" />
                  <div className="p-[24px]">
                     <ControlledInput
                        name={'location'}
                        control={control}
                        label="Add location"
                        type="location"
                        placeholder="Enter location"
                        errorMessage={errors.location?.message}
                     />
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
         </form>
      </Modal>
   )
}
 */
