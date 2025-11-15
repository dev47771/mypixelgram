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
import { useEffect } from 'react'

// type Props = {
//    images: string[]
//    className?: string
//    disabled?: boolean
// }
//
// export const Slider = ({ images, className, disabled }: Props) => {
//    const { sliderRef, instanceRef, currentSlide, slides } = useSlider()
//
//    const onNextSlideHandler = () => instanceRef.current?.next()
//    const onPrevSlideHandler = () => instanceRef.current?.prev()
//    const onDotClickHandler = (i: number) => instanceRef.current?.moveToIdx(i)
//
//    return (
//       <SliderRoot className={className}>
//          <SliderContent ref={sliderRef}>
//             {images.map((src, i) => (
//                <SliderSlide key={i}>
//                   <Image src={src} fill alt={'slider_element'} />
//                </SliderSlide>
//             ))}
//          </SliderContent>
//
//          {/* !disabled - condition for CardPost, for cut image */}
//          {images.length > 1 && !disabled && (
//             <>
//                <SliderArrow className={'left-4'} onClick={onPrevSlideHandler} disabled={disabled}>
//                   <ArrowLeftIcon className={'group-hover:text-accent-300'} />
//                </SliderArrow>
//                <SliderArrow
//                   className={'right-[4px]'}
//                   onClick={onNextSlideHandler}
//                   disabled={disabled}
//                >
//                   <ArrowRightIcon className={'group-hover:text-accent-300'} />
//                </SliderArrow>
//
//                <SliderDots
//                   slides={slides}
//                   currentSlide={currentSlide}
//                   onDotClick={onDotClickHandler}
//                />
//             </>
//          )}
//       </SliderRoot>
//    )
// }

type Props = {
   images: string[]
   className?: string
   disabled?: boolean
   currentIndex?: number
   onIndexChangeAction?: (index: number) => void
}

export const Slider = ({
   images,
   className,
   disabled,
   currentIndex,
   onIndexChangeAction,
}: Props) => {
   const { sliderRef, instanceRef, currentSlide, slides } = useSlider(true, onIndexChangeAction)

   const onNextSlideHandler = () => instanceRef.current?.next()
   const onPrevSlideHandler = () => instanceRef.current?.prev()
   const onDotClickHandler = (i: number) => instanceRef.current?.moveToIdx(i)

   useEffect(() => {
      if (currentIndex === undefined || currentIndex === null) {
         return
      }
      if (instanceRef.current && currentIndex !== currentSlide) {
         instanceRef.current.moveToIdx(currentIndex)
      }
   }, [currentIndex, instanceRef, currentSlide])
   return (
      <SliderRoot className={className}>
         <SliderContent ref={sliderRef}>
            {images.map((src, i) => (
               <SliderSlide key={i}>
                  <Image src={src} fill alt={'slider_element'} className={'object-contain'} />
               </SliderSlide>
            ))}
         </SliderContent>

         {images.length > 1 && !disabled && (
            <>
               <SliderArrow className={'left-4'} onClick={onPrevSlideHandler} disabled={disabled}>
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
