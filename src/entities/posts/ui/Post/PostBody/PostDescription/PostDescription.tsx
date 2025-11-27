import { Typography } from '@/shared/components/Typography'
import { Avatar } from '@/shared/components/Avatar'
import type { UserType } from '@/entities/user'
import { useRelativeTime } from '@/shared/hooks'

type Props = {
   description: string
   user: UserType
   updatedAt: string
}
export const PostDescription = ({ user, description, updatedAt }: Props) => {
   const relativeTime = useRelativeTime(updatedAt)

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
                     {relativeTime}
                  </Typography>
               </div>
            </div>
         </div>
      </div>
   )
}
