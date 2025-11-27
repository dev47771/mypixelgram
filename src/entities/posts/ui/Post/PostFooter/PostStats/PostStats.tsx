import { Typography } from '@/shared/components/Typography'
import { Avatar } from '@/shared/components/Avatar'

type Props = {
   userAvatar: string | null
   likesCount: number
   dateCreated: string
}

export const PostStats = ({ userAvatar, dateCreated, likesCount }: Props) => {
   return (
      <>
         <div className={'ga mt-5 flex items-center'}>
            <Avatar src={userAvatar} size={'sm'} />
            <Typography variant={'captionRegular'} className={'ml-3'}>
               {likesCount}
            </Typography>
            <Typography variant={'captionBold'}>&#34;Like&#34;</Typography>
         </div>
         <Typography variant={'smallRegular'} className={'text-light-900'}>
            {dateCreated}
         </Typography>
      </>
   )
}
