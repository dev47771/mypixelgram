'use client'

import { Button } from '@/shared/components/Button'
import { PostModal } from '@/shared/components/PostModal'
import { PostOutlineIcon } from '@/shared/icons'
import { ACCEPTED_IMAGE_TYPES, imgSchema } from '@/shared/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { ChangeEvent, useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { AvatarCropper, AvatarCropperRef } from './AvatarCropper'
import { YesAndNoModal } from '@/shared/ui/YesAndNoModal'
import { Loader } from '@/shared/components/Loader'
import { useUploadAvatarMutation } from '@/features/settings/api/settings.service'
import { cn } from '@/shared/lib'

const schema = z.object({
   postPhoto: imgSchema('postPhoto').shape['postPhoto'],
})

type FormTypes = z.infer<typeof schema>

type Props = {
   onOpenChange?: (value: boolean) => void
   open: boolean
}

type AvatarFile = {
   originalFile: File
   previewUrl: string
}

export const AddAvatarModal = ({ onOpenChange, open }: Props) => {
   const [avatarFile, setAvatarFile] = useState<AvatarFile | null>(null)
   const [isCroppingOpen, setIsCroppingOpen] = useState(false)
   const [isConfirmCloseOpen, setIsConfirmCloseOpen] = useState(false)
   const cropperRef = useRef<AvatarCropperRef>(null)
   const fileInputRef = useRef<HTMLInputElement>(null)

   const [uploadAvatar, { isLoading }] = useUploadAvatarMutation()

   const {
      register,
      trigger,
      clearErrors,
      formState: { errors },
      watch,
   } = useForm<FormTypes>({
      resolver: zodResolver(schema),
   })

   const { onChange, ref, ...rest } = register('postPhoto')
   const postPhotoWatcher = watch('postPhoto')

   useEffect(() => {
      const file = postPhotoWatcher?.[0]
      if (file && !errors.postPhoto) {
         const previewUrl = URL.createObjectURL(file)
         setAvatarFile({ originalFile: file, previewUrl })
         setIsCroppingOpen(true)
      }
   }, [postPhotoWatcher, errors.postPhoto])

   const postPhotoRef = (el: HTMLInputElement | null) => {
      ref(el)
      fileInputRef.current = el
   }

   const fileLoaderHandler = (e: ChangeEvent<HTMLInputElement>) => {
      onChange(e)
      trigger('postPhoto')
   }

   const addPhotoButtonHandler = () => {
      fileInputRef.current?.click()
   }

   const handleCroppedImage = async (file: File) => {
      try {
         await uploadAvatar([file]).unwrap()
         cleanup()
         onOpenChange?.(false)
      } catch (e) {
         console.error('Failed to upload avatar', e)
      }
   }

   const cleanup = () => {
      if (avatarFile) URL.revokeObjectURL(avatarFile.previewUrl)
      setAvatarFile(null)
      setIsCroppingOpen(false)
      clearErrors('postPhoto')
      if (fileInputRef.current) fileInputRef.current.value = ''
   }

   const handleSave = () => {
      cropperRef.current?.save()
   }

   const handleClose = () => {
      if (isCroppingOpen) {
         setIsConfirmCloseOpen(true)
         return
      }

      cleanup()
      onOpenChange?.(false)
   }

   const confirmClose = () => {
      cleanup()
      setIsConfirmCloseOpen(false)
      onOpenChange?.(false)
   }

   const cancelClose = () => {
      setIsConfirmCloseOpen(false)
   }

   return (
      <>
         <PostModal
            open={open}
            onOpenChange={handleClose}
            size="image-upload"
            headerText="Add a Profile Photo"
            headerVariant="close-only"
            contentColumns="one"
            className="flex flex-col items-center p-[24px]"
         >
            {errors.postPhoto?.message && (
               <div
                  className={cn(
                     'my-1.5 flex w-[445px] items-center justify-center px-10 py-1.25',
                     'border-danger-500 bg-danger-900 text-light-100 rounded-xs border',
                     'text-m font-normal'
                  )}
               >
                  <span className="text-center">
                     <span className="font-bold">Error! </span>
                     {errors.postPhoto.message.toString()}
                  </span>
               </div>
            )}

            {isCroppingOpen && avatarFile && !errors.postPhoto ? (
               <div className="pt-[28px] pb-[36px]">
                  <AvatarCropper
                     ref={cropperRef}
                     image={avatarFile.previewUrl}
                     onFinish={handleCroppedImage}
                  />
               </div>
            ) : (
               <div
                  className={cn(
                     'bg-dark-500 mb-[60px] flex h-[228px] w-[222px] items-center justify-center rounded-xs',
                     errors.postPhoto ? 'mt-[16px]' : 'mt-[64px]'
                  )}
               >
                  <PostOutlineIcon className="h-12 w-12" />
               </div>
            )}

            <form className="flex w-full flex-col">
               {isCroppingOpen && avatarFile && !errors.postPhoto ? (
                  <div className="text-right">
                     <Button type="button" onClick={handleSave} disabled={isLoading}>
                        {isLoading ? (
                           <Loader
                              size="24px"
                              color={'var(--color-light-100)'}
                              fullscreen={false}
                           />
                        ) : (
                           'Save'
                        )}
                     </Button>
                  </div>
               ) : (
                  <div className="text-center">
                     <Button type="button" onClick={addPhotoButtonHandler}>
                        Select from Computer
                     </Button>
                  </div>
               )}
               <input
                  type="file"
                  ref={postPhotoRef}
                  accept={ACCEPTED_IMAGE_TYPES.join(',')}
                  className="hidden"
                  onChange={fileLoaderHandler}
                  {...rest}
               />
            </form>
         </PostModal>

         <YesAndNoModal
            open={isConfirmCloseOpen}
            title="Close"
            description="Do you really want to close the add a Profile Photo?
If you close photo will be deleted"
            onConfirm={confirmClose}
            onCancel={cancelClose}
         />
      </>
   )
}
