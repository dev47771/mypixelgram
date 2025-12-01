'use client'

import {withPrivateRoute} from '@/shared/HOC'
import {usePostModalHandler} from '@/shared/hooks'
import {useGetPostByIdQuery} from '@/features/posts/api'
import {Post} from '@/entities/posts/ui/Post'
import {Loader} from '@/shared/components/Loader'
import {notFound, useParams} from 'next/navigation'
import {UserProfilePrivatePosts} from '@/widgets/UserProfile/UserProfilePosts'

//   <UserProfileHeader
//             userProfile={userProfile}
//             actions={
//                <Button variant="secondary" asChild>
//                   <Link href="#">Profile Settings</Link>
//                </Button>
//             }
//          />

//  <div className="flex items-center gap-3">
//                    <Button>Follow</Button>
//                    <Button variant="secondary">Send Message</Button>
//                 </div>

function ProfilePrivatePage() {
   const { login } = useParams<{ login: string }>()
   // const { data: userProfile, isLoading } = useGetUserByLoginQuery(login)
   const { postId, isPostOpen, openPostHandler, closePostHandler } = usePostModalHandler()
   const { data: post, isLoading: isLoadingPost } = useGetPostByIdQuery(postId!, { skip: !postId })

   // if (isLoading) {
   //    return <p>loading...</p>
   // }

   // if (!userProfile) {
   //    return <div>user not found</div>
   // }

   let postContent = null
   if (isPostOpen) {
      if (isLoadingPost) postContent = <Loader />
      else if (post) postContent = <Post post={post} onClose={closePostHandler} />
      else return notFound()
   }

   return (
      <div className={'flex w-full flex-col pt-[36px] pl-6'}>

         <UserProfilePrivatePosts login={login} onOpenPost={openPostHandler} />
         {postContent}
      </div>
   )
}
export default withPrivateRoute(ProfilePrivatePage)
