import { Meta, StoryObj } from '@storybook/nextjs-vite'
import { RangeControl } from '@/shared/components/RangeControl'

const meta = {
   component: RangeControl,
   parameters: {
      layout: 'centered',
   },
   tags: ['autodocs'],
   title: 'Components/RangeControl',
} satisfies Meta<typeof RangeControl>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
