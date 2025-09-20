import { Meta, StoryObj } from '@storybook/nextjs-vite'
import RadioButton from './Radio-button'
import { userEvent, within } from '@storybook/test'

const arr = [
   { value: 'option1', label: 'Option 1' },
   { value: 'option2', label: 'Option 2' },
   { value: 'option3', label: 'Option 3' },
]

const meta = {
   title: 'Components/RadioButton',
   component: RadioButton,
   tags: ['autodocs'],
   argTypes: {
      onValueChange: { action: 'valueChanged' }, // ← Правильное событие
   },
   args: {
      // Аргументы для ГРУППЫ радио-кнопок
      options: arr,
      defaultValue: 'option1',
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
      defaultValue: '', // ← Ничего не выбрано по умолчанию
   },
}

export const WithDisabledOption: Story = {
   args: {
      options: [
         { value: 'option1', label: 'Option 1' },
         { value: 'option2', label: 'Option 2', disabled: true },
         { value: 'option3', label: 'Option 3' },
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
      options: [{ value: 'option1', label: 'Option 1' }],
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
      options: [{ value: 'option1', label: 'Option 1' }],
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
      options: [{ value: 'option1', label: 'Option 1' }],
   },
}
