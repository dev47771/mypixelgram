'use client'

import { AddAvatarModal } from '@/entities/settings/ui/modals/AddAvatarModal/AddAvatarModal'
import { useUserProfile } from '@/entities/user/model/useUserProfile'
import { Avatar } from '@/shared/components/Avatar'
import { Button } from '@/shared/components/Button'
import { PostOutlineIcon } from '@/shared/icons'
import { useState } from 'react'

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
                  <div className={'mb-[24px] self-center'}>
                     {userProfile?.user.avatar ? (
                        <Avatar size="xl" src={userProfile?.user.avatar} alt="user avatar" />
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

         <AddAvatarModal open={isAvatarModalOpen} />
      </>
   )
}
