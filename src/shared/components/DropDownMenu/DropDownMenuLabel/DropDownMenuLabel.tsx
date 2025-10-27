import React, { ComponentPropsWithRef } from 'react'
import { DropdownMenu } from '@/shared/components/DropDownMenu'
import { clsx } from 'clsx'

type Props = ComponentPropsWithRef<typeof DropdownMenu.Label>

export const DropDownMenuLabel = ({ children, className, ...rest }: Props) => {
   return (
      <DropdownMenu.Label className={clsx('text-light-100 px-2 py-3', className)} {...rest}>
         {children}
      </DropdownMenu.Label>
   )
}
