import { useController, type FieldValues, type UseControllerProps } from 'react-hook-form'
import { Textarea } from '@/shared/components/Textarea'
import type { ComponentPropsWithoutRef } from 'react'

type TextareaProps = ComponentPropsWithoutRef<typeof Textarea>

type Props<T extends FieldValues> = Omit<
   UseControllerProps<T>,
   'defaultValue' | 'disabled' | 'rules'
> &
   Omit<TextareaProps, 'onChange' | 'onValueChange' | 'value'>

export const ControlledTextarea = <T extends FieldValues>(props: Props<T>) => {
   const { control, shouldUnregister, disabled, name, ...rest } = props

   const { field } = useController({
      control,
      disabled,
      name,
      shouldUnregister,
   })

   return (
      <Textarea
         {...rest}
         {...field}
         disabled={disabled}
         onValueChange={field.onChange}
         value={field.value}
      />
   )
}
