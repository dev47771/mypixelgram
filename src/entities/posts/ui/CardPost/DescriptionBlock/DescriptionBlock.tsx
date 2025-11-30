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
   /*    extendedLimit = 8,
   shortLimit = 3, */
}: Props) => {
   return (
      <div className="w-full">
         <Typography
            as="p"
            variant="captionRegular"
            className={clsx(
               'break-words whitespace-pre-wrap',
               isExpanded ? `line-clamp-[8]` : `line-clamp-[3]`
            )}
         >
            {description}
         </Typography>

         <button
            onClick={onToggle}
            className="text-s text-accent-500 leading-m font-regular cursor-pointer underline"
         >
            {isExpanded ? 'Hide' : 'Show more'}
         </button>
      </div>
   )
}
