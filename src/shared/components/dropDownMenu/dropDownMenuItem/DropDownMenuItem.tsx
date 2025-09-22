import React, { ComponentPropsWithRef } from 'react'
import { DropdownMenu } from '..'
import { clsx } from 'clsx'

type Props = ComponentPropsWithRef<typeof DropdownMenu.Item>

export const DropDownMenuItem = ({ className, ...rest }: Props) => {
   return (
      <DropdownMenu.Item
         className={clsx(
            'text-light-100 hover:bg-dark-300 relative z-20 max-w-[355px] cursor-pointer bg-transparent bg-clip-padding px-3 py-2 wrap-break-word outline-none',
            className
         )}
         {...rest}
      />
   )
}
