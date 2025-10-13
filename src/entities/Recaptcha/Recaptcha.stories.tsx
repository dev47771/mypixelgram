import { Recaptcha } from '@/entities/Recaptcha/Recaptcha'
import { Meta, StoryObj } from '@storybook/nextjs-vite'

const meta = {
   component: Recaptcha,
   tags: ['autodocs'],
   title: 'Components/Recaptcha',
} satisfies Meta<typeof Recaptcha>

export default meta
type Story = StoryObj<typeof meta>

const handleResult = (success: boolean) => {
   console.log(success)
}

export const RecaptchaResultInConsole: Story = {
   args: {
      onVerificationComplete: handleResult,
   },
}
