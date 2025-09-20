import * as RadioGroup from '@radix-ui/react-radio-group'
import { ComponentPropsWithoutRef, useState } from 'react'
import { Typography } from '../Typography'

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
      onValueChange?.(value) // ← Вызываем пользовательский callback
   }

   return (
      <fieldset className="">
         {/* Глобальное название через legend */}
         {groupLabel && (
            <Typography
               as="legend"
               variant="bodyRegular"
               className={`mb-3 ${groupDisabled ? 'text-light-900' : 'text-light-100'}`}
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
               <label
                  key={option.value}
                  htmlFor={option.id || option.value}
                  className={`group flex cursor-pointer items-center gap-3 ${option.disabled || groupDisabled ? 'text-light-900' : ''} `}
               >
                  {/* Обертка с псевдоэлементом */}
                  <div className="relative">
                     <RadioGroup.Item
                        value={option.value}
                        id={option.id || option.value}
                        disabled={option.disabled || groupDisabled}
                        className={`relative z-10 flex h-5 w-5 cursor-pointer items-center justify-center rounded-full border-2 transition-all duration-200 focus:outline-none ${
                           option.disabled || groupDisabled ? 'border-dark-100' : 'border-light-100'
                        } `}
                     >
                        <RadioGroup.Indicator
                           className={`h-[10px] w-[10px] rounded-full transition-all duration-200 ${
                              option.disabled || groupDisabled ? 'bg-dark-100' : 'bg-light-100'
                           } `}
                        />
                     </RadioGroup.Item>

                     {/* Серый background кружок */}
                     <div
                        className={`group-active:bg-dark-100 group-hover:bg-dark-300 group-focus-within:bg-dark-500 absolute -inset-2 scale-0 rounded-full opacity-0 transition-all duration-200 group-focus-within:scale-100 group-focus-within:opacity-100 group-hover:scale-100 group-hover:opacity-100 group-active:scale-100 group-active:opacity-100 ${
                           option.disabled || groupDisabled ? 'hidden' : ''
                        } `}
                     />
                  </div>

                  {/* <span className={`
                 ${option.disabled || groupDisabled ? 'text-light-900' : 'text-light-100'}
               `}>
                 {option.label}
               </span> */}

                  <Typography
                     as="span"
                     variant="bodyMedium"
                     className={` ${option.disabled || groupDisabled ? 'text-light-900' : 'text-light-100'} `}
                  >
                     {option.label}
                  </Typography>
               </label>
            ))}
         </RadioGroup.Root>
      </fieldset>
   )
}
