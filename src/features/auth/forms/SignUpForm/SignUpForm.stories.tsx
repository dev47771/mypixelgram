import { Meta, StoryObj } from '@storybook/nextjs-vite'
import { SignUpForm } from './SignUpForm'

const meta = {
   component: SignUpForm,
   tags: ['autodocs'],
   parameters: {
      layout: 'centered',
   },
   title: 'Forms/SignUp',
} satisfies Meta<typeof SignUpForm>

export default meta
type Story = StoryObj<typeof SignUpForm>

export const Default: Story = {
   args: { onSubmitAction: async () => true },
}
