'use client'

import React from 'react'
import { PostCreator } from '@/features/post-creator/PostCreator'
import { useRouter, useSearchParams } from 'next/navigation'
import { ProfileHeaderContainer } from '@/widgets/Profile'

type Props = {
   userId: string
}

export const ProfileView = ({ userId }: Props) => {
   const router = useRouter()
   const searchParams = useSearchParams()
   const action = searchParams.get('action')
   const isOpenPostCreator = action === 'create'

   const handleClosePostCreator = () => {
      router.push(`/profile/${userId}`)
   }

   return (
      <div className={'flex flex-col gap-12'}>
         {isOpenPostCreator && <PostCreator onClose={handleClosePostCreator} />}
         <ProfileHeaderContainer userId={userId} />
      </div>
   )
}
