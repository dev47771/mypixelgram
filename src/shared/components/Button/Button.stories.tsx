import { LogoutIcon } from '@/shared/icons'
import { Button } from '.'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'

const meta = {
   argTypes: {
      variant: {
         control: { type: 'radio' },
         options: ['primary', 'secondary', 'tertiary', 'link'],
      },
   },
   component: Button,
   tags: ['autodocs'],
   title: 'Components/UI/Button',
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
   args: {
      children: 'Button primary',
      disabled: false,
      variant: 'primary',
   },
}
export const PrimaryWithIcon: Story = {
   args: {
      children: (
         <>
            <LogoutIcon />
            Button primary
         </>
      ),
      disabled: false,
      variant: 'primary',
   },
}

export const Secondary: Story = {
   args: {
      children: 'Button secondary',
      disabled: false,
      variant: 'secondary',
   },
}
export const SecondaryWithIcon: Story = {
   args: {
      children: (
         <>
            <LogoutIcon />
            Button secondary
         </>
      ),
      disabled: false,
      style: {
         display: 'flex',
         gap: '10px',
      },
      variant: 'secondary',
   },
}

export const FullWidth: Story = {
   args: {
      children: 'Full Width Button',
      disabled: false,
      fullWidth: true,
      variant: 'primary',
   },
}
