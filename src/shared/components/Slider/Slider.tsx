import React, { useState } from 'react'
import 'keen-slider/keen-slider.min.css'
import { useKeenSlider } from 'keen-slider/react'
import { ArrowButton } from '@/shared/components/Slider/ArrowButton'
import { Dots } from '@/shared/components/Slider/Dots'
import { cn } from '@/shared/lib'
import Image from 'next/image'

type Props = {
   className?: string
   images: string[]
}

export const Slider = ({ className, images }: Props) => {
   const [currentSlide, setCurrentSlide] = useState(0)
   const [loaded, setLoaded] = useState(false)
   const [sliderRef, instanceRef] = useKeenSlider({
      initial: 0,
      loop: true,
      slideChanged(slider) {
         setCurrentSlide(slider.track.details.rel)
      },
      created() {
         setLoaded(true)
      },
   })
   const slides = instanceRef.current?.track?.details?.slides || []

   const onDotClickHandler = (idx: number) => instanceRef.current?.moveToIdx(idx)

   return (
      <>
         <div className={cn('relative h-[300px] w-[300px]', className)}>
            <div ref={sliderRef} className={'keen-slider relative h-full w-full'}>
               {images.map((image, i) => {
                  return (
                     <div
                        key={i}
                        className={`keen-slider__slide relative number-slide${i} flex h-full w-full items-center justify-center`}
                     >
                        <Image src={image} fill alt={'slider_element'} />
                     </div>
                  )
               })}
            </div>
            {loaded && instanceRef.current && (
               <>
                  <ArrowButton
                     left
                     onClick={(e: React.MouseEvent) => {
                        e.stopPropagation()
                        instanceRef.current?.prev()
                     }}
                  />

                  <ArrowButton
                     onClick={(e: React.MouseEvent) => {
                        e.stopPropagation()
                        instanceRef.current?.next()
                     }}
                  />
               </>
            )}
            {loaded && instanceRef.current && (
               <Dots slides={slides} currentSlide={currentSlide} onDotClick={onDotClickHandler} />
            )}
         </div>
      </>
   )
}
