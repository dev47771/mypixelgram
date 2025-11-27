'use client'

import { withPrivateRoute } from '@/shared/HOC'
import { ProfileHeaderPrivate } from '@/entities/user/ui/ProfileHeader'
import { usePostController } from '@/shared/hooks'
import { ProfilePrivatePosts } from '@/features/posts/ui/ProfilePosts'
import { useGetPostByIdQuery } from '@/features/posts/api'
import { Post } from '@/entities/posts/ui/Post'
import { EditPostModal } from '@/entities/posts/ui/modals/EditPostModal'

function ProfilePrivatePage() {
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
   const { data: post, isFetching } = useGetPostByIdQuery(postId!, { skip: !postId })

   if (isLoading) {
      return <p>loading...</p>
   }

   if (!userProfile) {
      return <div>user not found</div>
   }

   return (
      <div className={'flex w-full flex-col pt-[36px] pl-6'}>
         <ProfileHeaderPrivate userProfile={userProfile} />
         <ProfilePrivatePosts login={login} onOpenPost={openPostModal} />
         {isPostOpen && !isEditOpen && post && (
            <Post post={post} isFetchingPost={isFetching} onClose={closePostModal} />
         )}
         {isEditOpen && post && <EditPostModal post={post} onCloseAction={closeEditPostModal} />}
      </div>
   )
}
export default withPrivateRoute(ProfilePrivatePage)
