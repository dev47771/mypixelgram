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
import { useEffect } from 'react'

type Props = {
   images: string[] // Массив previewUrl
   currentFilter: string // Фильтр для текущего фото
   onSlideChange: (index: number) => void
   className?: string
}

export const Slider = ({ images, currentFilter, onSlideChange, className }: Props) => {
   const { sliderRef, instanceRef, currentSlide, slides } = useSlider()

   const onNextSlideHandler = () => instanceRef.current?.next()
   const onPrevSlideHandler = () => instanceRef.current?.prev()
   const onDotClickHandler = (i: number) => instanceRef.current?.moveToIdx(i)

   //при изменении номера текущего фото (слайда) будет сетаться в PostCreator текущий индекс фото
   useEffect(() => {
      onSlideChange(currentSlide)
   }, [currentSlide])

   return (
      <SliderRoot className={className}>
         <SliderContent ref={sliderRef}>
            {images.map((src, i) => (
               <SliderSlide key={i}>
                  <Image
                     src={src}
                     fill
                     alt={'slider_element'}
                     className={`object-contain ${i === currentSlide ? currentFilter : 'filter-none'}`}
                  />
               </SliderSlide>
            ))}
         </SliderContent>

         {images.length > 1 && (
            <>
               <SliderArrow className={'left-[4px]'} onClick={onPrevSlideHandler}>
                  <ArrowLeftIcon className={'group-hover:text-accent-300'} />
               </SliderArrow>
               <SliderArrow className={'right-[4px]'} onClick={onNextSlideHandler}>
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
