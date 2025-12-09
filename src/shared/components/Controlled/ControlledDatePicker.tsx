'use client'

import { useController, type UseControllerProps, type FieldValues, Control } from 'react-hook-form'
import { Label } from '../Label'
import { DatePicker, DatePickerProps } from '../DatePicker'
import { cn } from '@/shared/lib'
import { PublicRoutes } from '@/shared/enums'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { dateFormatter } from '@/entities/settings/utils/dateFormatter'

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

   // Используем утилиты вместо локальных функций
   const [inputValue, setInputValue] = useState<string>(() => {
      return dateFormatter.serverToForm(field.value || '')
   })

   useEffect(() => {
      const displayValue = dateFormatter.serverToForm(field.value || '')
      setInputValue(displayValue)
   }, [field.value])

   const handleDateChange = (date: Date | null) => {
      const dateStr = dateFormatter.formatDate(date)
      setInputValue(dateStr)
      field.onChange(dateStr) // Сохраняем dd.mm.yyyy
   }

   const handleInputChange = (value: string) => {
      setInputValue(value)

      if (value.length === 10 && /^\d{2}\.\d{2}\.\d{4}$/.test(value)) {
         const [day, month, year] = value.split('.').map(Number)
         const date = new Date(year, month - 1, day)

         // Упрощённая проверка
         if (!isNaN(date.getTime())) {
            field.onChange(value)
         }
      } else {
         field.onChange('')
      }
   }

   const isAgeError = displayErrorMessage?.includes('A user under 13 cannot create a profile')

   // Используем утилиту для парсинга
   const selectedDate = dateFormatter.parseToDate(field.value)

   return (
      <div className={cn(className, 'relative')}>
         {label && (
            <Label disabled={disabled}>
               {label}
               {required && <span className="text-danger-500">*</span>}
            </Label>
         )}
         <DatePicker
            selected={selectedDate}
            onChange={handleDateChange}
            error={hasError}
            customErrorMessage
            disabled={disabled}
            classNameInput="w-full"
            value={inputValue}
            onInputChange={handleInputChange}
         />
         {displayErrorMessage && (
            <p className="text-danger-500 absolute top-15.5 right-0 -bottom-6 left-0 text-sm">
               {displayErrorMessage}{' '}
               {isAgeError && (
                  <Link href={PublicRoutes.privacyPolicy} className="underline">
                     Privacy Policy
                  </Link>
               )}
            </p>
         )}
      </div>
   )
}
