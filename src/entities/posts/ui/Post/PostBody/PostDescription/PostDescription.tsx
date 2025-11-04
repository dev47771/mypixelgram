import Image from 'next/image'
import { Typography } from '@/shared/components/Typography'
import type { Post as PostType } from '@/entities/posts/model'

type Props = {
   post: PostType
}
export const PostDescription = ({ post }: Props) => {
   const { userName, userAvatar, description } = post

   return (
      <div className={'mt-[15px] flex justify-between gap-3'}>
         <div className={'flex max-w-[393px] flex-1 items-start gap-3'}>
            <Image
               src={userAvatar}
               alt={'user avatar'}
               width={'36'}
               height={'36'}
               className={'rounded-[50%]'}
            />
            <div>
               <Typography variant={'captionBold'} className={'inline'}>
                  {userName + ' '}
               </Typography>
               <Typography variant={'captionRegular'} className={'inline'}>
                  {description}
               </Typography>
               <div className={'mt-[5px] flex gap-3'}>
                  <Typography variant={'smallRegular'} className={'text-light-900'}>
                     2 hours ago
                  </Typography>
               </div>
            </div>
         </div>
      </div>
   )
}
