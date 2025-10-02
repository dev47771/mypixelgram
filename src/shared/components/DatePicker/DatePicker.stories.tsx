import { Meta, StoryObj } from '@storybook/nextjs-vite'
import { DatePicker } from './DatePicker'
import { useState } from 'react'
import 'react-datepicker/dist/react-datepicker.css'

const meta = {
   component: DatePicker,
   tags: ['autodocs'],
   title: 'Components/DatePicker',
} satisfies Meta<typeof DatePicker>

export default meta
type Story = StoryObj<typeof DatePicker>

// Создаем отдельные компоненты для каждой истории
const DatePickerInteractive = () => {
   const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null])
   return <DatePicker startDate={dateRange[0]} endDate={dateRange[1]} onChange={setDateRange} />
}

const DatePickerWithError = () => {
   const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null])
   return (
      <DatePicker
         startDate={dateRange[0]}
         endDate={dateRange[1]}
         onChange={setDateRange}
         error={true}
      />
   )
}

const DatePickerDisabled = () => {
   const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null])
   return (
      <DatePicker
         startDate={dateRange[0]}
         endDate={dateRange[1]}
         onChange={setDateRange}
         disabled={true}
      />
   )
}

export const Default: Story = {
   render: () => <DatePickerInteractive />,
}

export const WithError: Story = {
   render: () => <DatePickerWithError />,
}

export const Disabled: Story = {
   render: () => <DatePickerDisabled />,
}
