import { ArrowLeftIcon, ArrowRightIcon, CalendarIcon, CalendarOutlineIcon } from '@/shared/icons'
import React, { useState, useEffect, useRef, useCallback } from 'react'
import ReactDatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import './styles/datePicker.css'
import { cn } from '@/shared/lib'

export type DatePickerInputProps = {
   value?: string
   onClick?: () => void
   onChange?: (value: string) => void
   onInputChange?: (value: string) => void
   error?: boolean
   disabled?: boolean
   isCalendarOpen?: boolean
   selectsRange?: true | undefined
   classNameInput?: string
   customErrorMessage?: boolean
}

export type DatePickerHeaderProps = {
   date: Date
   decreaseMonth: () => void
   increaseMonth: () => void
   prevMonthButtonDisabled: boolean
   nextMonthButtonDisabled: boolean
}

export type DatePickerWithSingleDateProps = {
   selected: Date | null
   error?: boolean
   disabled?: boolean
   onChange: (date: Date | null) => void
   selectsRange?: undefined
   endDate?: undefined
   classNameInput?: string
   customErrorMessage?: boolean
   value?: string
   onInputChange?: (value: string) => void
}

export type DatePickerWithRangeDateProps = {
   startDate: Date | null
   error?: boolean
   disabled?: boolean
   onChange: (dates: [Date | null, Date | null]) => void
   selectsRange: true
   endDate: Date | null
   classNameInput?: string
   customErrorMessage?: boolean
}

export type DatePickerProps = DatePickerWithSingleDateProps | DatePickerWithRangeDateProps

const DatePickerInput = React.forwardRef<HTMLDivElement, DatePickerInputProps>(
   (
      {
         value = '',
         onClick,
         onChange,
         onInputChange,
         error,
         disabled,
         isCalendarOpen,
         selectsRange,
         classNameInput,
         customErrorMessage,
      },
      ref
   ) => {
      const [inputValue, setInputValue] = useState(value)
      const inputRef = useRef<HTMLInputElement>(null)

      useEffect(() => {
         setInputValue(value)
      }, [value])

      const formatInput = (val: string): string => {
         const digits = val.replace(/\D/g, '')

         if (digits.length === 0) return ''
         if (digits.length <= 2) return digits
         if (digits.length <= 4) return `${digits.slice(0, 2)}.${digits.slice(2)}`
         return `${digits.slice(0, 2)}.${digits.slice(2, 4)}.${digits.slice(4, 8)}`
      }

      const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
         const formattedValue = formatInput(e.target.value)
         setInputValue(formattedValue)
         onChange?.(formattedValue) // Для react-datepicker
         onInputChange?.(formattedValue) // Для родительского компонента
      }

      const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
         if (!/\d|Backspace|Delete|Tab|ArrowLeft|ArrowRight|ArrowUp|ArrowDown/.test(e.key)) {
            e.preventDefault()
         }
      }

      const handleIconClick = (e: React.MouseEvent) => {
         e.preventDefault()
         e.stopPropagation()
         if (!disabled && onClick) {
            onClick()
         }
      }

      return (
         <>
            <div
               ref={ref}
               className={cn(
                  `bg-dark-500 ${error && !disabled ? 'border-danger-500' : 'border-dark-300'} hover:border-dark-100 focus-within:border-accent-700 flex h-[36px] items-center justify-between rounded-[2px] border-[1px] px-[12px] py-[6px] transition-all duration-200 ease-in-out focus-within:border-[2px] focus-within:ring-0 focus-within:ring-offset-0 focus-within:outline-none ${!selectsRange && 'bg-dark-700 hover:bg-dark-500 active:bg-dark-500 focus-within:bg-dark-500'}`,
                  classNameInput,
                  disabled && 'cursor-not-allowed opacity-50'
               )}
            >
               <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={handleInputChange}
                  onKeyDown={handleInputKeyDown}
                  onClick={e => e.stopPropagation()}
                  disabled={disabled}
                  placeholder="dd.mm.yyyy"
                  className={`font-weight-regular text-font-size-m leading-line-height-m disabled:text-light-900 w-full cursor-text border-none bg-transparent p-0 outline-none ${
                     error && !disabled ? 'text-danger-500' : 'text-light-100'
                  }`}
               />
               <button
                  type="button"
                  onClick={handleIconClick}
                  disabled={disabled}
                  className="focus:ring-accent-700 ml-2 rounded p-1 focus:ring-2 focus:outline-none"
               >
                  {isCalendarOpen ? (
                     <CalendarIcon
                        className={`h-[24px] w-[24px] ${error && !disabled ? 'text-danger-500' : 'text-light-100'}`}
                     />
                  ) : (
                     <CalendarOutlineIcon
                        className={`h-[24px] w-[24px] ${error && !disabled ? 'text-danger-500' : 'text-light-100'}`}
                     />
                  )}
               </button>
            </div>
            {error && !customErrorMessage && !disabled && !selectsRange && !isCalendarOpen && (
               <span className="text-danger-500 text-[0.75rem] leading-[16px] font-[400]">
                  Error!
               </span>
            )}
            {error && !customErrorMessage && !disabled && selectsRange && !isCalendarOpen && (
               <span className="text-danger-500 text-[0.75rem] leading-[16px] font-[400]">
                  Error, select current month or last month
               </span>
            )}
         </>
      )
   }
)

DatePickerInput.displayName = 'DatePickerInput'

const DatePickerHeader = ({
   date,
   decreaseMonth,
   increaseMonth,
   prevMonthButtonDisabled,
   nextMonthButtonDisabled,
}: DatePickerHeaderProps) => (
   <div className="flex items-center justify-between">
      <span
         style={{
            fontWeight: 'var(--font-weight-bold)',
            lineHeight: 'var(--line-height-m)',
            color: 'var(--color-light-100)',
            padding: '6px 15px',
         }}
      >
         {date.toLocaleDateString('en-US', {
            month: 'long',
            year: 'numeric',
         })}
      </span>
      <div className="flex items-center justify-center">
         <button
            type="button"
            onClick={decreaseMonth}
            disabled={prevMonthButtonDisabled}
            className="bg-dark-100 hover:bg-accent-700 active:bg-dark-300 flex h-[36px] w-[36px] cursor-pointer items-center justify-center rounded-full"
         >
            <ArrowLeftIcon className="text-light-100 h-[20px] w-[20px]" />
         </button>
         <button
            type="button"
            onClick={increaseMonth}
            disabled={nextMonthButtonDisabled}
            className="bg-dark-100 hover:bg-accent-700 active:bg-dark-300 flex h-[36px] w-[36px] cursor-pointer items-center justify-center rounded-full"
         >
            <ArrowRightIcon className="text-light-100 h-[20px] w-[20px]" />
         </button>
      </div>
   </div>
)

const parseDateString = (dateString: string): Date | null => {
   if (!dateString || dateString.length < 10) return null

   const parts = dateString.split('.')
   if (parts.length !== 3) return null

   const day = parseInt(parts[0], 10)
   const month = parseInt(parts[1], 10)
   const year = parseInt(parts[2], 10)

   if (isNaN(day) || isNaN(month) || isNaN(year)) return null
   if (day < 1 || day > 31) return null
   if (month < 1 || month > 12) return null
   if (year < 1900 || year > 2100) return null

   const date = new Date(year, month - 1, day)

   if (date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day) {
      return date
   }

   return null
}

const formatDateToString = (date: Date | null): string => {
   if (!date || isNaN(date.getTime())) return ''

   const day = date.getDate().toString().padStart(2, '0')
   const month = (date.getMonth() + 1).toString().padStart(2, '0')
   const year = date.getFullYear()

   return `${day}.${month}.${year}`
}

export const DatePicker = (props: DatePickerProps) => {
   const [isOpen, setIsOpen] = useState(false)
   const [inputValue, setInputValue] = useState<string>('')
   const [selectedDate, setSelectedDate] = useState<Date | null>(null)

   // Инициализация из пропсов
   useEffect(() => {
      if ('selected' in props && props.selected) {
         const formatted = formatDateToString(props.selected)
         setInputValue(formatted)
         setSelectedDate(props.selected)
      } else if ('startDate' in props && props.startDate) {
         const formatted = formatDateToString(props.startDate)
         setInputValue(formatted)
         setSelectedDate(props.startDate)
      } else {
         setInputValue('')
         setSelectedDate(null)
      }
   }, [props])

   // Обработчик ручного ввода - ОБНОВЛЕН
   const handleInputChange = useCallback(
      (value: string) => {
         setInputValue(value)

         // Парсим дату независимо от длины
         const parsedDate = parseDateString(value)

         if (parsedDate) {
            // Обновляем selectedDate СРАЗУ
            setSelectedDate(parsedDate)

            // Вызываем onChange родителя
            if ('selectsRange' in props && props.selectsRange) {
               props.onChange([parsedDate, props.endDate])
            } else {
               props.onChange(parsedDate)
            }
         } else {
            // Если дата невалидна
            setSelectedDate(null)
            if ('selectsRange' in props && props.selectsRange) {
               props.onChange([null, props.endDate])
            } else {
               props.onChange(null)
            }
         }
      },
      [props]
   )

   // Обработчик выбора в календаре
   const handleCalendarChange = useCallback(
      (dates: Date | [Date | null, Date | null] | null) => {
         if ('selectsRange' in props && props.selectsRange) {
            const datesArray = dates as [Date | null, Date | null]
            const newDate = datesArray[0]

            setSelectedDate(newDate)
            if (newDate) {
               setInputValue(formatDateToString(newDate))
            } else {
               setInputValue('')
            }

            props.onChange(datesArray)
         } else {
            const singleDate = dates as Date | null
            setSelectedDate(singleDate)

            if (singleDate) {
               setInputValue(formatDateToString(singleDate))
            } else {
               setInputValue('')
            }

            props.onChange(singleDate)
         }
      },
      [props]
   )

   const getErrorState = () => {
      if ('selectsRange' in props && props.selectsRange) {
         return (!isOpen && !!props.startDate && !props.endDate) || !!props.error
      } else {
         return !!props.error
      }
   }

   // Ключевое: используем onInputChange чтобы передавать изменения из инпута в родительский компонент
   if (!('selectsRange' in props) || !props.selectsRange) {
      return (
         <div className="w-full">
            <ReactDatePicker
               selected={selectedDate}
               onChange={handleCalendarChange}
               customInput={
                  <DatePickerInput
                     value={inputValue}
                     onChange={value => {
                        const parsedDate = parseDateString(value)
                        if (parsedDate) {
                           handleCalendarChange(parsedDate)
                        }
                     }}
                     onInputChange={handleInputChange}
                     error={props.error}
                     isCalendarOpen={isOpen}
                     disabled={props.disabled}
                     classNameInput={props.classNameInput}
                     customErrorMessage={props.customErrorMessage}
                  />
               }
               renderCustomHeader={DatePickerHeader}
               calendarStartDay={1}
               calendarClassName="custom-calendar"
               wrapperClassName="w-full"
               popperClassName="custom-popper"
               showMonthDropdown
               showYearDropdown
               dropdownMode="select"
               dateFormat="dd.MM.yyyy"
               popperProps={{
                  strategy: 'fixed',
               }}
               popperPlacement="bottom-start"
               monthsShown={1}
               withPortal={false}
               onCalendarOpen={() => setIsOpen(true)}
               onCalendarClose={() => setIsOpen(false)}
               disabled={props.disabled}
               selectsMultiple={undefined}
               allowSameDay={true}
               shouldCloseOnSelect={true}
               onChangeRaw={e => {
                  if (!e) return
                  const target = e.target as HTMLInputElement | null
                  if (!target) return
                  const value = target.value || ''
                  handleInputChange(value)
               }}
            />
         </div>
      )
   } else {
      return (
         <div className="w-full">
            <ReactDatePicker
               selectsRange={true}
               startDate={selectedDate}
               endDate={props.endDate}
               selected={selectedDate}
               filterDate={date => {
                  if (selectedDate && !props.endDate) {
                     return date.getTime() !== selectedDate.getTime()
                  } else {
                     return true
                  }
               }}
               onChange={handleCalendarChange}
               customInput={
                  <DatePickerInput
                     value={inputValue}
                     onChange={value => {
                        const parsedDate = parseDateString(value)
                        if (parsedDate) {
                           handleCalendarChange([parsedDate, props.endDate])
                        }
                     }}
                     onInputChange={handleInputChange}
                     error={getErrorState()}
                     isCalendarOpen={isOpen}
                     disabled={props.disabled}
                     selectsRange={props.selectsRange}
                  />
               }
               renderCustomHeader={DatePickerHeader}
               calendarStartDay={1}
               calendarClassName="custom-calendar"
               wrapperClassName="w-full"
               popperClassName="custom-popper"
               showMonthDropdown
               showYearDropdown
               dropdownMode="select"
               dateFormat="dd.MM.yyyy"
               popperProps={{
                  strategy: 'fixed',
               }}
               popperPlacement="bottom-start"
               monthsShown={1}
               withPortal={false}
               onCalendarOpen={() => setIsOpen(true)}
               onCalendarClose={() => setIsOpen(false)}
               disabled={props.disabled}
               selectsMultiple={undefined}
               dayClassName={date => {
                  if (props.selectsRange && selectedDate && !props.endDate) {
                     const isStartDate = date.getTime() === selectedDate.getTime()
                     if (isStartDate) {
                        return 'no-border-radius'
                     }
                  }
                  return ''
               }}
               allowSameDay={true}
               shouldCloseOnSelect={true}
               onChangeRaw={e => {
                  if (!e) return
                  const target = e.target as HTMLInputElement | null
                  if (!target) return
                  const value = target.value || ''
                  handleInputChange(value)
               }}
            />
         </div>
      )
   }
}
