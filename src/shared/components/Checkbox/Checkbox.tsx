import React, { ComponentPropsWithRef, useId } from 'react'
import * as CheckboxPrimitive from '@radix-ui/react-checkbox'
import { CheckedCheckboxIcon } from '@/shared/icons/CheckedCheckboxIcon'
import { Typography } from '../Typography'

export type CheckboxProps = {
   id?: string
   label?: string
} & ComponentPropsWithRef<typeof CheckboxPrimitive.Root>

export const Checkbox = ({ id, label, disabled, checked, ...rest }: CheckboxProps) => {
   const generatedId = useId()
   const checkboxId = id || generatedId

   return (
      <div
         className={`group flex w-fit items-center gap-[2px] ${disabled ? 'pointer-events-none' : 'cursor-pointer'}`}
      >
         <div
            className={`force-hover relative flex h-9 w-9 items-center justify-center rounded-full border-none bg-transparent shadow-none ring-0 transition-all duration-200 outline-none ${
               disabled
                  ? 'cursor-not-allowed'
                  : 'group-hover:bg-dark-300 group-active:bg-dark-100 group-focus-within:bg-dark-500 cursor-pointer'
            }`}
         >
            <CheckboxPrimitive.Root
               className="border-light-100 data-[state=checked]:bg-dark-900 data-[state=checked]:disabled:bg-light-700 data-[state=unchecked]:disabled:border-dark-100 flex h-4.5 w-4.5 cursor-pointer items-center justify-center rounded-[2px] border-2 bg-transparent outline-none data-[state=checked]:h-4 data-[state=checked]:w-4 data-[state=checked]:border-none"
               id={checkboxId}
               checked={checked}
               disabled={disabled}
               {...rest}
            >
               <CheckboxPrimitive.Indicator>
                  <CheckedCheckboxIcon disabled={disabled} />
               </CheckboxPrimitive.Indicator>
            </CheckboxPrimitive.Root>
         </div>
         {label && (
            <Typography
               htmlFor={checkboxId}
               as={'label'}
               variant={'captionRegular'}
               className={
                  disabled ? 'text-light-900 pointer-events-none' : 'text-light-100 cursor-pointer'
               }
            >
               {label}
            </Typography>
         )}
      </div>
   )
}
