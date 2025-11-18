import { cn } from '@/shared/lib'
import { Thumb as SliderRadixThumb } from '@radix-ui/react-slider'
import { ComponentPropsWithRef } from 'react'

export const RangeControlThumb = ({
   className,
   ...rest
}: ComponentPropsWithRef<typeof SliderRadixThumb>) => {
   return (
      <SliderRadixThumb
         className={cn(
            'hover:bg-violet3 focus:shadow-accent-300 bg-light-100 ring-accent-500 block size-[6px] rounded-full ring-[3px] focus:outline-none',
            className
         )}
         {...rest}
      />
   )
}
