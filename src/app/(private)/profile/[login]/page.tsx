'use client'

import { ProfileHeader, ProfilePosts } from '@/widgets/Profile'
import { useParams } from 'next/navigation'

export default function ProfilePage() {
   const { login } = useParams<{ login: string }>()

   return (
      <div className={'flex w-full flex-col pt-[36px] pl-6'}>
         <ProfileHeader login={login} />
         <ProfilePosts login={login} />
      </div>
   )
}
