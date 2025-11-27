import Image from 'next/image'
import { Typography } from '@/shared/components/Typography'
import { LikeOutlineIcon } from '@/shared/icons'

type Props = {
   comment: any
}
export const Comment = ({ comment }: Props) => {
   const { userName, userAvatar, text, date, likes } = comment
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
                  {text}
               </Typography>
               <div className={'mt-[5px] flex gap-3'}>
                  <Typography variant={'smallRegular'} className={'text-light-900'}>
                     {date}
                  </Typography>
                  {likes && (
                     <Typography variant={'smallBold'} className={'text-light-900'}>
                        Like: {likes}
                     </Typography>
                  )}
                  <Typography variant={'smallBold'} className={'text-light-900'}>
                     Answer
                  </Typography>
               </div>
            </div>
         </div>

         <LikeOutlineIcon width={16} height={16} className={'mt-4'} />
      </div>
   )
}
