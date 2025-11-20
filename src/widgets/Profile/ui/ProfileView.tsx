'use client'

import React from 'react'

import { ProfileHeaderContainer } from '@/widgets/Profile'

type Props = {
   login: string
}

export const ProfileView = ({ login }: Props) => {
   return (
      <div className={'flex flex-col gap-12'}>
         <ProfileHeaderContainer login={login} />
      </div>
   )
}
