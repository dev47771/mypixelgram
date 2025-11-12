import { ComponentPropsWithRef } from 'react'
import * as SliderRadix from '@radix-ui/react-slider'

type Props = {} & ComponentPropsWithRef<typeof SliderRadix.Root>

export const RangeControl = (props: Props) => {
   return <SliderRadix.Root {...props}></SliderRadix.Root>
}
