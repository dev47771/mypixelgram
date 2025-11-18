'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Slider } from '@/shared/components/Slider'

type Props = {
   images: string[]
   currentFilter: string
   onSlideChangeAction: (index: number) => void
}

export const PostCreatorSlider = ({ images, currentFilter, onSlideChangeAction }: Props) => {
   const [lastKnownSlide, setLastKnownSlide] = useState(0)

   return (
      <Slider
         images={images}
         className="h-[501px] w-[490px]"
         renderSlideAction={(src, isActive, currentSlide) => {
            if (lastKnownSlide !== currentSlide) {
               setLastKnownSlide(currentSlide)
               onSlideChangeAction(currentSlide)
            }

            return (
               <Image
                  src={src}
                  fill
                  alt={'slider_element'}
                  className={`object-contain ${isActive ? currentFilter : 'filter-none'}`}
               />
            )
         }}
      />
   )
}
