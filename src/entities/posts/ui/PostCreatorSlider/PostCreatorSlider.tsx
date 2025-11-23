'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Slider } from '@/shared/components/Slider'

type Props = {
   images: string[]
   currentFilter: string
   onSlideChangeAction: (index: number) => void
   resetOnMount?: boolean
}

export const PostCreatorSlider = ({
   images,
   currentFilter,
   onSlideChangeAction,
   resetOnMount,
}: Props) => {
   const [lastKnownSlide, setLastKnownSlide] = useState(0)

   useEffect(() => {
      if (resetOnMount) {
         setLastKnownSlide(0)
         onSlideChangeAction(0)
      }
   }, [onSlideChangeAction, resetOnMount])

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
