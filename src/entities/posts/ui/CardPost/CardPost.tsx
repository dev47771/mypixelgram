'use client'

import { useState } from 'react'
import { PhotoSlider } from './PhotoSlider'
import { UserBlock } from './UserBlock'
import { DescriptionBlock } from './DescriptionBlock'
import { LastPostProps } from '../schemas'
import { useGetPostByIdQuery } from '@/features/posts/api'
import { Post } from '@/entities/posts/ui/Post'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useCreateQueryString, useRelativeTime } from '@/shared/hooks'

export const CardPost = ({ description, file, createdAt, user, postId }: LastPostProps) => {
   //for relative time, update every 60 sec
   const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false)
   const relativeTime = useRelativeTime(createdAt)
   const { data: post } = useGetPostByIdQuery(postId)
   const router = useRouter()
   const pathname = usePathname()
   const searchParams = useSearchParams()
   const createQueryString = useCreateQueryString()
   const isPostOpen = searchParams.get('postId') === postId

   if (!post) return null

   if (!description) description = ''

   const images = file.map(img => img.url)

   const handleOpenPost = () => {
      router.push(pathname + '?' + createQueryString('postId', postId))
   }

   const handleClosePost = () => {
      const params = new URLSearchParams(searchParams.toString())
      params.delete('postId')
      router.push(pathname + '?' + params.toString())
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
         {isPostOpen && <Post post={post} onClose={handleClosePost} />}
      </div>
   )
}
