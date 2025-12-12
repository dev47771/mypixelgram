'use client'

import { YesAndNoModal } from '@/entities/common/ui'
import { AddAvatarModal } from '@/entities/settings/ui/modals/AddAvatarModal/AddAvatarModal'
import {
   useDeleteAvatarMutation,
   useGetProfileQuery,
} from '@/entities/settings/ui/modals/AddAvatarModal/api'
import { alert } from '@/shared/components/Alert'
import { Avatar } from '@/shared/components/Avatar'
import { Button } from '@/shared/components/Button'
import { CrossIcon, PostOutlineIcon } from '@/shared/icons'
import clsx from 'clsx'
import { useState } from 'react'

export default function ProfileSettingsPage() {
   const { data } = useGetProfileQuery()

   const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false)
   const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

   const [deleteAvatar] = useDeleteAvatarMutation()

   const handleAvatarClick = () => {
      if (data?.dateOfBirth) {
         setIsAvatarModalOpen(true)
      } else {
         alert.error('You must complete and save the profile form with required fields.')
      }
   }

   const handleConfirmDelete = async () => {
      try {
         await deleteAvatar().unwrap()
         setIsDeleteModalOpen(false)
      } catch (e) {
         console.error('Failed to delete post', e)
      }
   }

   return (
      <>
         <div className={'flex w-full flex-col pt-[36px] pl-6'}>
            <div className={'border-dark-100 h-[36px] w-[972px] border'}>Tabs</div>
            <div className={'flex flex-row'}>
               <div className={'mt-[48px] mr-[38px] flex flex-col'}>
                  <div className={'mb-[24px] flex w-[201px] justify-center'}>
                     {data?.avatar ? (
                        <div className="relative">
                           <Avatar size="xl" src={data?.avatar} alt="user avatar" />
                           <button
                              className={clsx(
                                 'absolute right-[8px] bottom-[155px] z-0 flex items-center justify-center',
                                 'before:absolute before:h-6 before:w-6 before:rounded-full',
                                 'before:border-dark-900 before:border-4 before:bg-red-500',
                                 'cursor-pointer before:-z-10 before:box-border'
                              )}
                              onClick={() => setIsDeleteModalOpen(true)}
                           >
                              <CrossIcon className="h-4 w-4" />
                           </button>
                        </div>
                     ) : (
                        <div className="bg-dark-500 flex h-48 w-48 items-center justify-center rounded-full">
                           <PostOutlineIcon width={48} height={48} />
                        </div>
                     )}
                  </div>
                  <Button
                     variant="outlined"
                     className="max-w-[201px] items-center"
                     onClick={handleAvatarClick}
                  >
                     Select Profile photo
                  </Button>
               </div>
               <div className={'border-dark-100 h-[700px] w-[740px] border'}>Form</div>
            </div>
         </div>

         <AddAvatarModal
            open={isAvatarModalOpen}
            onOpenChange={() => setIsAvatarModalOpen(false)}
         />

         <YesAndNoModal
            open={isDeleteModalOpen}
            title="Delete Photo"
            description="Are you sure you want to delete the photo?"
            onConfirm={handleConfirmDelete}
            onCancel={() => setIsDeleteModalOpen(false)}
         />
      </>
   )
}
