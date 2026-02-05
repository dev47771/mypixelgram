'use client'

import { useState } from 'react'
import { PhotoSlider } from './PhotoSlider'
import { UserBlock } from './UserBlock'
import { DescriptionBlock } from './DescriptionBlock'
import { LastPostProps } from '../../model/schemas'
import { usePathname, useRouter } from 'next/navigation'
import { useCreateQueryString, useRelativeTime } from '@/shared/hooks'

export const CardPost = ({ description, file, createdAt, user, postId }: LastPostProps) => {
   //for relative time, update every 60 sec
   const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false)
   const relativeTime = useRelativeTime(createdAt)
   const router = useRouter()
   const pathname = usePathname()
   const createQueryString = useCreateQueryString()

   if (!description) description = ''

   const images = file.map(img => img.url)

   const handleOpenPost = () => {
      router.push(pathname + '?' + createQueryString('postId', postId))
   }

   return (
      <div className="h-[410px] w-[234px] overflow-hidden">
         <PhotoSlider images={images} expanded={isDescriptionExpanded} onToggle={handleOpenPost} />
         <UserBlock avatar={user.avatar} userName={user.login} relativeTime={relativeTime} />
         <DescriptionBlock
            description={description}
            isExpanded={isDescriptionExpanded}
            onToggle={() => setIsDescriptionExpanded(prev => !prev)}
         />
      </div>
   )
}
