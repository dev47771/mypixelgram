import React, { ComponentPropsWithRef, ReactNode } from 'react'
import { DropdownMenu } from '.'
import { DropDownMenuLabel } from '@/shared/components/DropDownMenu'
import { clsx } from 'clsx'

export type DropDownMenuProps = {
   trigger: ReactNode
   label?: string
} & ComponentPropsWithRef<typeof DropdownMenu.Content>

export const DropDownMenu = ({
   trigger,
   children,
   align = 'end',
   label,
   className,
   ...rest
}: DropDownMenuProps) => {
   return (
      <DropdownMenu.Root>
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
               {label && <DropDownMenuLabel>{label}</DropDownMenuLabel>}

               <div className={'scrollbar-custom max-h-[376px] overflow-y-auto'}>{children}</div>
            </DropdownMenu.Content>
         </DropdownMenu.Portal>
      </DropdownMenu.Root>
   )
}
