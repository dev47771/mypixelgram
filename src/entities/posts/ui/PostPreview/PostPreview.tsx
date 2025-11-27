import Image from 'next/image'
import { Publication } from '@/features/posts/api'

type Props = {
   onOpenPost: (postId: string) => void
} & Publication

export const PostPreview = ({ postId, firstFileUrl, onOpenPost }: Props) => {
   return (
      <div
         key={postId}
         onClick={() => onOpenPost(postId)}
         className="relative h-[228px] w-[234px] cursor-pointer"
      >
         <Image
            loading={'eager'}
            src={firstFileUrl}
            alt="post image"
            width={234}
            height={228}
            className="h-full w-full object-cover"
         />
      </div>
   )
}
