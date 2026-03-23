import { FieldValues, useController, UseControllerProps } from 'react-hook-form'
import { Checkbox, CheckboxProps } from '@/shared/components/Checkbox'

type Props<T extends FieldValues> = UseControllerProps<T> &
   Omit<CheckboxProps, 'checked' | 'onCheckedChange'>

export const ControlledCheckbox = <T extends FieldValues>({
   control,
   disabled,
   name,
   shouldUnregister,
   ...rest
}: Props<T>) => {
   const {
      field: { onChange, value },
   } = useController({
      control,
      disabled,
      name,
      shouldUnregister,
   })

   return <Checkbox checked={value} disabled={disabled} onCheckedChange={onChange} {...rest} />
}
