import { Meta, StoryObj } from '@storybook/nextjs-vite'
import { RadioButton } from './Radio-button'
import { RadioItem } from './RadioItem'
import { useState } from 'react'

/**
 * children: null - error is disabled because Storybook tries to include all component props in the args type, including children
 */

const meta = {
   title: 'Components/RadioButton',
   component: RadioButton,
   tags: ['autodocs'],
   argTypes: {
      onValueChange: { action: 'valueChanged' },
   },
   args: {
      groupDisabled: false,
      children: null,
   },
} satisfies Meta<typeof RadioButton>

export default meta
type Story = StoryObj<typeof meta>

export const DefaultSelection: Story = {
   args: {
      defaultValue: '3',
   },
   render: args => (
      <RadioButton {...args}>
         <RadioItem value="1" label="Первый вариант" />
         <RadioItem value="2" label="Второй вариант" />
         <RadioItem value="3" label="Третий вариант" />
      </RadioButton>
   ),
}

export const NoDefaultSelection: Story = {
   args: {},
   render: args => (
      <RadioButton {...args}>
         <RadioItem value="1" label="Первый вариант" />
         <RadioItem value="2" label="Второй вариант" />
         <RadioItem value="3" label="Третий вариант" />
      </RadioButton>
   ),
}

export const WithGroupLabel: Story = {
   args: {
      defaultValue: '3',
      groupLabel: 'Список вариантов:',
   },
   render: args => (
      <RadioButton {...args}>
         <RadioItem value="1" label="Первый вариант" />
         <RadioItem value="2" label="Второй вариант" />
         <RadioItem value="3" label="Третий вариант" />
      </RadioButton>
   ),
}

export const FullDisabled: Story = {
   args: {
      groupDisabled: true,
   },
   render: args => (
      <RadioButton {...args}>
         <RadioItem value="1" label="Первый вариант" />
         <RadioItem value="2" label="Второй вариант" />
         <RadioItem value="3" label="Третий вариант" />
      </RadioButton>
   ),
}

export const WithDisabledOption: Story = {
   args: {
      defaultValue: '3',
   },
   render: args => (
      <RadioButton {...args}>
         <RadioItem value="1" label="Первый вариант" />
         <RadioItem value="2" label="Второй вариант" disabled />
         <RadioItem value="3" label="Третий вариант" />
      </RadioButton>
   ),
}

export const DefaultGetValue: Story = {
   args: {},
   render: args => {
      const [selectedValue, setSelectedValue] = useState(args.defaultValue)

      return (
         <div>
            <RadioButton
               {...args}
               value={selectedValue}
               onValueChange={setSelectedValue}
               groupLabel="Выберите вариант:"
            >
               <RadioItem value="1" label="Первый вариант" />
               <RadioItem value="2" label="Второй вариант" />
               <RadioItem value="3" label="Третий вариант" />
            </RadioButton>

            <div className="mt-4">Выбранное значение: {selectedValue}</div>
         </div>
      )
   },
}
