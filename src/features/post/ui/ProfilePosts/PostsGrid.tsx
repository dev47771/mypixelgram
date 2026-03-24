'use client'

import { Publication } from '@/features/post/api'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useCreateQueryString } from '@/shared/hooks'

type Props = {
   posts: Publication[]
}

export const PostsGrid = ({ posts }: Props) => {
   const pathname = usePathname()

   const queryString = useCreateQueryString()

   function getQuery(postId: string) {
      return pathname + '?' + queryString('postId', postId)
   }

   return (
      <div className="grid grid-cols-[repeat(auto-fill,230px)] gap-4">
         {posts.map(({ postId, firstFileUrl }) => (
            <Link
               key={postId}
               href={getQuery(postId)}
               className="relative h-[228px] w-[234px] cursor-pointer"
            >
               <Image
                  loading={'eager'}
                  src={firstFileUrl ?? ''}
                  alt="post image"
                  width={234}
                  height={228}
                  className="h-full w-full object-cover"
               />
            </Link>
         ))}
      </div>
   )
}
