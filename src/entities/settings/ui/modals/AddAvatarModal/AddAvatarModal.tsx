'use client'

import { PhotoState } from '@/features/post-creator/PostCreator'
import { Button } from '@/shared/components/Button'
import { PostModal } from '@/shared/components/PostModal'
import { PostOutlineIcon } from '@/shared/icons'
import { ACCEPTED_IMAGE_TYPES, imgSchema } from '@/shared/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { nanoid } from '@reduxjs/toolkit'
import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { AvatarCropper, AvatarCropperRef } from './AvatarCropper'

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
   // eslint-disable-next-line
   const [finalImage, setFinalImage] = useState<string | null>(null)

   const cropperRef = useRef<AvatarCropperRef>(null)

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
               {/* <Image
                  src={photos[0]?.previewUrl || ''}
                  alt={'avatar'}
                  className="object-contain"
                  width={332}
                  height={340}
               /> */}
               <AvatarCropper
                  ref={cropperRef}
                  image={photos[0]?.previewUrl || ''}
                  onFinish={(img: string) => setFinalImage(img)}
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
                  <Button
                     type="submit"
                     onClick={() => {
                        cropperRef.current?.save() // <-- вызывает обрезку и вернёт dataURL в onFinish
                     }}
                  >
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
