import React from 'react'
import Image, { ImageProps } from 'next/image'
import { cn } from '@/shared/lib'

type Props = {
   size?: number
} & Omit<ImageProps, 'width' | 'height'>

export const UserAvatar = ({ className, src, alt, size = 36, ...rest }: Props) => {
   return (
      <Image
         className={cn('rounded-full object-cover', className)}
         src={src}
         alt={alt}
         width={size}
         height={size}
         {...rest}
      />
   )
}
