import { Label } from '@/shared/components/Label'
import { Meta, StoryObj } from '@storybook/nextjs-vite'
import { Typography } from '@/shared/components/Typography'

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

export const WithLabelTypography: Story = {
   render: () => {
      return (
         <div className="flex items-center gap-2">
            <Label htmlFor={'input2'}>
               <Typography variant="bodyBold">Email</Typography>
            </Label>
            <input id={'input2'} type="text" className="border-dark-100 rounded-[2px] border p-1" />
         </div>
      )
   },
}
