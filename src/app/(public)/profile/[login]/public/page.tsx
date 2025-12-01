import { UserProfileHeader} from '@/widgets/UserProfile/UserProfileHeader'

import {UserProfilePublicPosts} from '@/widgets/UserProfile/UserProfilePosts'
import {apiUrls} from "@/shared/constants";
import {serverResponseHandler} from "@/shared/utils";
import {publicPostsSchema} from "@/entities/posts/ui/schemas";
import {userProfileSchema} from "@/entities/user/model";
import {notFound} from "next/navigation";

type Props = {
    params: Promise<{
        login: string
    }>
}


export default async function ProfilePublicPage({params}: Props) {
    const {login} = await params

    const [userProfile, publicPosts] = await Promise.allSettled([
        fetch(apiUrls.userProfile(login)).then(res => res.json()),
        fetch(apiUrls.userPublicPosts(login)).then(res => res.json())
    ])

    const publicPostsResp = serverResponseHandler(publicPosts, publicPostsSchema)
    const userProfileResp = serverResponseHandler(userProfile, userProfileSchema)

    if (userProfileResp.status !== 'success' || !userProfileResp.data) {
        return notFound()
    }

    const userProfileContent = userProfileResp.data
    const publicPostContent = publicPostsResp.status === 'success'
        ? publicPostsResp.data
        : []

   return (
      <div className={'flex w-full flex-col pt-[36px] pb-6 pl-6'}>
         <UserProfileHeader
             userProfile={userProfileContent}

         />
         <UserProfilePublicPosts data={publicPostContent}/>
      </div>
   )
}
