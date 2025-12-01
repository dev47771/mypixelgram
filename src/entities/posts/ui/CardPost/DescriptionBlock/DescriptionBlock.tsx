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
The code measures the text height using ref and lineHeight; if the text exceeds shortLimit lines, it sets isOverflowing to true and displays the Show more/Hide button. The button toggles isExpanded, and line-clamp-[N] limits the visible number of lines of text.
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

      const style = getComputedStyle(textRef.current)
      const lineHeight = parseFloat(style.lineHeight)
      const maxHeight =
         lineHeight * shortLimit + parseFloat(style.paddingTop) + parseFloat(style.paddingBottom)

      setIsOverflowing(textRef.current.scrollHeight > maxHeight)
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
