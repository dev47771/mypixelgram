import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { CroppingModal } from '.'
import picture from './../../../../../../public/404.jpg'

const meta = {
   component: CroppingModal,
   tags: ['autodocs'],
   title: 'Modals/CroppingModal',
} satisfies Meta<typeof CroppingModal>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
   args: {
      isOpen: true,
      onOpenChange: x => x,
      image: picture,
   },
   render: args => {
      return <CroppingModal {...args} />
   },
}
