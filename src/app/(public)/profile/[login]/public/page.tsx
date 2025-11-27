'use client'

import {withPublicRoute} from '@/shared/HOC/withPublicRoute'
import {ProfileHeaderPublic} from '@/entities/user/ui/ProfileHeader';
import {ProfilePublicPosts} from '@/features/posts/ui/ProfilePosts';
import {useProfilePageBase} from '@/shared/hooks';
import { useGetPostByIdQuery } from '@/features/posts/api'
import { Post } from '@/entities/posts/ui/Post'
import { Loader } from '@/shared/components/Loader'
import { notFound } from 'next/navigation'

function ProfilePublicPage() {
   const { login, userProfile, isLoading, postId, isPostOpen, openPostHandler, closePostHandler } =
      useProfilePageBase()
   const { data: post, isLoading: isLoadingPost } = useGetPostByIdQuery(postId!, { skip: !postId })

   if(isLoading) {
      return <p>loading...</p>
   }

   if(!userProfile) {
      return <div>user not found</div>
   }

   let postContent = null
   if (isPostOpen) {
      if (isLoadingPost) postContent = <Loader />
      else if (post) postContent = <Post post={post} onClose={closePostHandler} />
      else return notFound()
   }

   return (
      <div className={'flex w-full flex-col pt-[36px] pb-6 pl-6'}>
         <ProfileHeaderPublic userProfile={userProfile}  />
         <ProfilePublicPosts login={login} onOpenPost={openPostHandler} />
         {postContent}
      </div>
   )
}

export default withPublicRoute(ProfilePublicPage)