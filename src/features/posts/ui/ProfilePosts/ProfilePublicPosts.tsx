import { useGetUserPublicPostsQuery } from '@/features/posts/api'
import { PostsGrid } from './PostsGrid'
import { LockBlock } from './LockBlock'

type Props = {
   login: string
   onOpenPost: (id: string) => void
}

export const ProfilePublicPosts = ({ login, onOpenPost }: Props) => {
   const { data } = useGetUserPublicPostsQuery(login)

   const posts =
      data?.map(post => ({
         postId: post.postId,
         firstFileUrl: post.files[0].url,
      })) ?? []

   return (
      <div className="mt-12">
         <PostsGrid posts={posts} onOpenPost={onOpenPost} />
         {data && data.length === 8 && <LockBlock />}
      </div>
   )
}
