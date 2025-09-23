import * as Icons from '../index'
import { Meta, StoryObj } from '@storybook/nextjs-vite'

const meta = {
   title: 'Icons',
   tags: ['autodocs'],
   parameters: {
      layout: 'fullscreen',
   },
} satisfies Meta<object>

export default meta
type Story = StoryObj<typeof meta>

export const AllIcons: Story = {
   render: () => (
      <div className="bg-light-700 grid grid-cols-6 gap-6 p-6">
         {Object.entries(Icons).map(([name, Icon]) => (
            <div key={name} className="flex flex-col items-center" title={name}>
               <Icon className="h-6 w-6" count={3} />
               <span className={'cursor-text text-sm'}>{name}</span>
            </div>
         ))}
      </div>
   ),
}
