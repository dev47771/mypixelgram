// import { Typography } from '@/shared/components/Typography/Typography'
// import clsx from 'clsx'
// import { useRef, useState, useEffect } from 'react'

// type Props = {
//    description: string
//    isExpanded: boolean
//    onToggle: () => void
//    shortLimit?: number
//    extendedLimit?: number
// }

// export const DescriptionBlock = ({
//    description,
//    isExpanded,
//    onToggle,
//    shortLimit = 3,
//    extendedLimit = 8,
// }: Props) => {
//    const textRef = useRef<HTMLParagraphElement>(null)
//    const [isOverflowing, setIsOverflowing] = useState(false)

//    useEffect(() => {
//       const checkOverflow = () => {
//          if (textRef.current) {
//             const element = textRef.current
//             // Проверяем, превышает ли высота контента высоту 3 строк
//             const lineHeight = parseInt(getComputedStyle(element).lineHeight)
//             const maxHeight = lineHeight * shortLimit
//             setIsOverflowing(element.scrollHeight > maxHeight)
//          }
//       }

//       checkOverflow()
//       // Перепроверяем при изменении размера окна
//       window.addEventListener('resize', checkOverflow)
//       return () => window.removeEventListener('resize', checkOverflow)
//    }, [description, shortLimit])

//    return (
//       <div className="w-full">
//          <Typography
//             ref={textRef}
//             as="p"
//             variant="captionRegular"
//             className={clsx(
//                'break-words whitespace-pre-wrap',
//                isExpanded ? `line-clamp-[${extendedLimit}]` : `line-clamp-[${shortLimit}]`
//             )}
//          >
//             {description}
//          </Typography>

//          {isOverflowing && (
//             <button
//                onClick={onToggle}
//                className="text-s text-accent-500 leading-m font-regular cursor-pointer underline"
//             >
//                {isExpanded ? 'Hide' : 'Show more'}
//             </button>
//          )}
//       </div>
//    )
// }

'use client'

import { useEffect, useRef, useState } from 'react'
import { Typography } from '@/shared/components/Typography/Typography'
import clsx from 'clsx'

type Props = {
   description: string
   isExpanded: boolean
   onToggle: () => void
   shortLimit?: number
   extendedLimit?: number
}

export const DescriptionBlock = ({
   description,
   isExpanded,
   onToggle,
   shortLimit = 2,
   extendedLimit = 5,
}: Props) => {
   const textRef = useRef<HTMLParagraphElement>(null)
   const [isOverflowing, setIsOverflowing] = useState(false)

   useEffect(() => {
      const el = textRef.current
      if (!el) return

      // ---------------------------
      // 1. УБИРАЕМ ОГРАНИЧЕНИЕ
      // ---------------------------
      const originalClass = el.className
      el.className = originalClass.replace(/line-clamp-\[\d+\]/, '')

      const fullHeight = el.scrollHeight

      // ---------------------------
      // 2. СТАВИМ CLAMP-3 ВРЕМЕННО
      // ---------------------------
      el.className = originalClass.replace(/line-clamp-\[\d+\]/, `line-clamp-[${shortLimit}]`)
      const clampedHeight = el.clientHeight

      // ---------------------------
      // 3. ВОССТАНАВЛИВАЕМ ИСХОДНОЕ
      // ---------------------------
      el.className = originalClass

      setIsOverflowing(fullHeight > clampedHeight + 1)
   }, [description, shortLimit])

   return (
      <div className="w-full">
         <Typography
            as="p"
            ref={textRef}
            variant="captionRegular"
            className={clsx(
               'break-words whitespace-pre-wrap',
               //isExpanded ? 'line-clamp-[8]' : 'line-clamp-[3]'
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

// 'use client'

// import { useEffect, useRef, useState } from 'react'
// import { Typography } from '@/shared/components/Typography/Typography'
// import clsx from 'clsx'

// type Props = {
//    description: string
//    isExpanded: boolean
//    onToggle: () => void
// }

// export const DescriptionBlock = ({ description, isExpanded, onToggle }: Props) => {
//    const visibleRef = useRef<HTMLParagraphElement>(null)
//    const hiddenRef = useRef<HTMLParagraphElement>(null)

//    const [isOverflowing, setIsOverflowing] = useState(false)

//    useEffect(() => {
//       const visible = visibleRef.current
//       const hidden = hiddenRef.current
//       if (!visible || !hidden) return

//       const visibleHeight = visible.clientHeight
//       const fullHeight = hidden.scrollHeight

//       setIsOverflowing(fullHeight > visibleHeight + 1)
//    }, [description])

//    return (
//       <div className="relative w-full">
//          {/* ВИДИМЫЙ (clamped) */}
//          <Typography
//             as="p"
//             ref={visibleRef}
//             variant="captionRegular"
//             className={clsx(
//                'break-words whitespace-pre-wrap transition-all',
//                isExpanded ? 'line-clamp-[8]' : 'line-clamp-[3]'
//             )}
//          >
//             {description}
//          </Typography>

//          {/* СКРЫТЫЙ (без clamp) — только для измерений */}
//          <Typography
//             as="p"
//             ref={hiddenRef}
//             variant="captionRegular"
//             className="pointer-events-none absolute w-full break-words whitespace-pre-wrap opacity-0"
//          >
//             {description}
//          </Typography>

//          {/* КНОПКА */}
//          {isOverflowing && (
//             <button
//                onClick={onToggle}
//                className="text-s text-accent-500 leading-m font-regular mt-1 cursor-pointer underline"
//             >
//                {isExpanded ? 'Hide' : 'Show more'}
//             </button>
//          )}
//       </div>
//    )
// }

// import { Typography } from '@/shared/components/Typography/Typography'
// import clsx from 'clsx'

// type Props = {
//    description: string
//    isExpanded: boolean
//    onToggle: () => void
//    shortLimit?: number
//    extendedLimit?: number
// }

// export const DescriptionBlock = ({
//    description,
//    isExpanded,
//    onToggle,
//    /*   extendedLimit = 8,
//    shortLimit = 3, */
// }: Props) => {
//    return (
//       <div className="w-full">
//          <Typography
//             as="p"
//             variant="captionRegular"
//             className={clsx(
//                'break-words whitespace-pre-wrap',
//                isExpanded ? `line-clamp-[8]` : `line-clamp-[3]`
//             )}
//          >
//             {description}
//          </Typography>

//          <button
//             onClick={onToggle}
//             className="text-s text-accent-500 leading-m font-regular cursor-pointer underline"
//          >
//             {isExpanded ? 'Hide' : 'Show more'}
//          </button>
//       </div>
//    )
// }
