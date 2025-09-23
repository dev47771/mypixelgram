import { Meta, StoryObj } from '@storybook/nextjs-vite'
import { fn } from 'storybook/test'
import { Textarea } from '@/shared/components/Textarea/'
import { ComponentPropsWithRef, useState } from 'react'

const meta = {
   title: 'Components/Textarea',
   component: Textarea,
   tags: ['autodocs'],
   parameters: {
      layout: 'centered',
   },
   globals: {
      backgrounds: { value: 'dark' },
   },
   args: {
      label: 'Text-area',
      placeholder: 'Text-area',
      onValueChange: fn(),
   },
} satisfies Meta<typeof Textarea>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Active: Story = {
   args: {
      defaultValue: 'Some text',
      className: 'border-light-100',
   },
}

export const Invalid: Story = {
   args: {
      defaultValue: 'Some text',
      errorMessage: 'Error text',
   },
}

export const Focus: Story = {
   args: {
      defaultValue: 'Some text',
      autoFocus: true,
   },
}

export const Disabled: Story = {
   args: {
      disabled: true,
   },
}

const ControlledTextarea = (args: ComponentPropsWithRef<typeof Textarea>) => {
   const [value, setValue] = useState('')

   return <Textarea {...args} label="Controlled Textarea" value={value} onValueChange={setValue} />
}

export const Controlled: Story = {
   render: args => <ControlledTextarea {...args} />,
}
