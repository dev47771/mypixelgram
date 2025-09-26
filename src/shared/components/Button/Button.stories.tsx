import { LogoutIcon } from '@/shared/icons'
import { Button } from '.'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import Link from 'next/link'

const meta = {
   argTypes: {
      variant: {
         control: { type: 'radio' },
         options: ['primary', 'secondary', 'outlined', 'textButton'],
      },
   },
   component: Button,
   tags: ['autodocs'],
   title: 'Components/Button',
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

export const PrimaryAsLink: Story = {
   args: {
      children: <Link href={'#'}>Button as link</Link>,
      disabled: false,
      variant: 'primary',
      asChild: true,
   },
}

export const PrimaryDisabled: Story = {
   args: {
      children: 'Button primary',
      disabled: true,
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

export const SecondaryDisabled: Story = {
   args: {
      children: 'Button secondary',
      disabled: true,
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

export const Outlined: Story = {
   args: {
      children: 'Button outlined',
      disabled: false,
      variant: 'outlined',
   },
}

export const TextButton: Story = {
   args: {
      children: 'Button text',
      disabled: false,
      variant: 'textButton',
   },
}
