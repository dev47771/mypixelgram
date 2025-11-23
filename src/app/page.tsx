import { CardPost } from '@/entities/posts/ui/CardPost'
import { type LastPostProps, lastPostsSchema } from '@/entities/posts/ui/schemas'
import ServerPageContainer from '@/shared/components/PageContainer/ServerPageContainer'
import { apiMap } from '@/shared/constants'
import { UserCounter } from '@/widgets/UserCounter'

export const revalidate = 60

export default async function HomePage() {
   const [postsRes, usersRes] = await Promise.allSettled([
      fetch(apiMap.lastPosts).then(res => res.json()),
      fetch(apiMap.usersTotalCount).then(res => res.json()),
   ])

   let totalUsersCount = 0
   let postsData: LastPostProps[] = []
   let parseError = false

   if (usersRes.status === 'fulfilled') {
      totalUsersCount = usersRes.value.totalCount ?? 0
   }

   if (postsRes.status === 'fulfilled') {
      const parsed = lastPostsSchema.safeParse(postsRes.value)
      if (parsed.success) {
         postsData = parsed.data
      } else {
         parseError = true
      }
   }

   return (
      <ServerPageContainer>
         <UserCounter totalCount={totalUsersCount} />
         {postsData.length > 0 ? (
            <div className="flex max-w-[972px] flex-wrap gap-3">
               {postsData.map(post => (
                  <CardPost key={post.postId} {...post} />
               ))}
            </div>
         ) : (
            <div className="bg-dark-500 border-dark-300 border p-4">
               {postsRes.status === 'rejected' || parseError
                  ? 'Failed to load posts. Please try again later.'
                  : 'No posts available'}
            </div>
         )}
      </ServerPageContainer>
   )
}
