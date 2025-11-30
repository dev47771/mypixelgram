'use client'

import { useEffect, useRef, useState } from 'react'
import { Typography } from '@/shared/components/Typography/Typography'
import { cn } from '@/shared/lib'

type Props = {
   description: string
   isExpanded: boolean
   onToggle: () => void
   shortLimit?: number
   extendedLimit?: number
}

/* 
The code measures the text height using ref and lineHeight and sets isOverflowing to true if the text exceeds shortLimit lines.
If isOverflowing, the "Show more"/"Hide" button is displayed, which toggles isExpanded.
CSS line-clamp-[N] limits the visible number of lines; if isExpanded, it shows up to extendedLimit.
*/

export const DescriptionBlock = ({
   description,
   isExpanded,
   onToggle,
   shortLimit = 3,
   extendedLimit = 8,
}: Props) => {
   const textRef = useRef<HTMLParagraphElement>(null)
   const [isOverflowing, setIsOverflowing] = useState(false)

   useEffect(() => {
      if (!textRef.current) return
      const el = textRef.current
      const computedStyle = getComputedStyle(el)
      const lineHeight = parseFloat(computedStyle.lineHeight)
      const paddingTop = parseFloat(computedStyle.paddingTop)
      const paddingBottom = parseFloat(computedStyle.paddingBottom)
      const maxHeight = lineHeight * shortLimit + paddingTop + paddingBottom

      const checkOverflow = () => {
         const overflowing = el.scrollHeight > maxHeight + 1
         setIsOverflowing(prev => (prev !== overflowing ? overflowing : prev))
      }

      const observer = new ResizeObserver(checkOverflow)
      observer.observe(el)

      checkOverflow()

      return () => observer.disconnect()
   }, [description, shortLimit])

   return (
      <div className="w-full">
         <Typography
            ref={textRef}
            as="p"
            variant="captionRegular"
            className={cn(
               'break-words whitespace-pre-wrap',
               isExpanded ? `line-clamp-[${extendedLimit}]` : `line-clamp-[${shortLimit}]`
            )}
         >
            {description}
         </Typography>

         {isOverflowing && (
            <button
               onClick={onToggle}
               className="text-s text-accent-500 leading-m font-regular cursor-pointer underline"
            >
               {isExpanded ? 'Hide' : 'Show more'}
            </button>
         )}
      </div>
   )
}
