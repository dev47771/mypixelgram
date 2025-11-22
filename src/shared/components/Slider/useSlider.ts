'use client'

import { useState } from 'react'
import { useKeenSlider } from 'keen-slider/react'

export const useSlider = (loop = true, initialSlide = 0) => {
   const [currentSlide, setCurrentSlide] = useState(initialSlide)
   const [loaded, setLoaded] = useState(false)

   const [sliderRef, instanceRef] = useKeenSlider({
      //initial: 0,
      initial: initialSlide, // ← ИСПОЛЬЗУЕМ ПАРАМЕТР
      loop,
      slideChanged(slider) {
         setCurrentSlide(slider.track.details.rel)
      },
      created() {
         setLoaded(true)
      },
   })

   const slides = instanceRef.current?.track?.details?.slides || []

   return { sliderRef, instanceRef, currentSlide, slides, loaded }
}
