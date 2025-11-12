import { cn } from '@/shared/lib'
import { Root as SliderRadixRoot } from '@radix-ui/react-slider'
import { ComponentPropsWithRef, ReactNode } from 'react'

type Props = {
   children: ReactNode
} & ComponentPropsWithRef<typeof SliderRadixRoot>

export const RangeControlRoot = ({
   className,
   defaultValue = [50],
   value,
   min = 0,
   max = 100,
   children,
   ...rest
}: Props) => {
   return (
      <SliderRadixRoot
         className={cn(
            'relative flex h-[2px] w-full touch-none items-center select-none',
            className
         )}
         value={value}
         defaultValue={defaultValue}
         min={min}
         max={max}
         {...rest}
      >
         {children}
      </SliderRadixRoot>
   )
}
