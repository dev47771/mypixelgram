'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Slider } from '@/shared/components/Slider'

type Props = {
   images: string[]
   currentFilter: string
   onSlideChange: (index: number) => void
}

export const PostCreatorSlider = ({ images, currentFilter, onSlideChange }: Props) => {
   const [lastKnownSlide, setLastKnownSlide] = useState(0)

   return (
      <Slider
         images={images}
         className="h-[501px] w-[490px]"
         renderSlide={(src, isActive, currentSlide) => {
            if (lastKnownSlide !== currentSlide) {
               setLastKnownSlide(currentSlide)
               onSlideChange(currentSlide)
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
