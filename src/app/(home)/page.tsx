import { CardPost } from '@/entities/posts/ui/CardPost'
import { lastPostsSchema } from '@/entities/posts/ui/schemas'
import ServerPageContainer from '@/shared/components/PageContainer/ServerPageContainer'
import { apiMap } from '@/shared/constants'

export const revalidate = 60

export default async function HomePage() {
   try {
      const res = await fetch(apiMap.lastPosts)
      const json = await res.json()
      const data = lastPostsSchema.parse(json)

      return (
         <ServerPageContainer>
            <div className="bg-dark-500 border-dark-300 mb-[36px] h-[72px] w-[972px] w-full border"></div>

            <div className="flex max-w-[972px] flex-wrap gap-3">
               {data.posts.map(post => {
                  return <CardPost key={post.postId} {...post} />
               })}
            </div>
         </ServerPageContainer>
      )
   } catch {
      return (
         <ServerPageContainer>
            <div className="bg-dark-500 border-dark-300 border p-4">
               Failed to load posts. Please try again later.
            </div>
         </ServerPageContainer>
      )
   }
}
