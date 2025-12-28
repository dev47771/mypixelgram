import { PostOutlineIcon } from '@/shared/icons'
import { cn } from '@/shared/lib'
import Image from 'next/image'

type AvatarSize = 'sm' | 'md' | 'lg' | 'profile'

type Props = {
   src?: string | null
   alt?: string
   size?: AvatarSize
}

const variantSize: Record<AvatarSize, { px: number; class: string }> = {
   sm: { px: 36, class: 'w-[36px] h-[36px]' },
   md: { px: 54, class: 'w-[54px] h-[54px]' },
   lg: { px: 204, class: 'w-[204px] h-[204px]' },
   profile: { px: 192, class: 'w-[192px] h-[192px]' },
}

export const Avatar = ({ src, alt = 'Avatar', size = 'sm' }: Props) => {
   const { px: pixelSize, class: sizeClasses } = variantSize[size]

   if (src) {
      return (
         <Image
            src={src}
            alt={alt}
            width={pixelSize}
            height={pixelSize}
            className="rounded-full object-cover"
         />
      )
   }

   return (
      <div className={cn('bg-dark-100 flex items-center justify-center rounded-full', sizeClasses)}>
         <PostOutlineIcon width={pixelSize * 0.625} height={pixelSize * 0.625} />
      </div>
   )
}
