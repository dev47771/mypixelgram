import React, { ComponentPropsWithRef } from 'react'
import { DropdownMenu } from '..'
import { clsx } from 'clsx'

export const DropDownSeparator = ({
   className,
   ...rest
}: ComponentPropsWithRef<typeof DropdownMenu.Separator>) => {
   return (
      <DropdownMenu.Separator
         className={clsx('border-dark-100 mr-2 ml-2 border', className)}
         {...rest}
      />
   )
}
