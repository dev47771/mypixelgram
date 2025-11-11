'use client'

import React from 'react'
import { ProfileHeader } from '@/entities/user'
import { PostCreator } from '@/features/post-creator/PostCreator'
import { useRouter, useSearchParams } from 'next/navigation'

type Props = {
   userId: string
}

export const ProfileView = ({ userId }: Props) => {
   const router = useRouter()
   const searchParams = useSearchParams()
   const action = searchParams.get('action')
   const isOpenPostCreator = action === 'create'

   const handleClosePostCreator = () => {
      router.push(`/profile/${userId}`) //возвращаемся назад по истории при закрытии PostCreator
   }

   const mockUser = {
      id: userId,
      username: 'Username',
      avatarUrl: '',
      about: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco',
      followers: 1000,
      following: 1000,
      publications: 1000,
   }

   return (
      <div className={'flex flex-col gap-12'}>
         {isOpenPostCreator && <PostCreator onClose={handleClosePostCreator} />}
         <ProfileHeader user={mockUser} isOwnerProfile={true} />
      </div>
   )
}
