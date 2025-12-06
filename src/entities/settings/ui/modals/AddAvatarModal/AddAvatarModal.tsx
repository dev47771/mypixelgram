'use client'

import { PostOutlineIcon } from '@/shared/icons'
import { Button } from '@/shared/components/Button'
import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ACCEPTED_IMAGE_TYPES, imgSchema } from '@/shared/schema'
import { PostModal } from '@/shared/components/PostModal'
import { PhotoState } from '@/features/post-creator/PostCreator'
import { nanoid } from '@reduxjs/toolkit'
import Image from 'next/image'

const schema = z.object({
   postPhoto: imgSchema('postPhoto').shape['postPhoto'],
})

type FormTypes = z.infer<typeof schema>

type Props = {
   onPhotoSelected?: (file: File) => void
   onOpenChange?: (value: boolean) => void
   open: boolean
}

export const AddAvatarModal = ({ onOpenChange, open }: Props) => {
   const [photos, setPhotos] = useState<PhotoState[]>([])
   const [isCroppingOpen, setIsAvatarModalOpen] = useState(false)

   const handleAddPhotos = useCallback((file: File) => {
      const newPhoto: PhotoState = {
         id: nanoid(),
         originalFile: file,
         previewUrl: URL.createObjectURL(file),
         modifiedFile: null,
         modifiedPreviewUrl: '',
         currentFilter: 'filter-none',
      }

      setPhotos(prev => [...prev, newPhoto])
      setIsAvatarModalOpen(true)
   }, [])

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
         //onPhotoSelected(file)
         handleAddPhotos?.(file)
      }
   }, [errors.postPhoto, handleAddPhotos, postPhotoWatcher])

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
         open={open}
         onOpenChange={onOpenChange}
         size="image-upload"
         headerText="Add a Profile Photo"
         headerVariant="close-only"
         contentColumns="one"
         className={'flex flex-col items-center p-[24px]'}
      >
         {errors.postPhoto?.message && (
            <div
               className={`border-danger-500 bg-danger-900 leading-m text-light-100 text-m my-1.5 flex w-[445px] items-center justify-center rounded-xs border px-10 py-1.25 font-normal`}
            >
               {
                  <span className={'text-center'}>
                     <span className={'font-bold'}>Error! </span>
                     {errors.postPhoto?.message.toString()}
                  </span>
               }
            </div>
         )}

         {isCroppingOpen ? (
            <div className={'pt-[28px] pb-[36px]'}>
               <Image
                  src={photos[0]?.previewUrl || ''}
                  alt={'avatar'}
                  className="object-contain"
                  width={332}
                  height={340}
               />
            </div>
         ) : (
            <div
               className={`bg-dark-500 ${errors.postPhoto?.message ? '' : 'mt-[64px]'} mb-[60px] flex h-[228px] w-[222px] items-center justify-center rounded-xs`}
            >
               <PostOutlineIcon className={'h-12 w-12'} />
            </div>
         )}

         <form className={'flex w-full flex-col'}>
            {isCroppingOpen ? (
               <div className={'text-right'}>
                  <Button type="submit" onClick={() => {}}>
                     Save
                  </Button>
               </div>
            ) : (
               <div className={'text-center'}>
                  <Button type="button" onClick={addPhotoButtonHandler}>
                     Select from Computer
                  </Button>
               </div>
            )}
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
