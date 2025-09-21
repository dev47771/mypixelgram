'use client'

import * as RadioGroupPrimitive from '@radix-ui/react-radio-group'
import { ComponentPropsWithRef, createContext, ReactNode } from 'react'
import { Typography } from '../Typography'

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
 */

export const RadioGroupContext = createContext({ groupDisabled: false })

type Props = ComponentPropsWithRef<typeof RadioGroupPrimitive.Root> & {
   groupLabel?: string
   groupDisabled?: boolean
   children: ReactNode
}

export const RadioButton = (props: Props) => {
   const { children, groupLabel, groupDisabled, ...rest } = props

   return (
      <div className="space-y-3">
         {groupLabel && (
            <Typography
               as="legend"
               variant="captionRegular"
               className={groupDisabled ? 'text-light-900' : 'text-light-100'}
            >
               {groupLabel}
            </Typography>
         )}

         <RadioGroupContext.Provider value={{ groupDisabled: !!groupDisabled }}>
            <RadioGroupPrimitive.Root className="space-y-3" disabled={groupDisabled} {...rest}>
               {children}
            </RadioGroupPrimitive.Root>
         </RadioGroupContext.Provider>
      </div>
   )
}
