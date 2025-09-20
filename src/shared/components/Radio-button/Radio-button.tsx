import * as RadioGroup from '@radix-ui/react-radio-group'
import { ComponentPropsWithoutRef, useState } from 'react'
import { Typography } from '../Typography'
import { Label } from '../Label'
import clsx from 'clsx'

/**
 * A customizable radio group component built with Radix UI
 *
 * @remarks
 * This component provides an accessible radio group with hover, focus, and active states.
 * Supports disabled states for individual options or the entire group.
 *
 * @param options - Array of radio options to display
 * @param defaultValue - Initially selected value (default: '')
 * @param groupDisabled - Disable entire radio group (default: false)
 * @param groupLabel - Optional label for the entire radio group
 * @param onValueChange - Callback function when selected value changes
 *
 * @example
 * ```tsx
 * // Basic usage
 * <RadioButton
 *   options={[
 *     { value: 'option1', label: 'Option 1' },
 *     { value: 'option2', label: 'Option 2' }
 *   ]}
 *   defaultValue="option1"
 *   onValueChange={(value) => console.log(value)}
 * />
 * ```
 *
 * @example
 * ```tsx
 * // With group label and disabled state
 * <RadioButton
 *   options={[
 *     { value: 'option1', label: 'Option 1' },
 *     { value: 'option2', label: 'Option 2', disabled: true },
 *     { value: 'option3', label: 'Option 3' }
 *   ]}
 *   groupLabel="Choose an option"
 *   groupDisabled={false}
 * />
 * ```
 */
export type RadioOption = {
   value: string
   label: string
   disabled?: boolean
   id?: string
}

export type RadioGroupProps = {
   options: RadioOption[]
   defaultValue?: string
   groupDisabled?: boolean
   groupLabel?: string
   onValueChange?: (value: string) => void
} & Omit<
   ComponentPropsWithoutRef<'input'>,
   'value' | 'onChange' | 'checked' | 'defaultChecked' | 'dir'
>

export default function RadioButton({
   options,
   defaultValue = '',
   groupDisabled = false,
   groupLabel,
   onValueChange,
   ...rest
}: RadioGroupProps) {
   const [selectedValue, setSelectedValue] = useState(defaultValue)

   const handleValueChange = (value: string) => {
      setSelectedValue(value)
      onValueChange?.(value)
   }

   return (
      <fieldset className="">
         {groupLabel && (
            <Typography
               as="legend"
               variant="bodyRegular"
               className={clsx(
                  'mb-3',

                  groupDisabled ? 'text-light-900' : 'text-light-100'
               )}
            >
               {groupLabel}
            </Typography>
         )}

         <RadioGroup.Root
            value={selectedValue}
            onValueChange={handleValueChange}
            disabled={groupDisabled}
            className="flex flex-col gap-3"
            {...rest}
         >
            {options.map(option => (
               //wrapper for each radio button and label
               <div key={option.value} className="group flex items-center gap-3">
                  <div className="relative">
                     <RadioGroup.Item
                        value={option.value}
                        id={option.id || option.value}
                        disabled={option.disabled || groupDisabled}
                        className={clsx(
                           'relative z-10 flex h-5 w-5 cursor-pointer items-center justify-center',
                           'rounded-full border-2 transition-all duration-200 focus:outline-none',

                           option.disabled || groupDisabled ? 'border-dark-100' : 'border-light-100'
                        )}
                     >
                        <RadioGroup.Indicator
                           className={clsx(
                              'h-[10px] w-[10px] rounded-full transition-all duration-200',

                              option.disabled || groupDisabled ? 'bg-dark-100' : 'bg-light-100'
                           )}
                        />
                     </RadioGroup.Item>

                     <div
                        className={clsx(
                           'absolute -inset-2 rounded-full',
                           'scale-0 opacity-0',
                           'transition-all duration-200',

                           'group-hover:bg-dark-300 group-hover:scale-100 group-hover:opacity-100',
                           'group-active:bg-dark-100 group-active:scale-100 group-active:opacity-100',
                           'group-focus-within:bg-dark-500 group-focus-within:scale-100 group-focus-within:opacity-100',

                           option.disabled || groupDisabled ? 'hidden' : ''
                        )}
                     />
                  </div>
                  <Label
                     htmlFor={option.id || option.value}
                     className={clsx(
                        'group flex cursor-pointer items-center',

                        option.disabled || groupDisabled ? 'text-light-900' : ''
                     )}
                  >
                     <Typography
                        as="span"
                        variant="bodyMedium"
                        className={clsx(
                           option.disabled || groupDisabled ? 'text-light-900' : 'text-light-100'
                        )}
                     >
                        {option.label}
                     </Typography>
                  </Label>
               </div>
            ))}
         </RadioGroup.Root>
      </fieldset>
   )
}
