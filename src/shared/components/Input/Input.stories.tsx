import { Input } from '@/shared/components/Input'
import { Meta, StoryObj } from '@storybook/nextjs-vite'

const meta = {
   argTypes: {
      disabled: {
         type: 'boolean',
      },
   },
   component: Input,
   parameters: {
      layout: 'centered',
      backgrounds: {
         options: {
            dark: { name: 'Dark', value: 'var(--color-dark-900)' },
            light: { name: 'Light', value: 'var(--color-light-100)' },
         },
      },
   },
   tags: ['autodocs'],
   title: 'Components/Input',
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
   args: {
      label: 'label',
      placeholder: 'input',
      type: 'text',
   },
}

export const WithError: Story = {
   args: {
      label: 'label',
      placeholder: 'input',
      type: 'text',
      errorMessage: 'error',
   },
}

export const WithLongError: Story = {
   args: {
      label: 'label',
      placeholder: 'input',
      type: 'text',
      errorMessage:
         'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
   },
   render: args => {
      return (
         <div className="w-[400px]">
            <Input {...args} />
         </div>
      )
   },
}

export const InputPassword: Story = {
   args: {
      label: 'label',
      placeholder: 'input',
      type: 'password',
   },
}

export const InputPasswordWithError: Story = {
   args: {
      label: 'label',
      placeholder: 'input',
      type: 'password',
      errorMessage: 'error',
   },
}

export const InputSearch: Story = {
   args: {
      label: 'label',
      placeholder: 'input',
      type: 'search',
   },
}

export const InputSearchWithError: Story = {
   args: {
      label: 'label',
      placeholder: 'input',
      type: 'search',
      errorMessage: 'error',
   },
}

export const InputDisabled: Story = {
   args: {
      label: 'label',
      placeholder: 'input',
      type: 'text',
      disabled: true,
   },
}

export const InputPasswordDisabled: Story = {
   args: {
      label: 'label',
      placeholder: 'input',
      type: 'password',
      disabled: true,
   },
}

export const InputSearchDisabled: Story = {
   args: {
      label: 'label',
      placeholder: 'input',
      type: 'search',
      disabled: true,
   },
}
