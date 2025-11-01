import React from 'react'
import Image from 'next/image'
import { cn } from '@/shared/lib'

type Props = {
   src: string
   size?: number
   className?: string
}

export const UserAvatar = ({ className, src, size = 36 }: Props) => {
   return (
      <Image
         className={cn('rounded-full object-cover', className)}
         src={src}
         alt={'User avatar'}
         width={size}
         height={size}
      />
   )
}
