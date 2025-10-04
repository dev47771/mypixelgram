import { ArrowLeftIcon, ArrowRightIcon, CalendarIcon, CalendarOutlineIcon } from '@/shared/icons'
import React, { useState } from 'react'
import ReactDatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import './styles/datePicker.css'

export type DatePickerInputProps = {
   value?: string
   onClick?: () => void
   error?: boolean
   disabled?: boolean
   isCalendarOpen?: boolean
   selectsRange?: true | undefined
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
}

export type DatePickerWithRangeDateProps = {
   startDate: Date | null
   error?: boolean
   disabled?: boolean
   onChange: (dates: [Date | null, Date | null]) => void
   selectsRange: true
   endDate: Date | null
}

export type DatePickerProps = DatePickerWithSingleDateProps | DatePickerWithRangeDateProps

const DatePickerInput = React.forwardRef<HTMLButtonElement, DatePickerInputProps>(
   ({ value, onClick, error, disabled, isCalendarOpen, selectsRange }, ref) => {
      return (
         <>
            <button
               type="button"
               ref={ref}
               onClick={disabled ? undefined : onClick}
               onMouseDown={e => {
                  if (disabled) return e.preventDefault()
                  ;(e.currentTarget as HTMLButtonElement).blur()
               }}
               disabled={disabled}
               className={`bg-dark-500 border-dark-300 hover:border-dark-100 focus:border-accent-700 flex h-9 w-fit cursor-pointer items-center gap-[23px] rounded-[2px] border-[1px] px-[12px] py-[6px] transition-all duration-200 ease-in-out focus:border-[2px] focus:ring-0 focus:ring-offset-0 focus:outline-none ${!selectsRange && 'bg-dark-700 hover:bg-dark-500 active:bg-dark-500 focus:bg-dark-500'} ${error && !disabled && 'bg-dark-500 border-danger-500'} `}
            >
               <span
                  className={`font-weight-regular text-font-size-m leading-line-height-m disabled:text-light-900 ${
                     error && !disabled ? 'text-danger-500' : 'text-light-100'
                  }`}
               >
                  {value || 'dd/mm/yyyy'}
               </span>
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
            {error && !disabled && !selectsRange && !isCalendarOpen && (
               <span className="text-danger-500 text-[0.75rem] leading-[16px] font-[400]">
                  Error!
               </span>
            )}
            {error && !disabled && selectsRange && !isCalendarOpen && (
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
            onClick={decreaseMonth}
            disabled={prevMonthButtonDisabled}
            className="bg-dark-100 hover:bg-accent-700 active:bg-dark-300 flex h-[36px] w-[36px] cursor-pointer items-center justify-center rounded-full"
         >
            <ArrowLeftIcon className="text-light-100 h-[20px] w-[20px]" />
         </button>

         <button
            onClick={increaseMonth}
            disabled={nextMonthButtonDisabled}
            className="bg-dark-100 hover:bg-accent-700 active:bg-dark-300 flex h-[36px] w-[36px] cursor-pointer items-center justify-center rounded-full"
         >
            <ArrowRightIcon className="text-light-100 h-[20px] w-[20px]" />
         </button>
      </div>
   </div>
)

export const DatePicker = (props: DatePickerProps) => {
   const [isOpen, setIsOpen] = useState(false)

   const handleChange = (dates: Date | [Date | null, Date | null] | null) => {
      if ('selectsRange' in props && props.selectsRange) {
         props.onChange(dates as [Date | null, Date | null])
      } else {
         props.onChange(dates as Date | null)
      }
   }

   const getErrorState = () => {
      if ('selectsRange' in props && props.selectsRange) {
         return (!isOpen && !!props.startDate && !props.endDate) || !!props.error
      } else {
         return !!props.error
      }
   }

   if ('selectsRange' in props && props.selectsRange) {
      return (
         <div className="w-full">
            <ReactDatePicker
               selectsRange={true}
               startDate={props.startDate}
               endDate={props.endDate}
               filterDate={date => {
                  if (props.startDate && !props.endDate) {
                     return date.getTime() !== props.startDate.getTime()
                  } else {
                     return true
                  }
               }}
               onChange={handleChange}
               customInput={
                  <DatePickerInput
                     error={getErrorState()}
                     isCalendarOpen={isOpen}
                     disabled={props.disabled}
                     selectsRange={props.selectsRange}
                  />
               }
               renderCustomHeader={DatePickerHeader}
               calendarStartDay={1}
               calendarClassName=""
               wrapperClassName="w-full"
               popperClassName=""
               showMonthDropdown
               showYearDropdown
               dropdownMode="select"
               dateFormat="dd/MM/yyyy"
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
                  if (props.selectsRange && props.startDate && !props.endDate) {
                     const isStartDate = date.getTime() === props.startDate.getTime()
                     if (isStartDate) {
                        return 'no-border-radius'
                     }
                  }
                  return ''
               }}
            />
         </div>
      )
   } else {
      return (
         <div className="w-full">
            <ReactDatePicker
               selected={props.selected}
               onChange={handleChange}
               customInput={
                  <DatePickerInput
                     error={props.error}
                     isCalendarOpen={isOpen}
                     disabled={props.disabled}
                  />
               }
               renderCustomHeader={DatePickerHeader}
               calendarStartDay={1}
               calendarClassName=""
               wrapperClassName="w-full"
               popperClassName=""
               showMonthDropdown
               showYearDropdown
               dropdownMode="select"
               dateFormat="dd/MM/yyyy"
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
            />
         </div>
      )
   }
}
