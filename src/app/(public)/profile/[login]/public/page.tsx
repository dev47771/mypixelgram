'use client'

import { withPublicRoute } from '@/shared/HOC/withPublicRoute'
import { ProfileHeaderPublic } from '@/entities/user/ui/ProfileHeader'
import { ProfilePublicPosts } from '@/features/posts/ui/ProfilePosts'
import { usePostController } from '@/shared/hooks'
import { useGetPostByIdQuery } from '@/features/posts/api'
import { Post } from '@/entities/posts/ui/Post'
import { EditPostModal } from '@/entities/posts/ui/modals/EditPostModal'


function ProfilePublicPage() {
   const {
      login,
      userProfile,
      isLoading,
      postId,
      isPostOpen,
      isEditOpen,
      closeEditPostModal,
      openPostModal,
      closePostModal,
   } = usePostController()

   const { data: post, isFetching} = useGetPostByIdQuery(postId!, { skip: !postId })

   if(isLoading) {
      return <p>loading...</p>
   }

   if(!userProfile) {
      return <div>user not found</div>
   }

   return (
      <div className={'flex w-full flex-col pt-[36px] pb-6 pl-6'}>
         <ProfileHeaderPublic userProfile={userProfile}  />
         <ProfilePublicPosts login={login} onOpenPost={openPostModal} />
         {isPostOpen && !isEditOpen && post && <Post post={post} onClose={closePostModal} isFetchingPost={isFetching} />}
         {isEditOpen && post && <EditPostModal post={post} onCloseAction={closeEditPostModal} />}
      </div>
   )
}

export default withPublicRoute(ProfilePublicPage)