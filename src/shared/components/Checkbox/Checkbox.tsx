import React, { ComponentPropsWithRef, useId } from 'react'
import * as Checkbox from '@radix-ui/react-checkbox'
import { CheckedCheckboxIcon } from '@/shared/icons/CheckedCheckboxIcon'
import { Typography } from '../Typography'

export type UICheckboxProps = {
   id?: string
   label?: string
   checked?: Checkbox.CheckedState
   disabled?: boolean
} & ComponentPropsWithRef<typeof Checkbox.Root>

export const UICheckbox = ({ id, label, checked, disabled, ...rest }: UICheckboxProps) => {
   const generatedId = useId()
   const checkboxId = id || generatedId

   return (
      <div className="flex w-fit items-center gap-[2px]">
         <label
            htmlFor={checkboxId}
            className={`force-hover relative flex h-9 w-9 cursor-not-allowed items-center justify-center rounded-full border-none bg-transparent shadow-none ring-0 transition-all duration-200 outline-none ${!disabled && 'hover:bg-dark-300 active:bg-dark-100 focus-within:bg-dark-500 cursor-pointer'} `}
         >
            <Checkbox.Root
               className="border-light-100 border-light-500 data-[state=checked]:bg-dark-900 data-[state=checked]:disabled:bg-light-700 data-[state=unchecked]:disabled:border-dark-100 flex h-4.5 w-4.5 cursor-pointer items-center justify-center rounded-[2px] border-2 bg-transparent outline-none data-[state=checked]:h-4 data-[state=checked]:w-4 data-[state=checked]:border-none data-[state=checked]:disabled:cursor-not-allowed data-[state=unchecked]:disabled:cursor-not-allowed"
               id={checkboxId}
               checked={checked}
               disabled={disabled}
               {...rest}
            >
               <Checkbox.Indicator>
                  <CheckedCheckboxIcon disabled={disabled} />
               </Checkbox.Indicator>
            </Checkbox.Root>
         </label>
         {label && (
            <Typography
               htmlFor={checkboxId}
               as={'label'}
               variant={'captionRegular'}
               className={
                  disabled ? 'text-light-900 cursor-not-allowed' : 'text-light-100 cursor-pointer'
               }
            >
               {label}
            </Typography>
         )}
      </div>
   )
}
