import { cn } from '@/shared/lib'
import { Range as SliderRadixRange } from '@radix-ui/react-slider'
import { ComponentPropsWithRef } from 'react'

export const RangeControlRange = ({
   className,
   ...rest
}: ComponentPropsWithRef<typeof SliderRadixRange>) => {
   return (
      <SliderRadixRange
         className={cn('bg-accent-500 absolute h-full rounded-full', className)}
         {...rest}
      />
   )
}
