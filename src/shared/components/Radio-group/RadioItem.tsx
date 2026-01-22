'use client'

import * as RadioGroupPrimitive from '@radix-ui/react-radio-group'
import clsx from 'clsx'
import { ComponentPropsWithRef, useContext } from 'react'
import { Label } from '../Label'
import { RadioGroupContext } from './Radio-group'

/**
 * Individual radio item component for use within RadioButton
 *
 * @param label - Display text for the radio option
 * @param value - Unique value for the radio option
 * @param id - Optional custom id (defaults to value)
 * @param disabled - Disable this specific radio item
 * @param groupDisabled - Inherited disabled state from parent RadioButton
 *
 */

type Props = ComponentPropsWithRef<typeof RadioGroupPrimitive.Item> & {
   label: string
   id?: string
   groupDisabled?: boolean
}

export const RadioItem = (props: Props) => {
   const { groupDisabled } = useContext(RadioGroupContext)
   const { disabled, label, id, value, ...rest } = props

   const isDisabled = disabled || groupDisabled

   return (
      <div className="group flex items-center gap-3 p-1.5">
         <div
            className={clsx(
               'relative',
               !isDisabled &&
                  [
                     'before:absolute before:-inset-2 before:rounded-full',
                     'before:scale-0 before:opacity-0',
                     'before:transition-all before:duration-200',
                     'before:-z-10',
                     'hover:before:bg-dark-300 hover:before:scale-100 hover:before:opacity-100',
                     'active:before:bg-dark-100 active:before:scale-100 active:before:opacity-100',
                     'group-focus-within:before:bg-dark-500 group-focus-within:before:scale-100 group-focus-within:before:opacity-100',
                  ].join(' ')
            )}
         >
            <RadioGroupPrimitive.Item
               disabled={isDisabled}
               className={clsx(
                  'relative z-10 flex h-5 w-5 items-center justify-center',
                  'rounded-full border-2 transition-all duration-200 focus:outline-none',
                  isDisabled
                     ? 'border-dark-100 cursor-not-allowed'
                     : 'border-light-100 cursor-pointer'
               )}
               value={value}
               id={id || value}
               {...rest}
            >
               <RadioGroupPrimitive.Indicator
                  className={clsx(
                     'h-[10px] w-[10px] rounded-full transition-all duration-200',
                     isDisabled ? 'bg-dark-100' : 'bg-light-100'
                  )}
               />
            </RadioGroupPrimitive.Item>
         </div>

         <Label
            htmlFor={id || value}
            className={clsx(
               'flex items-center',
               isDisabled ? '!text-light-900 cursor-default' : '!text-light-100 cursor-pointer'
            )}
         >
            {label}
         </Label>
      </div>
   )
}
