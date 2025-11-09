import { PostOutlineIcon } from '@/shared/icons'
import Image from 'next/image'

type Props = {
   src?: string | null
   alt?: string
   size?: number
}

export const Avatar = ({ src, alt = 'Avatar', size = 36 }: Props) => {
   if (src) {
      return (
         <Image
            src={src}
            alt={alt}
            width={size}
            height={size}
            className="rounded-full object-cover"
         />
      )
   }

   return (
      <div
         className="bg-dark-100 flex items-center justify-center rounded-full"
         style={{ width: size, height: size }}
      >
         <PostOutlineIcon width={size * 0.625} height={size * 0.625} />
      </div>
   )
}
