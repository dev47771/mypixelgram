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
         <div className="flex flex-wrap gap-4">
            {data.posts.map(post => {
               return <CardPost key={post.postId} {...post} />
            })}
         </div>
      </ServerPageContainer>
   )
}
