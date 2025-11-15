'use client'
import { PostOutlineIcon } from '@/shared/icons'
import { Button } from '@/shared/components/Button'
import { ChangeEvent, useEffect, useRef } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ACCEPTED_IMAGE_TYPES, imgSchema } from '@/shared/schema'
import { PostModal } from '@/shared/components/PostModal'

const schema = z.object({
   postPhoto: imgSchema('postPhoto').shape['postPhoto'],
})

type FormTypes = z.infer<typeof schema>

type Props = {
   isOpen: boolean
   onClose: () => void
   onPhotoSelected: (file: File) => void
   onOpenChange: (value: boolean) => void
}

export const AddPhotoModal = ({ isOpen, onPhotoSelected, onClose, onOpenChange }: Props) => {
   const fileInputRef = useRef<HTMLInputElement>(null)

   const {
      register,
      trigger,
      formState: { errors },
      watch,
   } = useForm<FormTypes>({
      defaultValues: { postPhoto: undefined },
      resolver: zodResolver(schema),
   })

   const { onChange, ref, ...restPostPhoto } = register('postPhoto')

   const postPhotoWatcher = watch('postPhoto')

   useEffect(() => {
      if (postPhotoWatcher && postPhotoWatcher.length > 0 && !errors.postPhoto) {
         const file = postPhotoWatcher[0]
         onPhotoSelected(file)
         onClose()
      }
   }, [errors.postPhoto, onClose, onPhotoSelected, postPhotoWatcher])

   const postPhotoRef = (e: HTMLInputElement | null) => {
      ref(e)
      fileInputRef.current = e
   }

   const fileLoaderHandler = (e: ChangeEvent<HTMLInputElement>) => {
      void onChange(e)
      void trigger('postPhoto')
   }

   const addPhotoButtonHandler = () => {
      fileInputRef.current?.click()
   }

   return (
      <PostModal
         open={isOpen}
         onOpenChange={onOpenChange}
         size="image-upload"
         headerText="Add Photo"
         headerVariant="close-only"
         contentColumns="one"
         className={'flex flex-col items-center'}
      >
         {errors.postPhoto?.message && (
            <div
               className={`border-danger-500 bg-danger-900 leading-m text-light-100 text-m my-1.5 flex w-[445px] items-center justify-center rounded-xs border px-10 py-1.25 font-normal`}
            >
               {
                  <span className={'text-center'}>
                     <span className={'font-bold'}>Error! </span>
                     {errors.postPhoto?.message}
                  </span>
               }
            </div>
         )}
         <div
            className={`bg-dark-500 ${errors.postPhoto?.message ? '' : 'mt-[72px]'} mb-15 flex h-[228px] w-[222px] items-center justify-center rounded-xs`}
         >
            <PostOutlineIcon className={'h-12 w-12'} />
         </div>
         <form className={'flex flex-col'}>
            <div className={'flex max-w-[219px] flex-col gap-6'}>
               <Button type="button" onClick={addPhotoButtonHandler}>
                  Select from Computer
               </Button>
               <Button type="button" variant={'outlined'} className={'mb-[48px]'}>
                  Open Draft
               </Button>
            </div>
            <input
               type="file"
               ref={postPhotoRef}
               accept={ACCEPTED_IMAGE_TYPES.join(',')}
               className={'hidden'}
               onChange={fileLoaderHandler}
               {...restPostPhoto}
            />
         </form>
      </PostModal>
   )
}
