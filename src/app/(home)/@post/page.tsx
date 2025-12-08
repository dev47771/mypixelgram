import { Post } from '@/entities/posts/ui/Post'
import { apiUrls } from '@/shared/constants'

type Props = {
   searchParams: Promise<{ [key: string]: string }>
}
export default async function PostPage({ searchParams }: Props) {
   const searchParamsRes = await searchParams
   const postId = searchParamsRes.postId

   if (!postId) return null

   const res = await fetch(apiUrls.getPostById(searchParamsRes.postId))

   if (!res.ok) {
      return <div>Post not found</div>
   }

   const post = await res.json()
   //console.log('SSR fetched post:', post)

   return <Post post={post} />

   //в PostClientWrapper работает закрытие модалки
   //return <PostClientWrapper post={post} />
}
