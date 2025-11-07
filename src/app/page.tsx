import { CardPost, PostProps } from '@/entities/posts/ui/CardPost'
import ServerPageContainer from '@/shared/components/PageContainer/ServerPageContainer'

export const revalidateTime = 60

//const images = ['./public/404.jpg', './public/logo-light.png', './public/logo-dark.png']

export default async function Home() {
   const res = await fetch('https://mypixelgram.ru/api/v1/public/posts/last-posts', {
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
