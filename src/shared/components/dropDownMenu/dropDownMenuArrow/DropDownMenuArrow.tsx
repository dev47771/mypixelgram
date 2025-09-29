import React, { ComponentPropsWithRef } from 'react'
import { DropdownMenu } from '..'
import { clsx } from 'clsx'

export const DropDownMenuArrow = ({
   className,
   children,
   ...rest
}: ComponentPropsWithRef<typeof DropdownMenu.Arrow>) => {
   return (
      <DropdownMenu.Arrow
         asChild
         className={clsx(
            'bg-dark-500 border-dark-100 relative top-[-8px] block h-[16px] w-[16px] rotate-45 border border-t-0 border-l-0',
            className
         )}
         {...rest}
      >
         {children}
      </DropdownMenu.Arrow>
   )
}
