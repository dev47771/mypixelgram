'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Slider } from '@/shared/components/Slider'

type Props = {
   images: string[]
   filters: string[]
   onSlideChangeAction: (index: number) => void
   resetOnMount?: boolean
   currentSlide?: number
}

export const PostCreatorSlider = ({
   images,
   filters,
   onSlideChangeAction,
   resetOnMount,
   currentSlide = 0,
}: Props) => {
   const [internalSlide, setInternalSlide] = useState(currentSlide)

   useEffect(() => {
      setInternalSlide(currentSlide)
   }, [currentSlide])

   useEffect(() => {
      if (resetOnMount) {
         setInternalSlide(currentSlide)
         onSlideChangeAction(currentSlide)
      }
   }, [resetOnMount])

   const handleInternalSlideChange = (newSlide: number) => {
      setInternalSlide(newSlide)
      onSlideChangeAction(newSlide)
   }

   return (
      <Slider
         images={images}
         className="h-[501px] w-[490px]"
         initialSlide={internalSlide}
         onSlideChange={handleInternalSlideChange}
         renderSlideAction={(src, isActive, slideIndex) => (
            <Image
               src={src}
               fill
               alt={'slider_element'}
               className={`object-contain ${filters[slideIndex] || 'filter-none'}`}
            />
         )}
      />
   )
}
