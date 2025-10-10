import { Meta, StoryObj } from '@storybook/nextjs-vite'
import { VerificationExpiredForm } from './VerificationExpiredForm'

const meta = {
   component: VerificationExpiredForm,
   tags: ['autodocs'],
   parameters: {
      layout: 'centered',
   },
   title: 'Forms/VerificationExpiredForm',
} satisfies Meta<typeof VerificationExpiredForm>

export default meta
type Story = StoryObj<typeof VerificationExpiredForm>

export const VerificationExpired: Story = {
   args: { onSubmit: x => x },
}
