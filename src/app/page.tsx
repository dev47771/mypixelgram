import { CardPost, PostProps } from '@/entities/posts/ui/CardPost'
import ServerPageContainer from '@/shared/components/PageContainer/ServerPageContainer'
import { apiMap } from '@/shared/constants'

const revalidateTime = 60

export default async function Home() {
   const res = await fetch(apiMap.lastPosts, {
      next: { revalidate: revalidateTime },
   })

   const data: { posts: PostProps[] } = await res.json()

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
}
