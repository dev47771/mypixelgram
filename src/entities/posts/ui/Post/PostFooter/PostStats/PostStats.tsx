import Image from 'next/image'
import { Typography } from '@/shared/components/Typography'

type Props = {
   userAvatar: string
}

export const PostStats = ({ userAvatar }: Props) => {
   return (
      <>
         <div className={'mt-5 flex'}>
            <Image
               src={userAvatar}
               alt={'user avatar'}
               width={'24'}
               height={'24'}
               className={'mr-3 rounded-[50%]'}
            />
            <Typography variant={'captionRegular'}>2 243</Typography>
            <Typography variant={'captionBold'}>&#34;Like&#34;</Typography>
         </div>
         <Typography variant={'smallRegular'} className={'text-light-900'}>
            July 3, 2021
         </Typography>
      </>
   )
}
