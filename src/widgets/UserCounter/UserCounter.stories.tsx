import { Meta, StoryObj } from '@storybook/nextjs-vite'
import { UserCounter } from './UserCounter'

const meta = {
   title: 'Widgets/UserCounter',
   component: UserCounter,
   tags: ['autodocs'],
   parameters: {
      layout: 'centered',
   },
} satisfies Meta<typeof UserCounter>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
   args: {
      totalCount: 146,
   },
   render: args => (
      <div className={'w-[500px]'}>
         <UserCounter {...args} />
      </div>
   ),
}

export const WithError: Story = {
   args: {
      totalCount: null,
   },
   render: args => (
      <div className={'w-[500px]'}>
         <UserCounter {...args} />
      </div>
   ),
}
