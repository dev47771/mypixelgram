import { notFound } from 'next/navigation'
import { UserProfilePrivatePosts } from '@/widgets/UserProfile/UserProfilePosts'
import { UserProfileHeader } from '@/widgets/UserProfile/UserProfileHeader'
import { API_URLS } from '@/shared/constants'
import { serverResponseHandler } from '@/shared/utils'
import { privatePostsSchema } from '@/entities/post'
import { userProfileSchema } from '@/entities/user'
import { headers } from 'next/headers'
import { SaveAccessToken } from '@/shared/lib'

type Props = {
   params: Promise<{
      login: string
   }>
}

export default async function ProfilePrivatePage({ params }: Props) {
   const headersList = await headers()
   const accessToken = headersList.get('x-access-token')

   if (!accessToken) {
      return <div>Ошибка: нет access token</div>
   }

   const { login } = await params

   const [userProfile, privatePosts] = await Promise.allSettled([
      fetch(API_URLS.userProfile(login)).then(res => {
         if (!res.ok) throw new Error(`Users HTTP error: ${res.status}`)
         return res.json()
      }),
      fetch(API_URLS.userPrivatePosts(login), {
         headers: { Authorization: `Bearer ${accessToken}` },
      }).then(res => {
         if (!res.ok) throw new Error(`Posts HTTP error: ${res.status}`)
         return res.json()
      }),
   ])

   const privatePostsResp = serverResponseHandler(privatePosts, privatePostsSchema)
   const userProfileResp = serverResponseHandler(userProfile, userProfileSchema)

   if (userProfileResp.status !== 'success' || !userProfileResp.data) {
      return notFound()
   }

   const userProfileContent = userProfileResp.data

   const privatePostContent =
      privatePostsResp.status === 'success'
         ? privatePostsResp.data
         : { publications: [], pageInfo: { nextCursor: null, hasMore: false } }

   return (
      <div className={'flex w-full flex-col pt-[36px] pl-6'}>
         <SaveAccessToken accessToken={accessToken} />
         <UserProfileHeader userProfile={userProfileContent} />
         <UserProfilePrivatePosts postsResponse={privatePostContent} login={login} />
      </div>
   )
}
