'use client'

import { ProfileHeader } from '@/widgets/Profile'
import { useParams } from 'next/navigation'
import React from 'react'

export default function ProfilePage() {
   const { login } = useParams<{ login: string }>()

   return (
      <div className={'flex flex-col gap-12 pt-[36px] pl-4'}>
         <ProfileHeader login={login} />
      </div>
   )
}
