'use client'

import { withPrivateRoute } from '@/shared/HOC'
import { ProfileHeaderPrivate } from '@/entities/user/ui/ProfileHeader'
import { useProfilePageBase } from '@/shared/hooks'
import { ProfilePrivatePosts } from '@/features/posts/ui/ProfilePosts'

function ProfilePrivatePage() {
   const { login, userProfile, isLoading, openPostHandler } = useProfilePageBase()

   if (isLoading) {
      return <p>loading...</p>
   }

   if (!userProfile) {
      return <div>user not found</div>
   }

   return (
      <div className={'flex w-full flex-col pt-[36px] pl-6'}>
         <ProfileHeaderPrivate userProfile={userProfile} />
         <ProfilePrivatePosts login={login} onOpenPost={openPostHandler} />
      </div>
   )
}
export default withPrivateRoute(ProfilePrivatePage)
