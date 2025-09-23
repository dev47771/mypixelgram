import React, { ComponentPropsWithRef } from 'react'
import { DropdownMenu } from '..'
import { clsx } from 'clsx'

type Props = ComponentPropsWithRef<typeof DropdownMenu.Item>

export const DropDownMenuItem = ({ className, ...rest }: Props) => {
   return (
      <DropdownMenu.Item
         className={clsx(
            'text-light-100 hover:bg-dark-300 z-20 w-full cursor-pointer bg-transparent px-2 py-3 wrap-break-word outline-none',
            className
         )}
         {...rest}
      />
   )
}
