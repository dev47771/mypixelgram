'use client'
import { useState } from 'react'
import { useKeenSlider } from 'keen-slider/react'

// export const useSlider = (loop = true) => {
//    const [currentSlide, setCurrentSlide] = useState(0)
//    const [loaded, setLoaded] = useState(false)
//
//    const [sliderRef, instanceRef] = useKeenSlider({
//       initial: 0,
//       loop,
//       slideChanged(slider) {
//          setCurrentSlide(slider.track.details.rel)
//       },
//       created() {
//          setLoaded(true)
//       },
//    })
//
//    const slides = instanceRef.current?.track?.details?.slides || []
//
//    return { sliderRef, instanceRef, currentSlide, slides, loaded }
// }

export const useSlider = (loop = true, onSlideChange?: (index: number) => void) => {
   const [currentSlide, setCurrentSlide] = useState(0)
   const [loaded, setLoaded] = useState(false)

   const [sliderRef, instanceRef] = useKeenSlider({
      initial: 0,
      loop,
      slideChanged(slider) {
         const newIndex = slider.track.details.rel
         setCurrentSlide(newIndex)
         onSlideChange?.(newIndex)
      },
      created() {
         setLoaded(true)
      },
   })

   const slides = instanceRef.current?.track?.details?.slides || []

   return { sliderRef, instanceRef, currentSlide, slides, loaded }
}
