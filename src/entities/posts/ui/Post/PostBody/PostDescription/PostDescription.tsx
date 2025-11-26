import { Typography } from '@/shared/components/Typography'
import { Avatar } from '@/shared/components/Avatar'
import type { PostByIdType } from '@/features/posts/api'

type Props = {
   post: PostByIdType
}
export const PostDescription = ({ post }: Props) => {
   const { user, description } = post

   return (
      <div className={'mt-[15px] flex justify-between gap-3'}>
         <div className={'flex max-w-[393px] flex-1 items-start gap-3'}>
            <Avatar src={user.avatar} size={'sm'} />
            <div>
               <Typography variant={'captionBold'} className={'inline'}>
                  {user.login + ' '}
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
