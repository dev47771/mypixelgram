import { Provider } from 'react-redux'
import { ForgotPasswordForm } from './ForgotPasswordForm'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { store } from '@/app/store'

const meta = {
   component: ForgotPasswordForm,
   tags: ['autodocs'],
   title: 'Forms/ForgotPasswordForm',
   decorators: [
      Story => (
         <Provider store={store}>
            <Story />
         </Provider>
      ),
   ],
} satisfies Meta<typeof ForgotPasswordForm>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
   args: { onSubmitAction: x => x },
}
