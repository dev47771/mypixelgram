import { Label } from '@/shared/components/Label'
import { Meta, StoryObj } from '@storybook/nextjs-vite'

const meta = {
   component: Label,
   parameters: {
      layout: 'centered',
   },
   tags: ['autodocs'],
   title: 'Components/Label',
} satisfies Meta<typeof Label>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
   args: {
      children: 'label',
   },
}

export const LabelWithInput: Story = {
   render: () => {
      return (
         <div className="flex items-center gap-2">
            <Label htmlFor={'input'}>hello</Label>
            <input id={'input'} type="text" className="border-dark-100 rounded-[2px] border p-1" />
         </div>
      )
   },
}

export const LabelDisabled: Story = {
   render: () => {
      return (
         <div className="flex items-center gap-2">
            <Label htmlFor={'input3'} disabled>
               hello
            </Label>
            <input id={'input3'} type="text" className="border-dark-100 rounded-[2px] border p-1" />
         </div>
      )
   },
}
