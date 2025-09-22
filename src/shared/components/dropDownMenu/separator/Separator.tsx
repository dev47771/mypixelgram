import React, { ComponentPropsWithRef } from 'react'
import { DropdownMenu } from '..'
import { clsx } from 'clsx'

type Props = ComponentPropsWithRef<typeof DropdownMenu.Separator>

export const Separator = ({ className, ...rest }: Props) => {
   return (
      <DropdownMenu.Separator
         className={clsx('border-dark-100 mr-2 ml-3 border', className)}
         {...rest}
      />
   )
}
