import React, { ComponentPropsWithRef } from 'react'
import { DropdownMenu } from '..'
import { clsx } from 'clsx'

export const DropDownMenuTrigger = ({
   children,
   className,
   ...rest
}: ComponentPropsWithRef<typeof DropdownMenu.Trigger>) => {
   return (
      <DropdownMenu.Trigger
         className={clsx('text-light-100 cursor-pointer bg-transparent outline-none', className)}
         {...rest}
      >
         {children}
      </DropdownMenu.Trigger>
   )
}
