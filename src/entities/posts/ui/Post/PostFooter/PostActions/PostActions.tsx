import { FavoriteOutlineIcon, LikeOutlineIcon, ShareIcon } from '@/shared/icons'

export const PostActions = () => {
   return (
      <div className={'flex gap-6'}>
         <LikeOutlineIcon />
         <ShareIcon />
         <FavoriteOutlineIcon className={'ml-auto'} />
      </div>
   )
}
