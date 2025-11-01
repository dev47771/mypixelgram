import { Typography } from '@/shared/components/Typography'
import { Button } from '@/shared/components/Button'

export const PostAddComment = () => {
   return (
      <div className={'flex h-[59px] flex-shrink-0 items-center justify-between px-6'}>
         <Typography variant={'captionRegular'} className={'text-light-900'}>
            Add a Comment...
         </Typography>
         <Button variant={'textButton'}>
            <Typography variant={'h3'}>Publish</Typography>
         </Button>
      </div>
   )
}
