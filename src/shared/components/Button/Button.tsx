import type { ComponentPropsWithRef } from 'react'
import { Slot } from '@radix-ui/react-slot'

type Props = {
   variant?: 'primary' | 'secondary' | 'outlined' | 'miniOutlined' | 'languageButton'
   asChild?: boolean
   fullWidth?: boolean
} & ComponentPropsWithRef<'button'>

export const Button = ({ asChild, variant = 'primary', className, fullWidth, ...rest }: Props) => {
   const Component = asChild ? Slot : 'button'

   return <Component className={className} {...rest} />
}
