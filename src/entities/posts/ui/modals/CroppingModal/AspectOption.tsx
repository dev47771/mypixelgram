import { ReactNode } from 'react'
import { cn } from '@/shared/lib'

export function AspectOption({
   label,
   value,
   aspect,
   Icon,
   boxClass,
   onClick,
}: {
   label: string
   value: number | undefined
   aspect: number | undefined
   Icon?: ReactNode
   boxClass?: string
   onClick: () => void
}) {
   const isActive = value === aspect

   return (
      <button
         onClick={onClick}
         className={cn(
            'flex h-[38px] w-full cursor-pointer items-center justify-between px-3 py-2.5',
            isActive ? 'text-light-100' : 'text-light-900'
         )}
      >
         {label}

         {Icon ? (
            Icon
         ) : (
            <div
               className={cn(
                  'relative right-[3px] inline-block rounded-xs border-2',
                  boxClass,
                  isActive ? 'border-light-100' : 'border-light-900'
               )}
            />
         )}
      </button>
   )
}
