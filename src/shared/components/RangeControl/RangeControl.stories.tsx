import { Meta, StoryObj } from '@storybook/nextjs-vite'
import {
   RangeControl,
   RangeControlRange,
   RangeControlRoot,
   RangeControlThumb,
   RangeControlTrack,
} from '@/shared/components/RangeControl'
import { useState } from 'react'

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

const RangeControlWithState = () => {
   const [value, setValue] = useState([0])

   const handleChangeRange = (valueToChange: number[]) => setValue(valueToChange)

   return (
      <RangeControl
         max={100}
         min={0}
         step={1}
         defaultValue={[50]}
         value={value}
         onValueChange={handleChangeRange}
      />
   )
}

const CustomSizeRangeControl = () => {
   const [value, setValue] = useState([0])

   const handleChangeRange = (valueToChange: number[]) => setValue(valueToChange)

   return (
      <RangeControlRoot value={value} className="w-full" onValueChange={handleChangeRange}>
         <RangeControlTrack className={'h-2 w-50'}>
            <RangeControlRange />
         </RangeControlTrack>
         <RangeControlThumb className={'size-4 ring-[5px]'} />
      </RangeControlRoot>
   )
}

export const Default: Story = {
   render: () => <RangeControlWithState />,
}

export const CustomSize: Story = {
   render: () => <CustomSizeRangeControl />,
}
