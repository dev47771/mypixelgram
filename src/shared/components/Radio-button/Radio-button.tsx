import * as RadioGroupPrimitive from '@radix-ui/react-radio-group'
import { ComponentPropsWithRef, ReactNode, Children, cloneElement, isValidElement } from 'react'
import { Typography } from '../Typography'
import { RadioItem } from './RadioItem'

/**
 * A customizable radio group component built with Radix UI
 *
 * @param groupLabel - Optional label for the entire radio group
 * @param groupDisabled - Disable entire radio group (default: false)
 * @param children - RadioItem components as children
 * @param defaultValue - Initially selected value
 * @param value - Controlled selected value
 * @param onValueChange - Callback function when selected value changes
 *
 * @example
 * ```tsx
 * // Basic usage
 * <RadioButton defaultValue="option1">
 *   <RadioItem value="option1" label="Option 1" />
 *   <RadioItem value="option2" label="Option 2" disabled/>
 * </RadioButton>
 * ```
 */
type Props = ComponentPropsWithRef<typeof RadioGroupPrimitive.Root> & {
   groupLabel?: string
   groupDisabled?: boolean
   children: ReactNode
}

export const RadioButton = (props: Props) => {
   const { children, groupLabel, groupDisabled, ...rest } = props

   return (
      <fieldset className="space-y-3" disabled={groupDisabled}>
         {groupLabel && (
            <Typography
               as="legend"
               variant="captionRegular"
               className={groupDisabled ? 'text-light-900' : 'text-light-100'}
            >
               {groupLabel}
            </Typography>
         )}

         <RadioGroupPrimitive.Root className="space-y-3" disabled={groupDisabled} {...rest}>
            {/**transfer props groupDisabled to all nested RadioItems (disabling all buttons at once)*/}
            {Children.map(children, child => {
               if (!isValidElement(child)) return child
               return cloneElement(child, { groupDisabled } as Partial<
                  React.ComponentProps<typeof RadioItem>
               >)
            })}
         </RadioGroupPrimitive.Root>
      </fieldset>
   )
}
