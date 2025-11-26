import Image from 'next/image'
import { useGetUserPublicPostsQuery } from '@/features/posts/api'

type Props = {
   login: string
}

export const ProfilePosts = ({ login }: Props) => {
   const { data: publicPosts } = useGetUserPublicPostsQuery(login)

   return (
      <div className={'grid grid-cols-[repeat(auto-fill,230px)] gap-4'}>
         {publicPosts?.map(post => (
            <div className={'m-h-[228px] m-w-[234px] relative h-full w-full'} key={post.postId}>
               {post.files.map(file => (
                  <Image
                     key={file.fileId}
                     src={file.url}
                     alt={'post image'}
                     width={234}
                     height={228}
                     className="h-full w-full object-cover"
                  />
               ))}
            </div>
         ))}
      </div>
   )
}
