'use client'
import { PostPreview } from '@/entities/posts/ui/PostPreview'
import {Publication} from "@/features/posts/api";

type Props = {
   posts: Publication[]
   onOpenPost: (id: string) => void
}

export const PostsGrid = ({ posts, onOpenPost }: Props) => {
   return (
      <div className="grid grid-cols-[repeat(auto-fill,230px)] gap-4">
         {posts.map(post => (
            <PostPreview
               key={post.postId}
               postId={post.postId}
               firstFileUrl={post.firstFileUrl}
               onOpenPost={onOpenPost}
            />
         ))}
      </div>
   )
}
