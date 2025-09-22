import React, { ComponentPropsWithRef } from 'react'
import { DropdownMenu } from '@/shared/components/dropDownMenu'
import { clsx } from 'clsx'

type Props = ComponentPropsWithRef<typeof DropdownMenu.Label>

export const DropDownMenuLabel = ({ children, className, ...rest }: Props) => {
   return (
      <DropdownMenu.Label className={clsx('text-light-100 px-3 py-3', className)} {...rest}>
         {children}
      </DropdownMenu.Label>
   )
}
