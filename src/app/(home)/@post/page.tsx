import { apiUrls } from '@/shared/constants'
import PostClientWrapper from '@/app/(home)/@post/PostClientWrapper'
import type { PostByIdType } from '@/features/posts/api'
import PostNotFound from '@/app/(home)/@post/PostNotFound'

type Props = {
   searchParams: Promise<{ [key: string]: string }>
}
export default async function PostPage({ searchParams }: Props) {
   const { postId } = await searchParams

   if (!postId) return null

   const postResponse = await fetch(apiUrls.getPostById(postId))

   if (!postResponse.ok) {
      if (postResponse.status === 404) return <PostNotFound />
      throw new Error(`Failed to fetch post: ${postResponse.status}`)
   }

   const post: PostByIdType = await postResponse.json()

   if (!post) {
      return <PostNotFound />
   }

   return <PostClientWrapper post={post} />
}
