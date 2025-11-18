'use client'

import { useController, type FieldValues, type UseControllerProps } from 'react-hook-form'
import { Textarea, TextareaProps } from '../Textarea/Textarea'

type Props<T extends FieldValues> = Omit<
   UseControllerProps<T>,
   'defaultValue' | 'rules' | 'disabled'
> &
   Omit<TextareaProps, 'onChange' | 'value'>

export const ControlledTextarea = <T extends FieldValues>(props: Props<T>) => {
   const { control, name, shouldUnregister, disabled, ...rest } = props

   const { field } = useController({
      control,
      name,
      disabled,
      shouldUnregister,
   })

   return <Textarea {...field} {...rest} />
}
