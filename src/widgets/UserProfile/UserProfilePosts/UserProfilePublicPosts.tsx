'use client'
import { GetUserPublicPostsResponse } from '@/features/posts/api'
import { PostsGrid } from '@/features/posts/ui/ProfilePosts'
import { LockBlock } from '@/features/posts/ui/ProfilePosts/LockBlock'

type Props = {
   data: GetUserPublicPostsResponse
}

export const UserProfilePublicPosts = ({ data }: Props) => {
   const posts =
      data?.map(post => ({
         postId: post.postId,
         firstFileUrl: post.files[0].url,
      })) ?? []

   return (
      <div className="mt-12">
         <PostsGrid posts={posts} />
         {data && data.length === 8 && <LockBlock />}
      </div>
   )
}
