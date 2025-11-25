import { cn } from '@/shared/lib'
import { Track as SliderRadixTrack } from '@radix-ui/react-slider'
import { ComponentPropsWithRef, ReactNode } from 'react'

type Props = {
   children: ReactNode
} & ComponentPropsWithRef<typeof SliderRadixTrack>

export const RangeControlTrack = ({ children, className, ...rest }: Props) => {
   return (
      <SliderRadixTrack
         className={cn('bg-light-100 relative h-[2px] w-[100px] grow rounded-full', className)}
         {...rest}
      >
         {children}
      </SliderRadixTrack>
   )
}
