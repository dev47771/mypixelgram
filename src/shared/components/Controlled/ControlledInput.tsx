'use client'
import { Input } from '@/shared/components/Input'
import { type FieldValues, useController, type UseControllerProps } from 'react-hook-form'
import type { InputProps } from '@/shared/components/Input/Input'

type Props<T extends FieldValues> = Omit<
   UseControllerProps<T>,
   'defaultValue' | 'disabled' | 'rules'
> &
   Omit<InputProps, 'onChange' | 'onChangeValue' | 'value'>

export const ControlledInput = <T extends FieldValues>(props: Props<T>) => {
   const { control, shouldUnregister, disabled, name, ...rest } = props

   const { field } = useController({
      control,
      disabled,
      name,
      shouldUnregister,
   })

   return <Input {...{ ...rest, ...field }} />
}
