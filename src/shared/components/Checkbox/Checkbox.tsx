import React, { ComponentPropsWithRef, useId } from 'react'
import * as CheckboxPrimitive from '@radix-ui/react-checkbox'
import { CheckedCheckboxIcon } from '@/shared/icons/CheckedCheckboxIcon'
import { Typography } from '../Typography'
import type { CheckedState } from '@radix-ui/react-checkbox'
import { RecaptchaSuccessIcon } from '@/shared/icons'
import { RecaptchaSpinner } from '@/entities/Recaptcha/RecaptchaSpinner'

export type CheckboxProps = {
   id?: string
   label?: string
   variant?: 'default' | 'recaptcha'
} & ComponentPropsWithRef<typeof CheckboxPrimitive.Root>

export const Checkbox = ({
   id,
   variant = 'default',
   checked,
   label,
   disabled,
   ...rest
}: CheckboxProps) => {
   const generatedId = useId()
   const checkboxId = id || generatedId

   function variantRootStyle(variant: CheckboxProps['variant']) {
      if (variant === 'recaptcha') {
         return 'data-[state=checked]:bg-transperent bg-light-100 flex h-5 w-5 cursor-pointer items-center justify-center rounded-xs border border-[#B7B7B7] data-[state=checked]:h-5 data-[state=checked]:w-5 data-[state=checked]:border-none'
      }
      return 'border-light-100 data-[state=checked]:bg-dark-900 data-[state=checked]:disabled:bg-light-700 data-[state=unchecked]:disabled:border-dark-100 flex h-4.5 w-4.5 cursor-pointer items-center justify-center rounded-[2px] border-2 bg-transparent outline-none data-[state=checked]:h-4 data-[state=checked]:w-4 data-[state=checked]:border-none'
   }

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
               className={variantRootStyle(variant)}
               id={checkboxId}
               checked={checked}
               disabled={disabled}
               {...rest}
            >
               <CheckboxPrimitive.Indicator>
                  {getIconVariant(variant, checked, disabled)}
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

function getIconVariant(
   variant: CheckboxProps['variant'],
   checked: CheckedState = false,
   disabled?: boolean
) {
   if (variant === 'recaptcha' && checked === true) {
      return <RecaptchaSuccessIcon />
   }
   if (variant === 'recaptcha' && checked === 'indeterminate') {
      return <RecaptchaSpinner />
   }
   return <CheckedCheckboxIcon disabled={disabled} />
}
