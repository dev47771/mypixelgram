import { useEffect, useRef } from 'react'

export const useInfiniteScroll = (onIntersect: () => void, options?: IntersectionObserverInit) => {
   const observerRef = useRef<HTMLDivElement>(null)

   useEffect(() => {
      const currentRef = observerRef.current
      if (!currentRef) return

      const observer = new IntersectionObserver(entries => {
         if (entries[0].isIntersecting) {
            onIntersect()
         }
      }, options)

      observer.observe(currentRef)

      return () => {
         if (currentRef) {
            observer.unobserve(currentRef)
         }
      }
   }, [onIntersect, options])

   return observerRef
}
