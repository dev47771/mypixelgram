import React, { ComponentPropsWithRef, ReactNode } from 'react'
import { DropdownMenu } from '..'
import { Typography } from '@/shared/components/Typography'
import { clsx } from 'clsx'

type Props = {
   icon: ReactNode
   value: string
} & ComponentPropsWithRef<typeof DropdownMenu.Item>

export const DropDownMenuBaseItem = ({ icon, value, className, ...rest }: Props) => {
   return (
      <DropdownMenu.Item
         className={clsx(
            'text-light-100 hover:bg-dark-300 flex cursor-pointer items-center gap-3 bg-transparent bg-clip-padding p-3 outline-none',
            className
         )}
         {...rest}
      >
         {icon}
         <Typography variant={'captionRegular'} as={'span'}>
            {value}
         </Typography>
      </DropdownMenu.Item>
   )
}
