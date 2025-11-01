import Image from 'next/image'
import { Typography } from '@/shared/components/Typography'
import { PostMenu } from '@/entities/posts/ui/Post/PostHeader/PostMenu'

type Props = {
   post: any
}

export const PostHeader = ({ post }: Props) => {
   return (
      <div className={'border-dark-100 flex items-center gap-3 border-b px-6 py-[11px]'}>
         <Image
            src={post.userAvatar}
            alt={'user avatar'}
            width={'36'}
            height={'36'}
            className={'rounded-[50%]'}
         />
         <Typography variant={'h3'}>{post.userName}</Typography>
         <PostMenu isOwner />
      </div>
   )
}
