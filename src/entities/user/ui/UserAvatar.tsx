import React from 'react'
import Image, { ImageProps } from 'next/image'
import { cn } from '@/shared/lib'

type AvatarSize = 'S' | 'M' | 'L'

type Props = {
   size?: AvatarSize
} & Omit<ImageProps, 'width' | 'height'>

export const UserAvatar = ({ className, src, alt, size = 'S', ...rest }: Props) => {
   const avatarSize: Record<AvatarSize, number> = {
      S: 36,
      M: 64,
      L: 204,
   }
   const pixelSize = avatarSize[size]

   return (
      <Image
         className={cn('rounded-full object-cover', className)}
         src={src}
         alt={alt}
         width={pixelSize}
         height={pixelSize}
         {...rest}
      />
   )
}
