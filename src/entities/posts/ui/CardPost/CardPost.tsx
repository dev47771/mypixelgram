'use client'

import { LastPostProps } from '@/shared/schema'
import { useEffect, useState } from 'react'
import { formatDistanceToNow } from 'date-fns'
import { PhotoSlider } from './PhotoSlider'
import { UserBlock } from './UserBlock'
import { DescriptionBlock } from './DescriptionBlock'

export const CardPost = ({ description, file, createdAt, user }: LastPostProps) => {
   const [relativeTime, setRelativeTime] = useState(
      formatDistanceToNow(new Date(createdAt), { addSuffix: true })
   )
   const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false)

   useEffect(() => {
      const interval = setInterval(() => {
         setRelativeTime(formatDistanceToNow(new Date(createdAt), { addSuffix: true }))
      }, 60_000)
      return () => clearInterval(interval)
   }, [createdAt])

   if (!description) description = ''
   const images = [file.url, file.url, file.url]

   return (
      <div className="h-[391px] w-[234px] overflow-hidden">
         {file?.url && <PhotoSlider images={images} expanded={isDescriptionExpanded} />}
         <UserBlock avatar={user.avatar} userName={user.userName} relativeTime={relativeTime} />
         <DescriptionBlock
            description={description}
            isExpanded={isDescriptionExpanded}
            onToggle={() => setIsDescriptionExpanded(prev => !prev)}
         />
      </div>
   )
}
