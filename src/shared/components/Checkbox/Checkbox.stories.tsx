import { Meta, StoryObj } from '@storybook/nextjs-vite'
import { UICheckbox } from './Checkbox'

const meta: Meta<typeof UICheckbox> = {
   title: 'UI/UICheckbox',
   component: UICheckbox,
}

export default meta
type Story = StoryObj<typeof meta>

export const Checked: Story = {
   args: {
      id: 'checkbox-checked',
      label: 'Checked Check-box',
      checked: true,
   },
}

export const Unchecked: Story = {
   args: {
      id: 'checkbox-unchecked',
      label: 'Unchecked Check-box',
      checked: false,
   },
}

export const DisabledChecked: Story = {
   args: {
      id: 'checkbox-disabled',
      label: 'Disabled checked Check-box',
      checked: true,
      disabled: true,
   },
}

export const DisabledUnchecked: Story = {
   args: {
      id: 'checkbox-disabled',
      label: 'Disabled unchecked Check-box',
      checked: false,
      disabled: true,
   },
}
