'use client'

import { useEffect, useState } from "react"
import Image from 'next/image'
import { Slider } from "@/shared/components/Slider"

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


// export const PostCreatorSlider = ({ images, currentFilter, onSlideChange }: Props) => {
//     const { sliderRef, instanceRef, currentSlide, slides } = useSlider()

//     const onNextSlideHandler = () => instanceRef.current?.next()
//     const onPrevSlideHandler = () => instanceRef.current?.prev()
//     const onDotClickHandler = (i: number) => instanceRef.current?.moveToIdx(i)

//     //при изменении номера текущего фото (слайда) будет сетаться в PostCreator текущий индекс фото
//     useEffect(() => {
//         onSlideChange(currentSlide)
//     }, [currentSlide])

//     return (
//         <SliderRoot>
//             <SliderContent ref={sliderRef}>
//                 {images.map((src, i) => (
//                     <SliderSlide key={i}>
//                         <Image
//                             src={src}
//                             fill
//                             alt={'slider_element'}
//                             className={`object-contain ${i === currentSlide ? currentFilter : 'filter-none'}`}
//                         />
//                     </SliderSlide>
//                 ))}
//             </SliderContent>

//             {images.length > 1 && (
//                 <>
//                     <SliderArrow className={'left-[4px]'} onClick={onPrevSlideHandler}>
//                         <ArrowLeftIcon className={'group-hover:text-accent-300'} />
//                     </SliderArrow>
//                     <SliderArrow className={'right-[4px]'} onClick={onNextSlideHandler}>
//                         <ArrowRightIcon className={'group-hover:text-accent-300'} />
//                     </SliderArrow>

//                     <SliderDots
//                         slides={slides}
//                         currentSlide={currentSlide}
//                         onDotClick={onDotClickHandler}
//                     />
//                 </>
//             )}
//         </SliderRoot>
//     )
// }