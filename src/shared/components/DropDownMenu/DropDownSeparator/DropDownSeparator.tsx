import React, { ComponentPropsWithRef } from 'react'
import { DropdownMenu } from '..'
import { clsx } from 'clsx'

export const DropDownSeparator = ({
   className,
   ...rest
}: ComponentPropsWithRef<typeof DropdownMenu.Separator>) => {
   return (
      <DropdownMenu.Separator className={clsx('border-dark-100 border-t', className)} {...rest} />
   )
}
