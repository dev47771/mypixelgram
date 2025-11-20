import React from 'react'
import Image, { ImageProps } from 'next/image'
import { cn } from '@/shared/lib'
import { AvatarSize, avatarSizeMap } from '@/entities/user/ui/UserAvatar/avatar.types'

type Props = {
   size?: AvatarSize
} & Omit<ImageProps, 'width' | 'height'>

export const UserAvatar = ({ className, src, alt, size = 'S', ...rest }: Props) => {
   const pixelSize = avatarSizeMap[size]

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
