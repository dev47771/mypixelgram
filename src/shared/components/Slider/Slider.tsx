'use client'

import {
   SliderArrow,
   SliderContent,
   SliderDots,
   SliderRoot,
   SliderSlide,
   useSlider,
} from '@/shared/components/Slider'
import { ArrowLeftIcon, ArrowRightIcon } from '@/shared/icons'
import Image from 'next/image'
import React, { ReactNode, useEffect } from 'react'
import { cn } from '@/shared/lib'

type Props = {
   images: string[]
   className?: string
   disabled?: boolean
   renderSlideAction?: (src: string, isActive: boolean, currentSlide: number) => ReactNode
   initialSlide?: number
   onSlideChange?: (index: number) => void
   isCrop?: boolean
}

export const Slider = ({
   images,
   className,
   disabled,
   renderSlideAction,
   initialSlide = 0,
   onSlideChange,
   isCrop = false,
}: Props) => {
   const { sliderRef, instanceRef, currentSlide, slides } = useSlider(true, initialSlide)

   useEffect(() => {
      if (onSlideChange) {
         onSlideChange(currentSlide)
      }
   }, [currentSlide, onSlideChange])

   const onNextSlideHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation()
      instanceRef.current?.next()
   }
   const onPrevSlideHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation()
      instanceRef.current?.prev()
   }
   const onDotClickHandler = (i: number) => instanceRef.current?.moveToIdx(i)

   return (
      <SliderRoot className={className}>
         <SliderContent ref={sliderRef}>
            {images.map((src, i) => (
               <SliderSlide key={i}>
                  {renderSlideAction ? (
                     renderSlideAction(src, i === currentSlide, currentSlide)
                  ) : (
                     <Image
                        src={src}
                        fill
                        alt={'slider_element'}
                        className={cn(isCrop ? 'object-cover' : 'object-contain', 'cursor-pointer')}
                     />
                  )}
               </SliderSlide>
            ))}
         </SliderContent>

         {/* !disabled - condition for CardPost, for cut image */}
         {images.length > 1 && !disabled && (
            <>
               <SliderArrow
                  className={'left-[4px]'}
                  onClick={onPrevSlideHandler}
                  disabled={disabled}
               >
                  <ArrowLeftIcon className={'group-hover:text-accent-300'} />
               </SliderArrow>
               <SliderArrow
                  className={'right-[4px]'}
                  onClick={onNextSlideHandler}
                  disabled={disabled}
               >
                  <ArrowRightIcon className={'group-hover:text-accent-300'} />
               </SliderArrow>

               <SliderDots
                  slides={slides}
                  currentSlide={currentSlide}
                  onDotClick={onDotClickHandler}
               />
            </>
         )}
      </SliderRoot>
   )
}
