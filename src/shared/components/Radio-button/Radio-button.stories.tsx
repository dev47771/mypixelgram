import { Meta, StoryObj } from '@storybook/nextjs-vite'
import RadioButton from './Radio-button'
import { useState } from 'react'

const arr = [
   { value: 'option 1', label: 'Option 1' },
   { value: 'option 2', label: 'Option 2' },
   { value: 'option 3', label: 'Option 3' },
]

const meta = {
   title: 'Components/RadioButton',
   component: RadioButton,
   tags: ['autodocs'],
   argTypes: {
      onValueChange: { action: 'valueChanged' }, // ← Правильное событие
   },
   args: {
      options: arr,
      defaultValue: 'option 1',
      groupDisabled: false,
   },
} satisfies Meta<typeof RadioButton>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const DefaultWithGroupLabel: Story = {
   args: {
      groupLabel: 'Choose an option',
   },
}

export const NoDefaultSelection: Story = {
   args: {
      defaultValue: '',
   },
}

export const WithDisabledOption: Story = {
   args: {
      options: [
         { value: 'option 1', label: 'Option 1' },
         { value: 'option 2', label: 'Option 2', disabled: true },
         { value: 'option 3', label: 'Option 3' },
      ],
   },
}

export const FullyDisabled: Story = {
   args: {
      options: arr,
      groupDisabled: true,
   },
}

export const ActiveState: Story = {
   decorators: [
      Story => (
         <div className="[&_.group]:[&>div>div:last-child]:bg-dark-100 [&_.group]:[&>div>div:last-child]:scale-100 [&_.group]:[&>div>div:last-child]:opacity-100">
            <Story />
         </div>
      ),
   ],
   args: {
      options: [{ value: 'option 1', label: 'Option 1' }],
   },
}

export const HoverState: Story = {
   decorators: [
      Story => (
         <div className="[&_.group]:[&>div>div:last-child]:bg-dark-300 [&_.group]:[&>div>div:last-child]:scale-100 [&_.group]:[&>div>div:last-child]:opacity-100">
            <Story />
         </div>
      ),
   ],
   args: {
      options: [{ value: 'option 1', label: 'Option 1' }],
   },
}

export const FocusState: Story = {
   decorators: [
      Story => (
         <div className="[&_.group]:[&>div>div:last-child]:bg-dark-500 [&_.group]:[&>div>div:last-child]:scale-100 [&_.group]:[&>div>div:last-child]:opacity-100">
            <Story />
         </div>
      ),
   ],
   args: {
      options: [{ value: 'option 1', label: 'Option 1' }],
   },
}

export const DefaultGetValue: Story = {
   args: {
      options: arr,
      defaultValue: '',
   },
   render: args => {
      const [selectedValue, setSelectedValue] = useState(args.defaultValue)
      const handleValueChange = (value: string) => {
         setSelectedValue(value)
      }
      return (
         <div>
            <RadioButton {...args} defaultValue={selectedValue} onValueChange={handleValueChange} />
            <div className="mt-4">Выбранное значение: {selectedValue}</div>
         </div>
      )
   },
}
