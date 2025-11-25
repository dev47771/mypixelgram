'use client'

import { useState } from 'react'
import { useKeenSlider } from 'keen-slider/react'

export const useSlider = (loop = true, initialSlide = 0) => {
   const [currentSlide, setCurrentSlide] = useState(initialSlide)
   const [loaded, setLoaded] = useState(false)

   const [sliderRef, instanceRef] = useKeenSlider({
      initial: initialSlide,
      loop,
      slideChanged(slider) {
         const newSlide = slider.track.details.rel
         setCurrentSlide(newSlide)
      },
      created() {
         setLoaded(true)
      },
   })

   const slides = instanceRef.current?.track?.details?.slides || []

   return { sliderRef, instanceRef, currentSlide, slides, loaded }
}
