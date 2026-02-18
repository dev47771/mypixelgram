'use client'

import React, { useState } from 'react'
import { PostModal } from '@/shared/components/PostModal'
import { useForm } from 'react-hook-form'
import { Typography } from '@/shared/components/Typography'
import { ControlledTextarea } from '@/shared/components/Controlled'
import { Button } from '@/shared/components/Button'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { PostByIdType, useUpdatePostDataMutation } from '@/features/posts/api'
import { CancelEditModal } from '@/entities/posts/ui/modals/CancelEditModal/CancelEditModal'
import { Avatar } from '@/shared/components/Avatar'
import { Slider } from '@/shared/components/Slider'

type FormTypes = z.infer<typeof EditPostSchema>

type Props = {
   post: PostByIdType
   onCloseAction: () => void
}

const EditPostSchema = z.object({
   description: z.string().max(500, 'Max 500 characters'),
})

export const EditPostModal = ({ post, onCloseAction }: Props) => {
   const {
      control,
      formState: { errors, isDirty },
      handleSubmit,
   } = useForm({
      defaultValues: {
         description: post.description || '',
      },
      resolver: zodResolver(EditPostSchema),
   })
   const [editPostMutation] = useUpdatePostDataMutation()
   const [showConfirmModal, setShowConfirmModal] = useState(false)

   const CloseEditModalHandler = () => {
      if (!isDirty) {
         onCloseAction()
      } else {
         setShowConfirmModal(true)
      }
   }

   const submitHandler = async (data: FormTypes) => {
      if (!isDirty) return onCloseAction()

      try {
         await editPostMutation({
            postId: post.postId,
            location: post.location ?? 'location',
            description: data.description,
         }).unwrap()

         onCloseAction()
      } catch (e) {
         console.error('Failed to update post', e)
      }
   }

   return (
      <>
         <PostModal
            open
            size="post-management"
            headerText="Edit Post"
            headerVariant="close-only"
            onOpenChange={CloseEditModalHandler}
            contentColumns="two"
            leftContent={
               <Slider images={post.images.map(i => i.url)} className={'h-full w-full'} />
            }
            leftContentClassName={'relative'}
            rightContentClassName={'p-6'}
            rightContent={
               <form
                  className={'flex h-full flex-col justify-between'}
                  onSubmit={handleSubmit(submitHandler)}
               >
                  <div>
                     <div className={'mb-6 flex items-center gap-[6px]'}>
                        <Avatar src={post.user.avatar} size={'sm'} />
                        <Typography variant={'h3'}>{post.user.login}</Typography>
                     </div>
                     <ControlledTextarea
                        name={'description'}
                        control={control}
                        errorMessage={errors.description?.message}
                        label={'Add publication descriptions'}
                        showCount
                        maxLength={500}
                        autoFocus={false}
                        shouldUnregister={false}
                        resize={'vertical'}
                        className={'min-h-30'}
                     />
                  </div>

                  <Button className={'self-end'} type={'submit'}>
                     Save Changes
                  </Button>
               </form>
            }
         />
         {showConfirmModal && (
            <CancelEditModal
               open={showConfirmModal}
               onConfirm={() => {
                  setShowConfirmModal(false)
                  onCloseAction()
               }}
               onCancel={() => setShowConfirmModal(false)}
            />
         )}
      </>
   )
}
