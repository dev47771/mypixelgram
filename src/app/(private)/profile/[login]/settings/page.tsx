'use client'

import { AddAvatarModal } from '@/entities/settings/ui/modals/AddAvatarModal/AddAvatarModal'
import { useUserProfile } from '@/entities/user/model/useUserProfile'
import { Avatar } from '@/shared/components/Avatar'
import { Button } from '@/shared/components/Button'
import { CrossIcon, PostOutlineIcon } from '@/shared/icons'
import { useState } from 'react'
import Image from 'next/image'
import clsx from 'clsx'

export default function ProfileSettingsPage() {
   const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false)
   const { userProfile } = useUserProfile()

   const handleAvatarClick = () => setIsAvatarModalOpen(true)

   return (
      <>
         <div className={'flex w-full flex-col pt-[36px] pl-6'}>
            <div className={'border-dark-100 h-[36px] w-[972px] border'}>Tabs</div>
            <div className={'flex flex-row'}>
               <div className={'mt-[48px] mr-[38px] flex flex-col'}>
                  <div className={'mb-[24px] w-[201px] self-center'}>
                     {userProfile?.user.avatar ? (
                        <Avatar size="xl" src={userProfile?.user.avatar} alt="user avatar" />
                     ) : (
                        <div className="bg-dark-500 flex h-48 w-48 items-center justify-center rounded-full">
                           <PostOutlineIcon width={48} height={48} />
                        </div>
                     )}

                     <div className="flex w-[201px] justify-center">
                        <div className="relative">
                           <Image
                              src="/logo-light.png"
                              alt="avatar"
                              width={192}
                              height={192}
                              className="rounded-full"
                           />

                           <button
                              className={clsx(
                                 'absolute right-[8px] bottom-[155px] z-20 flex items-center justify-center',
                                 'before:absolute before:h-6 before:w-6 before:rounded-full',
                                 'before:border-dark-900 before:border-4 before:bg-red-500',
                                 'cursor-pointer before:-z-10 before:box-border'
                              )}
                           >
                              <CrossIcon className="h-4 w-4" />
                           </button>
                        </div>
                     </div>
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
      </>
   )
}
