'use client'

import React from 'react'

import { ProfileHeaderContainer } from '@/widgets/Profile'

type Props = {
   userId: string
}

export const ProfileView = ({ userId }: Props) => {
   return (
      <div className={'flex flex-col gap-12'}>
         <ProfileHeaderContainer userId={userId} />
      </div>
   )
}
