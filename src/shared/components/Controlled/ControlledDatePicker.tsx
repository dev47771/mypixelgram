'use client'

import { useController, type UseControllerProps, type FieldValues, Control } from 'react-hook-form'
import { Label } from '../Label'
import { DatePicker, DatePickerProps } from '../DatePicker'
import { cn } from '@/shared/lib'
import { PublicRoutes } from '@/shared/enums'
import Link from 'next/link'
import { useState, useEffect } from 'react'

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
      if (!str || str.length < 10) return null // Только полные даты
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

   // Локальное состояние для input
   const [inputValue, setInputValue] = useState<string>(field.value || '')

   // Синхронизируем с формой
   useEffect(() => {
      setInputValue(field.value || '')
   }, [field.value])

   const handleDateChange = (date: Date | null) => {
      const dateStr = dateToString(date)
      setInputValue(dateStr)
      field.onChange(dateStr)
   }

   const handleInputChange = (value: string) => {
      setInputValue(value)

      // Обновляем форму только если это валидная дата
      if (value.length === 10) {
         // dd.mm.yyyy
         const [day, month, year] = value.split('.').map(Number)
         const date = new Date(year, month - 1, day)

         if (
            date.getFullYear() === year &&
            date.getMonth() === month - 1 &&
            date.getDate() === day
         ) {
            field.onChange(value)
         }
      } else {
         // Если не полная дата, очищаем поле в форме
         field.onChange('')
      }
   }

   const isAgeError = displayErrorMessage?.includes('A user under 13 cannot create a profile')

   return (
      <div className={cn(className, 'relative')}>
         {label && (
            <Label disabled={disabled}>
               {label}
               {required && <span className="text-danger-500">*</span>}
            </Label>
         )}
         <DatePicker
            selected={stringToDate(field.value)}
            onChange={handleDateChange}
            error={hasError}
            customErrorMessage
            disabled={disabled}
            classNameInput="w-full"
            // Добавляем пропсы для ручного ввода
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
