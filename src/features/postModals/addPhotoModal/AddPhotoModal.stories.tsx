import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { AddPhotoModal } from '@/features/postModals/addPhotoModal'

const meta = {
   component: AddPhotoModal,
   tags: ['autodocs'],
   title: 'Modals/AddPhotoModal',
} satisfies Meta<typeof AddPhotoModal>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
