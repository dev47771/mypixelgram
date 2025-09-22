import React, { ComponentPropsWithRef, ReactNode } from 'react'
import { DropdownMenu } from '.'
import { DropDownMenuLabel } from '@/shared/components/dropDownMenu'
import { clsx } from 'clsx'

export type DropDownMenuProps = {
   trigger?: ReactNode
   label?: string
   hideArrow?: boolean
} & ComponentPropsWithRef<typeof DropdownMenu.Content>

export const DropDownMenu = ({
   trigger,
   children,
   align = 'end',
   label,
   hideArrow,
   className,
   ...rest
}: DropDownMenuProps) => {
   return (
      <DropdownMenu.Root>
         <DropdownMenu.Trigger
            className={'text-light-100 cursor-pointer bg-transparent outline-none'}
         >
            {trigger}
         </DropdownMenu.Trigger>

         <DropdownMenu.Portal>
            <DropdownMenu.Content
               className={clsx(
                  'bg-dark-500 border-dark-100 z-20 max-h-[425px] max-w-[355px] overflow-hidden rounded-sm border',
                  className
               )}
               align={align}
               alignOffset={-24}
               sideOffset={hideArrow ? 5 : -5}
               {...rest}
            >
               {label && <DropDownMenuLabel>{label}</DropDownMenuLabel>}

               <div className={'scrollbar-custom max-h-[376px] overflow-y-auto'}>{children}</div>

               {!hideArrow && (
                  <DropdownMenu.Arrow
                     asChild
                     className={
                        'bg-dark-500 border-dark-100 relative top-[-8px] block h-[16px] w-[16px] rotate-45 border border-t-0 border-l-0'
                     }
                  >
                     <span></span>
                  </DropdownMenu.Arrow>
               )}
            </DropdownMenu.Content>
         </DropdownMenu.Portal>
      </DropdownMenu.Root>
   )
}
