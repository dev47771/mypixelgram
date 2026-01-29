'use client'
import { FavoriteOutlineIcon, LikeOutlineIcon, ShareIcon } from '@/shared/icons'
import { useMeQuery } from '@/features/auth/api'

export const PostActions = () => {
   const { data: me } = useMeQuery()

   if (!me) return null

   return (
      <div className={'flex gap-6'}>
         <LikeOutlineIcon />
         <ShareIcon />
         <FavoriteOutlineIcon className={'ml-auto'} />
      </div>
   )
}
