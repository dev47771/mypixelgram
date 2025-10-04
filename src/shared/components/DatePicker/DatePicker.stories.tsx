import { Meta, StoryObj } from '@storybook/nextjs-vite'
import { DatePicker } from './DatePicker'
import { useState } from 'react'
import { Button } from '../Button'
import 'react-datepicker/dist/react-datepicker.css'
import './styles/datePicker.css'

const meta = {
   component: DatePicker,
   tags: ['autodocs'],
   title: 'Components/DatePicker',
} satisfies Meta<typeof DatePicker>

export default meta
type Story = StoryObj<typeof DatePicker>

const DatePickerSingleDate = () => {
   const [singleDate, setSingleDate] = useState<Date | null>(null)
   return <DatePicker selected={singleDate} onChange={date => setSingleDate(date)} />
}

const DatePickerRange = () => {
   const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null])
   return (
      <DatePicker
         selectsRange={true}
         startDate={dateRange[0]}
         endDate={dateRange[1]}
         onChange={dates => setDateRange(dates)}
      />
   )
}

const DatePickerWithError = () => {
   const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null])
   return (
      <DatePicker
         selectsRange={true}
         startDate={dateRange[0]}
         endDate={dateRange[1]}
         onChange={dates => setDateRange(dates)}
         error={true}
      />
   )
}

const DatePickerDisabled = () => {
   const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null])
   return (
      <DatePicker
         selectsRange={true}
         startDate={dateRange[0]}
         endDate={dateRange[1]}
         onChange={dates => setDateRange(dates)}
         disabled={true}
      />
   )
}

const DatePickerInteractive = () => {
   const [selectsRange, setSelectsRange] = useState<true | undefined>()
   const [singleDate, setSingleDate] = useState<Date | null>(null)
   const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null])
   const [error, setError] = useState<boolean>(false)
   const [disabled, setDisabled] = useState<boolean>(false)
   return (
      <div className="flex gap-[200px]">
         <div className="mt-4 ml-4">
            {selectsRange ? (
               <DatePicker
                  selectsRange={true}
                  startDate={dateRange[0]}
                  endDate={dateRange[1]}
                  onChange={(dates: [Date | null, Date | null]) => setDateRange(dates)}
                  error={error}
                  disabled={disabled}
               />
            ) : (
               <DatePicker
                  selected={singleDate}
                  onChange={(dates: Date | null) => setSingleDate(dates)}
                  error={error}
                  disabled={disabled}
               />
            )}
         </div>

         <div className="mt-10 flex flex-col gap-4">
            <Button onClick={() => setSelectsRange(selectsRange ? undefined : true)}>
               {selectsRange ? 'Выбрать одну дату' : 'Выбрать диапазон дат'}
            </Button>
            <Button onClick={() => setError(!error)}>
               {error ? 'Убрать ошибку' : 'Добавить ошибку'}
            </Button>
            <Button onClick={() => setDisabled(!disabled)}>
               {disabled ? 'Разблокировать' : 'Заблокировать'}
            </Button>
            <>
               <span>
                  {selectsRange ? 'Сейчас ты выбираешь диапазон' : 'Сейчас ты выбираешь одну дату'}
               </span>
               <span>{error ? 'Ошибка включена' : 'Ошибка выключена'}</span>
               <span>{disabled ? 'DatePicker заблокирован' : 'DatePicker разблокирован'}</span>
            </>
         </div>
      </div>
   )
}

export const WithSingleDate: Story = {
   render: () => <DatePickerSingleDate />,
}

export const WithRange: Story = {
   render: () => <DatePickerRange />,
}

export const WithError: Story = {
   render: () => <DatePickerWithError />,
}

export const Disabled: Story = {
   render: () => <DatePickerDisabled />,
}

export const Interactive: Story = {
   render: () => <DatePickerInteractive />,
}
