'use client'

import { Card } from '@/shared/components/Card'
import { Slider } from '@/shared/components/Slider'
import { Typography } from '@/shared/components/Typography'
import { PostOutlineIcon } from '@/shared/icons'
import { cn } from '@/shared/lib'
import clsx from 'clsx'
import Image from 'next/image'
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

//const images = ['./public/404.jpg', './public/logo-light.png', './public/logo-dark.png']

export const CardPost = ({ description, file, createdAt, user }: PostProps) => {
   const createdAtPost = new Date(createdAt).toLocaleString('en-EN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
   })

   const [expanded, setExpanded] = useState(false)

   if (!description) description = ''

   // базовые лимиты
   const SHORT_LIMIT = 90
   const EXTENDED_LIMIT = 240

   const shouldTruncate = description.length > SHORT_LIMIT
   const visibleText = expanded
      ? description.slice(0, EXTENDED_LIMIT)
      : description.slice(0, SHORT_LIMIT)

   const showHideButton = shouldTruncate && description.length > SHORT_LIMIT

   const images = [file.url, file.url, file.url]
   //h-[391px]
   return (
      <Card withBaseStyles={false} className="h-[391px] w-[234px] overflow-hidden">
         {file?.url &&
            (expanded ? (
               //  <div className="relative h-[240px] w-[234px] overflow-hidden">
               //    <Image src={file.url} alt="post" fill sizes="234px" />
               //  </div>

               <div className="relative mb-3 h-[240px] w-[234px]">
                  <Image
                     src={file.url}
                     alt="post"
                     fill
                     sizes="234px"
                     style={{
                        clipPath: 'inset(0 0 120px 0)',
                     }}
                  />
               </div>
            ) : (
               <Slider images={images} className="mb-3 h-[240px] w-[234px]" />
            ))}

         <div
            className={cn(
               /*                'transition-all duration-300',
               expanded && 'translate-y-[-120px]' // ← transform вместо margin */
               expanded && 'mt-[-120px]'
            )}
         >
            <div className="mb-3 flex flex-col gap-2 text-sm text-white">
               <div className="flex items-center gap-3">
                  {user.avatar ? (
                     <Image
                        src={user.avatar}
                        alt={user.userName}
                        width={32}
                        height={32}
                        className="rounded-full object-cover"
                     />
                  ) : (
                     <div
                        className={
                           'bg-dark-100 flex h-[32px] w-[32px] items-center justify-center rounded-full'
                        }
                     >
                        <PostOutlineIcon width={20} height={20} />
                     </div>
                  )}
                  <Typography as="span" variant="h3">
                     {user.userName}
                  </Typography>
               </div>
               <Typography as="span" variant="smallRegular" className="text-light-900">
                  {createdAtPost}
               </Typography>
            </div>

            <div className="">
               <Typography as="p" variant="captionRegular" className="inline">
                  {visibleText}
                  {shouldTruncate && !expanded && description.length > SHORT_LIMIT && '...'}
               </Typography>

               {showHideButton && (
                  <button
                     type="button"
                     onClick={() => setExpanded(prev => !prev)}
                     //через cn почему-то неприменяется text-s
                     className={clsx(
                        'text-s text-misc-primary-500 leading-m font-regular ml-1',
                        'cursor-pointer underline hover:underline focus:outline-none'
                     )}
                  >
                     {expanded ? 'Hide' : 'Show more'}
                  </button>
               )}
            </div>
         </div>
      </Card>
   )
}
