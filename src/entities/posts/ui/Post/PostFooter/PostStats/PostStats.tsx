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
         <div className={'mt-5 flex'}>
            <Avatar src={userAvatar} size={'sm'} />
            <Typography variant={'captionRegular'}>{likesCount}</Typography>
            <Typography variant={'captionBold'}>&#34;Like&#34;</Typography>
         </div>
         <Typography variant={'smallRegular'} className={'text-light-900'}>
            {dateCreated}
         </Typography>
      </>
   )
}
