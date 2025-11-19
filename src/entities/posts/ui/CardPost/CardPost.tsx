'use client'

import { useEffect, useState } from 'react'
import { formatDistanceToNow } from 'date-fns'
import { PhotoSlider } from './PhotoSlider'
import { UserBlock } from './UserBlock'
import { DescriptionBlock } from './DescriptionBlock'
import { LastPostProps } from '../schemas'

export const CardPost = ({ description, file, createdAt, user }: LastPostProps) => {
   //for relative time, update every 60 sec
   const [relativeTime, setRelativeTime] = useState('')
   const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false)

   useEffect(() => {
      setRelativeTime(formatDistanceToNow(new Date(createdAt), { addSuffix: true }))

      const interval = setInterval(() => {
         setRelativeTime(formatDistanceToNow(new Date(createdAt), { addSuffix: true }))
      }, 60_000)

      return () => clearInterval(interval)
   }, [createdAt])

   if (!description) description = ''

   const images = file.map(img => img.url)

   return (
      <div className="h-[391px] w-[234px] overflow-hidden">
         {<PhotoSlider images={images} expanded={isDescriptionExpanded} />}
         <UserBlock avatar={user.avatar} userName={user.login} relativeTime={relativeTime} />
         <DescriptionBlock
            description={description}
            isExpanded={isDescriptionExpanded}
            onToggle={() => setIsDescriptionExpanded(prev => !prev)}
         />
      </div>
   )
}
