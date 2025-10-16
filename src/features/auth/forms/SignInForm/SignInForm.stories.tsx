import { Meta, StoryObj } from '@storybook/nextjs-vite'
import { SignInForm } from './SignInForm'

const meta = {
   title: 'Forms/SignInForm',
   component: SignInForm,
} satisfies Meta<typeof SignInForm>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
   args: {
      onSubmitAction: () => {},
      isLoading: true,
   },
}
