import { ComponentPropsWithRef } from 'react'
import * as SliderRadix from '@radix-ui/react-slider'
import {
   RangeControlRange,
   RangeControlRoot,
   RangeControlThumb,
   RangeControlTrack,
} from '@/shared/components/RangeControl'

export const RangeControl = (props: ComponentPropsWithRef<typeof SliderRadix.Root>) => {
   return (
      <RangeControlRoot {...props}>
         <RangeControlTrack>
            <RangeControlRange />
         </RangeControlTrack>
         <RangeControlThumb />
      </RangeControlRoot>
   )
}
