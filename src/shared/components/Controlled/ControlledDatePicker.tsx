'use client'
import { useController, type UseControllerProps, type FieldValues, Control } from 'react-hook-form'
import { Label } from '../Label'
import { DatePicker, DatePickerProps } from '../DatePicker'
import { cn } from '@/shared/lib'

type Props<T extends FieldValues> = Omit<
   UseControllerProps<T>,
   'defaultValue' | 'disabled' | 'rules'
> & {
   control: Control<T>
   label?: string
   disabled?: boolean
   required?: boolean
   errorMessage?: string
   className?: string
} & Omit<DatePickerProps, 'selected' | 'onChange'>

export const ControlledDatePicker = <T extends FieldValues>(props: Props<T>) => {
   const { control, name, disabled, shouldUnregister, label, required, errorMessage, className } =
      props

   const { field, fieldState } = useController({
      control: control,
      name,
      disabled,
      shouldUnregister,
   })

   const displayErrorMessage = errorMessage || fieldState.error?.message

   const hasError = !!displayErrorMessage

   const stringToDate = (str: string): Date | null => {
      if (!str) return null
      const [day, month, year] = str.split('.').map(Number)
      return new Date(year, month - 1, day)
   }

   const dateToString = (date: Date | null): string => {
      if (!date) return ''
      const day = date.getDate().toString().padStart(2, '0')
      const month = (date.getMonth() + 1).toString().padStart(2, '0')
      const year = date.getFullYear()
      return `${day}.${month}.${year}`
   }

   return (
      <div className={cn(className)}>
         {label && (
            <Label disabled={disabled}>
               {label}
               {required && <span className="text-danger-500">*</span>}
            </Label>
         )}
         <DatePicker
            selected={stringToDate(field.value)}
            onChange={date => field.onChange(dateToString(date))}
            error={hasError}
            disabled={disabled}
            classNameInput="w-full"
         />
         {displayErrorMessage && <p className="text-sm text-red-500">{displayErrorMessage}</p>}
      </div>
   )
}
