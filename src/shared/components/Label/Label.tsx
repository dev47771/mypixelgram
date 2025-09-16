import React, { ComponentPropsWithRef } from 'react'
import * as LabelRadix from '@radix-ui/react-label'
import { clsx } from 'clsx'

type Props = {
   children?: React.ReactNode
} & ComponentPropsWithRef<typeof LabelRadix.Root>

export const Label = ({ children, className, htmlFor, ...rest }: Props) => {
   return (
      <LabelRadix.Root
         className={clsx(htmlFor && 'cursor-pointer', className)}
         htmlFor={htmlFor}
         {...rest}
      >
         {children}
      </LabelRadix.Root>
   )
}
