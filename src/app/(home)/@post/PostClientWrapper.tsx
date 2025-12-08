'use client'
import type { PostByIdType } from '@/features/posts/api'
import { Post } from '@/entities/posts/ui/Post'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

export default function PostClientWrapper({ post }: { post: PostByIdType }) {
   const router = useRouter()
   const searchParams = useSearchParams()
   const pathname = usePathname()

   const handleClosePost = () => {
      const params = new URLSearchParams(searchParams.toString())
      params.delete('postId')
      router.push(pathname + '?' + params.toString())
   }

   return <Post post={post} onClose={handleClosePost} />
}
