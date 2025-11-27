'use client'

import { withPrivateRoute } from '@/shared/HOC'
import { ProfileHeaderPrivate } from '@/entities/user/ui/ProfileHeader'
import { useProfilePageBase } from '@/shared/hooks'
import { ProfilePrivatePosts } from '@/features/posts/ui/ProfilePosts'
import { useGetPostByIdQuery } from '@/features/posts/api'
import { Post } from '@/entities/posts/ui/Post'
import { Loader } from '@/shared/components/Loader'
import { notFound } from 'next/navigation'

function ProfilePrivatePage() {
   const { login, userProfile, isLoading, postId, isPostOpen, openPostHandler, closePostHandler } =
      useProfilePageBase()
   const { data: post, isLoading: isLoadingPost } = useGetPostByIdQuery(postId!, { skip: !postId })

   if (isLoading) {
      return <p>loading...</p>
   }

   if (!userProfile) {
      return <div>user not found</div>
   }

   let postContent = null
   if (isPostOpen) {
      if (isLoadingPost) postContent = <Loader />
      else if (post) postContent = <Post post={post} onClose={closePostHandler} />
      else return notFound()
   }

   return (
      <div className={'flex w-full flex-col pt-[36px] pl-6'}>
         <ProfileHeaderPrivate userProfile={userProfile} />
         <ProfilePrivatePosts login={login} onOpenPost={openPostHandler} />
         {postContent}
      </div>
   )
}
export default withPrivateRoute(ProfilePrivatePage)
