import { apiUrls } from '@/shared/constants'
import type { PostByIdType } from '@/features/post/api'
import { PostClientWrapper } from '@/entities/post/ui/Post'
import { PostNotFound } from './PostNotFound'

export async function PostPageWrapper({ postId }: { postId: string }) {
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
