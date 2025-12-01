import {notFound} from 'next/navigation'
import {UserProfilePrivatePosts} from '@/widgets/UserProfile/UserProfilePosts'
import {UserProfileHeader} from "@/widgets/UserProfile/UserProfileHeader";
import {apiUrls} from "@/shared/constants";
import {serverResponseHandler} from "@/shared/utils";
import {privatePostsSchema, publicPostsSchema} from "@/entities/posts/ui/schemas";
import {userProfileSchema} from "@/entities/user/model";

type Props = {
   params: Promise<{
      login: string
   }>
}

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

// let postContent = null
// if (isPostOpen) {
//    if (isLoadingPost) postContent = <Loader />
//    else if (post) postContent = <Post post={post} onClose={closePostHandler} />
//    else return notFound()
// }

// const { data: post, isLoading: isLoadingPost } = useGetPostByIdQuery(postId!, { skip: !postId })

export default async function  ProfilePrivatePage({params}: Props) {
   const {login} = await params
   const [userProfile, privatePosts] = await Promise.allSettled([
      fetch(apiUrls.userProfile(login)).then(res => {
           if (!res.ok) throw new Error(`Users HTTP error: ${res.status}`)
           return res.json()
       }),
      fetch(apiUrls.userPrivatePosts(login)).then(res => {
          if (!res.ok) throw new Error(`Posts HTTP error: ${res.status}`)
          return res.json()
      })
   ])



   const privatePostsResp = serverResponseHandler(privatePosts, privatePostsSchema)
   const userProfileResp = serverResponseHandler(userProfile, userProfileSchema)

   if (userProfileResp.status !== 'success' || !userProfileResp.data) {
      return notFound()
   }

   const userProfileContent = userProfileResp.data

    const privatePostContent = privatePostsResp.status === 'success'
        ? privatePostsResp.data
        : { publications: [], pageInfo: { nextCursor: null, hasMore: false } };
    return (
      <div className={'flex w-full flex-col pt-[36px] pl-6'}>
         <UserProfileHeader userProfile={userProfileContent}/>
         <UserProfilePrivatePosts   postsResponse={privatePostContent}/>
      </div>
   )
}
