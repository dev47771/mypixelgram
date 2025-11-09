'use client'

import { Avatar } from '@/shared/components/Avatar'
import { Card } from '@/shared/components/Card'
import { Slider } from '@/shared/components/Slider'
import { Typography } from '@/shared/components/Typography'
import { cn } from '@/shared/lib'
import clsx from 'clsx'
import { useState } from 'react'

export type PostProps = {
   postId: string
   description: string | null
   location: string | null
   file: { url: string }
   createdAt: string
   user: {
      userId: string
      userName: string
      avatar: string | null
   }
}

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

   const [expanded, setExpanded] = useState(false)

   if (!description) description = ''

   const shouldTruncate = description.length > SHORT_LIMIT
   const visibleText = expanded
      ? description.slice(0, EXTENDED_LIMIT)
      : description.slice(0, SHORT_LIMIT)

   const showHideButton = shouldTruncate && description.length > SHORT_LIMIT

   const images = [file.url, file.url, file.url]

   return (
      <Card withBaseStyles={false} className="h-[400px] w-[234px] overflow-hidden">
         {file?.url && (
            <div
               className={cn(
                  'mb-3 w-[234px] overflow-hidden transition-all duration-300',
                  expanded ? 'h-[111px]' : 'h-[240px]'
               )}
            >
               <Slider images={images} disabled={expanded} className="h-[240px] w-[234px]" />
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
               {shouldTruncate && !expanded && description.length > SHORT_LIMIT && '...'}
               {shouldTruncate && expanded && description.length > SHORT_LIMIT && '..'}
            </Typography>

            {showHideButton && (
               <button
                  type="button"
                  onClick={() => setExpanded(prev => !prev)}
                  className={clsx(
                     'text-s text-misc-primary-500 leading-m font-regular ml-1',
                     'cursor-pointer underline hover:underline'
                  )}
               >
                  {expanded ? 'Hide' : 'Show more'}
               </button>
            )}
         </div>
      </Card>
   )
}
