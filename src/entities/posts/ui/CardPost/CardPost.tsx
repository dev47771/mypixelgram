'use client'

import { Avatar } from '@/shared/components/Avatar'
import { Slider } from '@/shared/components/Slider'
import { Typography } from '@/shared/components/Typography'
import { cn } from '@/shared/lib'
import { PostProps } from '@/shared/schema/postsSchema'
import clsx from 'clsx'
import { useState } from 'react'

export const CardPost = ({ description, file, createdAt, user }: PostProps) => {
   const createdAtPost = new Date(createdAt).toLocaleString('en-EN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
   })

   const SHORT_LIMIT = 90
   const EXTENDED_LIMIT = 270

   const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false)

   if (!description) description = ''

   const shouldTruncate = description.length > SHORT_LIMIT
   const visibleText = isDescriptionExpanded
      ? description.slice(0, EXTENDED_LIMIT)
      : description.slice(0, SHORT_LIMIT)

   const isToggleButtonVisible = shouldTruncate && description.length > SHORT_LIMIT

   const images = [file.url, file.url, file.url]

   return (
      <div className="h-[400px] w-[234px] overflow-hidden">
         {file?.url && (
            <div
               className={cn(
                  'mb-3 w-[234px] overflow-hidden transition-all duration-300',
                  isDescriptionExpanded ? 'h-[115px]' : 'h-[240px]'
               )}
            >
               <Slider
                  images={images}
                  disabled={isDescriptionExpanded}
                  className="h-[240px] w-[234px]"
               />
            </div>
         )}

         <div className="flex flex-col gap-2">
            <div className="flex items-center gap-3">
               <Avatar src={user.avatar} alt={user.userName} />
               <Typography as="span" variant="h3">
                  {user.userName}
               </Typography>
            </div>
            <Typography as="span" variant="smallRegular" className="text-light-900">
               {createdAtPost}
            </Typography>
         </div>

         <div>
            <Typography as="p" variant="captionRegular" className="inline">
               {visibleText}
               {shouldTruncate &&
                  !isDescriptionExpanded &&
                  description.length > SHORT_LIMIT &&
                  '...'}
               {shouldTruncate && isDescriptionExpanded && description.length > SHORT_LIMIT && '..'}
            </Typography>

            {isToggleButtonVisible && (
               <button
                  onClick={() => setIsDescriptionExpanded(prev => !prev)}
                  className={clsx(
                     'text-s text-accent-500 leading-m font-regular ml-1',
                     'cursor-pointer underline hover:underline'
                  )}
               >
                  {isDescriptionExpanded ? 'Hide' : 'Show more'}
               </button>
            )}
         </div>
      </div>
   )
}
