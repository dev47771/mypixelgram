'use client'

import { Avatar } from '@/shared/components/Avatar'
import { Button } from '@/shared/components/Button'
import { ControlledInput, ControlledTextarea } from '@/shared/lib/Controlled'
import { ModalBody, ModalTitle } from '@/shared/components/Modal'
import { Typography } from '@/shared/components/Typography'
import { ArrowLeftIcon } from '@/shared/icons'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import z from 'zod'
import { publicationSchema } from '../../model/schemas'
import { PostCreatorSlider } from '@/features/post-creator/ui/PostCreatorSlider/PostCreatorSlider'
import { useMeQuery } from '@/entities/user/api'
import { FilterValue } from '@/features/post-creator/ui/modals/FilterModal'

export type PublicationFormData = z.infer<typeof publicationSchema>

type PublicationFormProps = {
   onSubmit: (dataPostData: PublicationFormData) => void
   onBack: () => void
   images: string[]
   onSlideChange: (index: number) => void
   filters: FilterValue[]
   currentSlide?: number
   isLoading: boolean
   errorsFromApi?: { field: string; message: string }[] | undefined
}

export const PublicationForm = ({
   onSubmit,
   onBack,
   images,
   onSlideChange,
   filters,
   currentSlide = 0,
   isLoading,
   errorsFromApi,
}: PublicationFormProps) => {
   const {
      control,
      handleSubmit,
      formState: { errors },
      watch,
      setError,
   } = useForm<PublicationFormData>({
      resolver: zodResolver(publicationSchema),
   })

   const { data: user } = useMeQuery()

   useEffect(() => {
      errorsFromApi?.forEach(error => {
         setError(error.field as keyof PublicationFormData, { message: error.message })
      })
   }, [errorsFromApi, setError])

   const descriptionValue = watch('description')
   const descriptionLength = descriptionValue?.length || 0

   return (
      <form onSubmit={handleSubmit(onSubmit)}>
         <ModalTitle className="flex items-center justify-between">
            <Button
               type="button"
               variant="textButton"
               className="text-light-100 min-w-[60px] p-0"
               onClick={onBack}
            >
               <ArrowLeftIcon />
            </Button>
            <Typography variant="h1">Publication</Typography>
            <Button
               type="submit"
               variant="textButton"
               className="min-w-[60px] p-0"
               disabled={isLoading}
            >
               Publish
            </Button>
         </ModalTitle>

         <hr className="text-dark-100 h-[1px]" />

         <ModalBody className="grid h-full grid-cols-[490px_481px] overflow-hidden p-0">
            <div className="border-dark-100 h-full overflow-hidden border-r">
               <PostCreatorSlider
                  images={images}
                  filters={filters}
                  onSlideChangeAction={onSlideChange}
                  currentSlide={currentSlide}
               />
            </div>
            <div className="flex-1">
               <div className="p-[24px]">
                  <div className="flex items-center gap-3 pb-[24px]">
                     <Avatar src={user?.avatar} alt={user?.login} />
                     <Typography as="span" variant="h3">
                        {user?.login}
                     </Typography>
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
