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
}

export const Dots = ({ slides, currentSlide, onDotClick }: Props) => {
   return (
      <div className={'absolute bottom-3 left-[50%] flex -translate-x-1/2 justify-center'}>
         <div className="bg-dark-300/50 align-center flex justify-center gap-3 rounded-xs p-2">
            {slides.map((_item, idx) => {
               return (
                  <button
                     key={idx}
                     onClick={() => {
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
