import React from 'react'
import { cn } from '@/shared/lib'

type SlideMeta = {
   abs: number
   distance: number
   portion: number
   size: number
}

type Props = {
   slides: SlideMeta[]
   currentSlide: number
   onDotClick: (idx: number) => void
   withBackground?: boolean
   className?: string
}

export const SliderDots = ({
   slides,
   currentSlide,
   onDotClick,
   withBackground = true,
   className,
}: Props) => {
   return (
      <div className={'absolute bottom-3 left-[50%] flex -translate-x-1/2 justify-center'}>
         <div
            className={cn(
               'align-center flex justify-center gap-3 rounded-xs p-2',
               withBackground && 'bg-dark-300/50',
               className
            )}
         >
            {slides.map((_item, idx) => {
               return (
                  <button
                     key={idx}
                     type="button"
                     onClick={e => {
                        e.stopPropagation()
                        onDotClick(idx)
                     }}
                     className={cn(
                        'bg-light-100 h-[8px] w-[8px] cursor-pointer rounded-[50%] border-0',
                        currentSlide === idx && 'bg-accent-500'
                     )}
                  ></button>
               )
            })}
         </div>
      </div>
   )
}
