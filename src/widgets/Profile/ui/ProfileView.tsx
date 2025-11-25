'use client'

import React from 'react'

import { ProfileHeader } from '@/entities/user'

type Props = {
   login: string
}

export const ProfileView = ({ login }: Props) => {
   return (
      <div className={'flex flex-col gap-12 pt-[36px] pl-4'}>
         <ProfileHeader login={login} />
      </div>
   )
}
