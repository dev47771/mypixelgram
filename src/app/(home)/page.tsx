import { CardPost } from '@/entities/post/ui/CardPost'
import { type LastPostProps, lastPostsSchema } from '@/entities/post'
import ServerPageContainer from '@/shared/components/PageContainer/ServerPageContainer'
import { API_URLS } from '@/shared/constants'
import { UserCounter } from '@/widgets/UserCounter'
import { Suspense } from 'react'

export const revalidate = 60

export default async function HomePage() {
   const [postsRes, usersRes] = await Promise.allSettled([
      fetch(API_URLS.lastPosts).then(res => {
         if (!res.ok) throw new Error(`Posts HTTP error: ${res.status}`)
         return res.json()
      }),
      fetch(API_URLS.usersTotalCount).then(res => {
         if (!res.ok) throw new Error(`Users HTTP error: ${res.status}`)
         return res.json()
      }),
   ])

   let totalUsersCount: number | null = null
   let postsData: LastPostProps[] = []
   let parseError = false
   let fetchError = false

   if (usersRes.status === 'fulfilled') {
      totalUsersCount = usersRes.value.totalCount ?? null
   } else {
      console.error(usersRes.reason)
   }

   if (postsRes.status === 'fulfilled') {
      const parsed = lastPostsSchema.safeParse(postsRes.value)
      if (parsed.success) {
         postsData = parsed.data
      } else {
         parseError = true
         console.error('Posts parsing error', parsed.error)
      }
   } else {
      fetchError = true
      console.error('Posts fetch failed', postsRes.reason)
   }

   return (
      <ServerPageContainer>
         <UserCounter totalCount={totalUsersCount} />
         {postsData.length > 0 ? (
            <div className="flex max-w-[972px] flex-wrap gap-3">
               {postsData.map(post => (
                  //<CardPost key={post.postId} {...post} />
                  <Suspense
                     key={post.postId}
                     fallback={<div className="bg-dark-300 h-[391px] w-[234px] animate-pulse" />}
                  >
                     <CardPost {...post} />
                  </Suspense>
               ))}
            </div>
         ) : (
            <div className="bg-dark-500 border-dark-300 border p-4">
               {parseError || fetchError
                  ? 'Failed to load posts. Please try again later.'
                  : 'No posts available'}
            </div>
         )}
      </ServerPageContainer>
   )
}
