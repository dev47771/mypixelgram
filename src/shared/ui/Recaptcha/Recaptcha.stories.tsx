import { Recaptcha } from '@/shared/ui/Recaptcha/Recaptcha'
import { store } from '@/app/store'
import { Meta, StoryObj } from '@storybook/nextjs-vite'
import { Provider } from 'react-redux'

const meta = {
   component: Recaptcha,
   tags: ['autodocs'],
   title: 'Components/Recaptcha',
} satisfies Meta<typeof Recaptcha>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
   decorators: [
      Story => (
         <Provider store={store}>
            <Story />
         </Provider>
      ),
   ],
   args: {
      onVerificationComplete: () => {},
   },
}
