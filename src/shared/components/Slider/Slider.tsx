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

type Props = {
   images: string[]
   className?: string
}

export const Slider = ({ images, className }: Props) => {
   const { sliderRef, instanceRef, currentSlide, slides } = useSlider()

   const onNextSlideHandler = () => instanceRef.current?.next()
   const onPrevSlideHandler = () => instanceRef.current?.prev()
   const onDotClickHandler = (i: number) => instanceRef.current?.moveToIdx(i)

   return (
      <SliderRoot className={className}>
         <SliderContent ref={sliderRef}>
            {images.map((src, i) => (
               <SliderSlide key={i}>
                  <Image src={src} fill alt={'slider_element'} />
               </SliderSlide>
            ))}
         </SliderContent>

         <SliderArrow className={'left-4'} onClick={onPrevSlideHandler}>
            <ArrowLeftIcon className={'group-hover:text-accent-300'} />
         </SliderArrow>
         <SliderArrow className={'right-[4px]'} onClick={onNextSlideHandler}>
            <ArrowRightIcon className={'group-hover:text-accent-300'} />
         </SliderArrow>

         <SliderDots slides={slides} currentSlide={currentSlide} onDotClick={onDotClickHandler} />
      </SliderRoot>
   )
}
