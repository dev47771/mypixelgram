import { Modal, ModalBody, ModalClose, ModalTitle } from '@/shared/components/Modal'
import { Typography } from '@/shared/components/Typography'
import { CrossIcon, PostOutlineIcon } from '@/shared/icons'
import { Button } from '@/shared/components/Button'
import { ChangeEvent, useEffect, useRef } from 'react'
import { imgSchema } from '@/shared/schema/imgSchema'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { alert } from '@/shared/components/Alert'

const schema = z.object({
   postPhoto: imgSchema('postPhoto').shape['postPhoto'],
})

type FormTypes = z.infer<typeof schema>

type Props = {
   isOpen: boolean
   onClose: () => void
   onPhotoSelected: (file: File) => void
}

export const AddPhotoModal = ({ isOpen, onPhotoSelected, onClose }: Props) => {
   const fileInputRef = useRef<HTMLInputElement>(null)
   const hasShownError = useRef(false)

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

   useEffect(() => {
      if (errors.postPhoto?.message && !hasShownError.current) {
         alert.error(errors.postPhoto.message)
         hasShownError.current = true
      }
   }, [errors.postPhoto])

   const postPhotoRef = (e: HTMLInputElement | null) => {
      ref(e)
      fileInputRef.current = e
   }

   const fileLoaderHandler = (e: ChangeEvent<HTMLInputElement>) => {
      hasShownError.current = false
      void onChange(e)
      void trigger('postPhoto')
   }

   const addPhotoButtonHandler = () => {
      fileInputRef.current?.click()
   }

   return (
      <Modal className={'w-[492px]'} open={isOpen}>
         <ModalTitle className={'flex items-center justify-between'}>
            <Typography variant={'h1'}>Add Photo</Typography>
            <ModalClose asChild>
               <CrossIcon />
            </ModalClose>
         </ModalTitle>
         <hr className={'text-dark-100 h-[1px]'} />
         <ModalBody className="flex flex-col gap-15 pt-[72px] pr-[135px] pb-[48px] pl-[135px]">
            <div
               className={
                  'bg-dark-500 flex h-[228px] w-[222px] items-center justify-center rounded-xs'
               }
            >
               <PostOutlineIcon className={'h-12 w-12'} />
            </div>
            <div className={'flex max-w-[219px] flex-col gap-6'}>
               <Button onClick={addPhotoButtonHandler}>Select from Computer</Button>
               <Button variant={'outlined'}>Open Draft</Button>
            </div>
            <input
               type="file"
               ref={postPhotoRef}
               className={'hidden'}
               onChange={fileLoaderHandler}
               {...restPostPhoto}
            />
         </ModalBody>
      </Modal>
   )
}
