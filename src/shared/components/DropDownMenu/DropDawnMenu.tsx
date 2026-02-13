import React, { ComponentPropsWithRef, ReactNode } from 'react'
import { DropdownMenu } from '.'
import { DropDownMenuLabel } from '@/shared/components/DropDownMenu'
import { clsx } from 'clsx'

export type DropDownMenuProps = {
   trigger: ReactNode
   open?: boolean
   onOpenChange?: (open: boolean) => void
   headerContent?: ReactNode
   label?: string
} & ComponentPropsWithRef<typeof DropdownMenu.Content>

export const DropDownMenu = ({
   open,
   onOpenChange,
   trigger,
   children,
   align = 'end',
   label,
   headerContent,
   className,
   ...rest
}: DropDownMenuProps) => {
   return (
      <DropdownMenu.Root open={open} onOpenChange={onOpenChange}>
         {trigger}

         <DropdownMenu.Portal>
            <DropdownMenu.Content
               className={clsx(
                  'bg-dark-500 border-dark-100 z-20 max-h-[425px] max-w-[355px] overflow-hidden rounded-sm border',
                  className
               )}
               align={align}
               alignOffset={-24}
               sideOffset={5}
               {...rest}
            >
               {(label || headerContent) && (
                  <div className="flex items-center justify-between gap-2 py-1">
                     {label && <DropDownMenuLabel>{label}</DropDownMenuLabel>}
                     {headerContent}
                  </div>
               )}

               {children}
            </DropdownMenu.Content>
         </DropdownMenu.Portal>
      </DropdownMenu.Root>
   )
}
