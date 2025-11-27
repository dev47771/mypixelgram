'use client'

import {withPublicRoute} from '@/shared/HOC/withPublicRoute'
import {ProfileHeaderPublic} from '@/entities/user/ui/ProfileHeader';
import {ProfilePublicPosts} from '@/features/posts/ui/ProfilePosts';
import {useProfilePageBase} from '@/shared/hooks';

function ProfilePublicPage() {
   const { login, userProfile, isLoading, openPostHandler } = useProfilePageBase()

   if(isLoading) {
      return <p>loading...</p>
   }

   if(!userProfile) {
      return <div>user not found</div>
   }

   return (
      <div className={'flex w-full flex-col pt-[36px] pb-6 pl-6'}>
         <ProfileHeaderPublic userProfile={userProfile}  />
         <ProfilePublicPosts login={login} onOpenPost={openPostHandler} />
      </div>
   )
}

export default withPublicRoute(ProfilePublicPage)