import { Meta, StoryObj } from '@storybook/nextjs-vite'
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from '@/shared/components/Select/Select'
import { FlagRussiaIcon, FlagUKIcon } from '@/shared/icons'

const meta = {
   title: 'Components/Select',
   component: Select,
   tags: ['autodocs'],
   parameters: {
      layout: 'centered',
   },
   globals: {
      backgrounds: { value: 'dark' },
   },
   args: {
      children: (
         <>
            <SelectTrigger className="w-[180px]">
               <SelectValue placeholder="Select-box" />
            </SelectTrigger>
            <SelectContent>
               <SelectItem value="1">Select-box 1</SelectItem>
               <SelectItem value="2">Select-box 2</SelectItem>
               <SelectItem value="3">Select-box 3</SelectItem>
            </SelectContent>
         </>
      ),
      label: 'Select-box',
   },
} satisfies Meta<typeof Select>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const SelectWithSideRight: Story = {
   args: {
      children: (
         <>
            <SelectTrigger className="w-[180px]" size={'default'}>
               <SelectValue placeholder="Select-box" />
            </SelectTrigger>
            <SelectContent side="right" align="start">
               <SelectItem value="1">Select-box 1</SelectItem>
               <SelectItem value="2">Select-box 2</SelectItem>
               <SelectItem value="3">Select-box 3</SelectItem>
            </SelectContent>
         </>
      ),
   },
}

export const SelectDisabled: Story = {
   args: {
      disabled: true,
   },
}

export const SelectWithLanguage: Story = {
   args: {
      children: (
         <>
            <SelectTrigger className="w-[180px] !gap-6">
               <SelectValue />
            </SelectTrigger>
            <SelectContent>
               <SelectItem value="1">
                  <FlagRussiaIcon />
                  Russian
               </SelectItem>
               <SelectItem value="2">
                  <FlagUKIcon />
                  English
               </SelectItem>
            </SelectContent>
         </>
      ),
      defaultValue: '1',
   },
}
