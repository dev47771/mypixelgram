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
   shortLimit = 78,
   extendedLimit = 255,
}: Props) => {
   const shouldTruncate = description.length > shortLimit
   const visibleText = isExpanded
      ? description.slice(0, extendedLimit)
      : description.slice(0, shortLimit)

   return (
      <div>
         <Typography as="p" variant="captionRegular" className="inline">
            {visibleText}
            {shouldTruncate && !isExpanded && '...'}
            {shouldTruncate && isExpanded && '..'}
         </Typography>

         {shouldTruncate && (
            <button
               onClick={onToggle}
               className={clsx(
                  'text-s text-accent-500 leading-m font-regular ml-1',
                  'cursor-pointer underline hover:underline'
               )}
            >
               {isExpanded ? 'Hide' : 'Show more'}
            </button>
         )}
      </div>
   )
}
