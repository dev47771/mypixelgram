import React from 'react'
import { cn } from '@/shared/lib'
import { ArrowLeftIcon, ArrowRightIcon } from '@/shared/icons'

type Props = {
   left?: boolean
   onClick: (e: React.MouseEvent) => void
}

export const ArrowButton = ({ left, onClick }: Props) => {
   return (
      <button
         onClick={onClick}
         className={cn(
            'bg-dark-300/50 absolute top-[50%] flex h-12 w-12 -translate-y-1/2 cursor-pointer items-center justify-center rounded-xs',
            'group hover:bg-dark-300/80',
            left ? 'left-[8px]' : 'right-[8px] left-auto'
         )}
      >
         {left ? (
            <ArrowLeftIcon className={'group-hover:text-accent-300'} />
         ) : (
            <ArrowRightIcon className={'group-hover:text-accent-300'} />
         )}
      </button>
   )
}
