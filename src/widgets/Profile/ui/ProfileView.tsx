'use client'

import React from 'react'

import { ProfileHeader } from '@/entities/user'

type Props = {
   login: string
}

export const ProfileView = ({ login }: Props) => {
   return (
      <div className={'flex flex-col gap-12'}>
         <ProfileHeader login={login} />
      </div>
   )
}
