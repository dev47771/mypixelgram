'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Slider } from '@/shared/components/Slider'

type Props = {
   images: string[]
   currentFilter: string
   onSlideChangeAction: (index: number) => void
   resetOnMount?: boolean
   currentSlide?: number // ← ДОБАВИТЬ ЭТОТ ПРОПС
   isEditingMode?: boolean // ← ДОБАВИТЬ ЭТОТ ПРОПС
}

export const PostCreatorSlider = ({
   images,
   currentFilter,
   onSlideChangeAction,
   resetOnMount,
   currentSlide = 0, // ← ДОБАВИТЬ ЗНАЧЕНИЕ ПО УМОЛЧАНИЮ
}: Props) => {
   const [lastKnownSlide, setLastKnownSlide] = useState(currentSlide)

   useEffect(() => {
      setLastKnownSlide(currentSlide)
   }, [currentSlide])

   useEffect(() => {
      if (resetOnMount) {
         setLastKnownSlide(currentSlide)
         onSlideChangeAction(currentSlide)
      }
   }, [onSlideChangeAction, resetOnMount, currentSlide])

   return (
      <Slider
         images={images}
         className="h-[501px] w-[490px]"
         initialSlide={currentSlide} // ← ПЕРЕДАЕМ КАК НАЧАЛЬНЫЙ СЛАЙД
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
