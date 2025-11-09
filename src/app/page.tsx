import { CardPost } from '@/entities/posts/ui/CardPost'
import ServerPageContainer from '@/shared/components/PageContainer/ServerPageContainer'
import { apiMap } from '@/shared/constants'
import { postsSchema } from '@/shared/schema/postsSchema'

export const revalidateTime = 60

export default async function Home() {
   try {
      const res = await fetch(apiMap.lastPosts)
      const json = await res.json()
      const data = postsSchema.parse(json)

      return (
         <ServerPageContainer>
            <div className="bg-dark-500 border-dark-300 mb-[36px] h-[72px] w-[972px] border"></div>

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
