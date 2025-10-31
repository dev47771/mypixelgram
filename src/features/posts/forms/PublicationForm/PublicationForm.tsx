'use client'

import { Button } from '@/shared/components/Button'
import { ControlledInput, ControlledTextarea } from '@/shared/components/Controlled'
import { ModalBody, ModalTitle } from '@/shared/components/Modal'
import { Typography } from '@/shared/components/Typography'
import { ArrowLeftIcon } from '@/shared/icons'
import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'
import { useForm } from 'react-hook-form'
import z from 'zod'

const publicationSchema = z.object({
   description: z
      .string()
      .max(500, { message: 'Description must be less than 500 characters' })
      .optional(),
   location: z.string().max(20, { message: 'Location must be less than 20 characters' }).optional(),
})

export type PublicationFormData = z.infer<typeof publicationSchema>

type PublicationFormProps = {
   onSubmit: (data: PublicationFormData) => Promise<void>
   onCancel: () => void
   isSubmitting?: boolean
   images: string[]
}

export const PublicationForm = ({
   onSubmit,
   onCancel,
   isSubmitting = false,
   images,
}: PublicationFormProps) => {
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

   return (
      <form onSubmit={handleSubmit(onSubmit)}>
         <ModalTitle className="flex items-center justify-between px-[0px]">
            <Button variant="textButton" className="text-light-100" onClick={onCancel}>
               <ArrowLeftIcon />
            </Button>
            <Typography variant="h1">Publication</Typography>
            <Button type="submit" variant="textButton" disabled={isSubmitting}>
               Publish
            </Button>
         </ModalTitle>

         <hr className="text-dark-100 h-[1px]" />

         <ModalBody className="flex flex-row">
            <div className="relative h-[503px] w-[490px] bg-gray-900">
               {images.length > 0 && (
                  <Image src={images[0]} alt="Post image" fill className="object-cover" />
               )}
            </div>
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
   )
}
