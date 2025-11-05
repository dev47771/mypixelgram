import ServerPageContainer from '@/shared/components/PageContainer/ServerPageContainer'
import Image from 'next/image'

export const revalidateTime = 60

//const images = ['./public/404.jpg', './public/logo-light.png', './public/logo-dark.png']

type Post = {
   postId: string
   description: string
   location: string
   file: { url: string }
   createdAt: string
   user: {
      userId: string
      userName: string
      avatar: string | null
   }
}

export default async function Home() {
   const res = await fetch('https://mypixelgram.ru/api/v1/public/posts/last-posts', {
      next: { revalidate: revalidateTime },
   })

   const data: { posts: Post[] } = await res.json()

   return (
      <ServerPageContainer>
         <div className="flex flex-wrap gap-4">
            {data.posts.map(post => {
               const createdAt = new Date(post.createdAt).toLocaleString('ru-RU', {
                  day: '2-digit',
                  month: 'short',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
               })

               return (
                  <div
                     key={post.postId}
                     className="bg-dark-500 border-dark-300 h-[391px] w-[234px] overflow-hidden border"
                  >
                     {/* Пост-картинка */}
                     {post.file?.url && (
                        <div className="relative h-[240px] w-[234px]">
                           <Image
                              src={post.file.url}
                              alt="post"
                              className="object-cover"
                              sizes="234px"
                              fill
                           />
                        </div>
                        //<Slider images={images} className={'h-[240px] w-[234px]'} />
                     )}

                     {/* Информация о пользователе */}
                     <div className="flex items-center gap-2 p-2 text-sm text-white">
                        {post.user.avatar && (
                           <Image
                              src={post.user.avatar}
                              alt={post.user.userName}
                              width={32}
                              height={32}
                              className="rounded-full object-cover"
                           />
                        )}
                        <div className="flex flex-col">
                           <span className="font-medium">{post.user.userName}</span>
                           <span className="text-xs text-gray-400">{createdAt}</span>
                        </div>
                     </div>

                     {/* Описание поста */}
                     <div className="p-2 text-sm text-gray-400">
                        <p>{post.description}</p>
                        {post.location && <p className="text-xs text-gray-500">{post.location}</p>}
                     </div>
                  </div>
               )
            })}
         </div>
      </ServerPageContainer>
   )
}

/* import ServerPageContainer from "@/shared/components/PageContainer/ServerPageContainer"

type CardProps = {
   children?: React.ReactNode
}



export const revalidate = 60

export default async function Home() {
  const res = await fetch('https://mypixelgram.ru/api/v1/public/posts/last-posts', {
    next: { revalidate: 60 },
  })
  const data = await res.json()

  return (
    <ServerPageContainer>
      <div className="bg-dark-500 border-dark-300 mb-[36px] h-[72px] w-[972px] border" />
      <div className="flex flex-wrap gap-4">
        {data.posts.map((post: any) => (
          <Card key={post.postId} post={post} />
        ))}
      </div>
    </ServerPageContainer>
  )
}

const Card = ({ children }: CardProps) => {
   return <div className="bg-dark-500 border-dark-300 h-[391px] w-[234px] border">{children}</div>
} */

/* import { PageContainer } from '@/shared/components/PageContainer'

const arr = ['1', '2', '3', '4']

type CardProps = {
   children?: React.ReactNode
}

export default function Home() {
   return (
      <PageContainer>
         <div className="bg-dark-500 border-dark-300 mb-[36px] h-[72px] w-[972px] border"></div>
         <div className="flex flex-row gap-4">
            {arr.map((el, index) => (
               <Card key={index}>{el}</Card>
            ))}
         </div>
      </PageContainer>
   )
}

const Card = ({ children }: CardProps) => {
   return <div className="bg-dark-500 border-dark-300 h-[391px] w-[234px] border">{children}</div>
}
 */
