import { EmailSentModal } from './EmailSentModal'
import { Meta, StoryObj } from '@storybook/nextjs-vite'

const meta = {
   component: EmailSentModal,
   tags: ['autodocs'],
   title: 'Modals/EmailSentModal',
} satisfies Meta<typeof EmailSentModal>

export default meta
type Story = StoryObj<typeof EmailSentModal>

export const Default: Story = {
   args: {
      email: 'test@test.com',
   },
}
