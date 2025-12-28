'use client'

import React, { ChangeEvent, ComponentPropsWithRef, useState } from 'react'
import { clsx } from 'clsx'
import { PinLocation, SearchIcon, VisibilityIcon, VisibilityOffIcon } from '@/shared/icons'
import { Label } from '@/shared/components/Label'
import { Typography } from '@/shared/components/Typography'

export type InputProps = {
   errorMessage?: string
   label?: string
   onValueChange?: (value: string) => void
   type?: 'password' | 'search' | 'text' | 'email' | 'location'
   errorPosition?: 'inline' | 'absolute'
} & ComponentPropsWithRef<'input'>

export const Input = ({
   type = 'text',
   onValueChange,
   onChange,
   label,
   value,
   errorMessage,
   className,
   disabled,
   required,
   errorPosition = 'inline',
   ...rest
}: InputProps) => {
   const [showPassword, setShowPassword] = useState(false)

   const isShowSearch = type === 'search'
   const isShowButton = type === 'password'
   const isShowLocation = type === 'location'

   const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
      if (onValueChange) {
         onValueChange(e.currentTarget.value)
      }
      if (onChange) {
         onChange(e)
      }
   }

   const handleSetShowPassword = () => {
      setShowPassword(prev => !prev)
   }

   const inputType = type === 'password' ? (showPassword ? 'text' : 'password') : type

   const inputClass = clsx(
      'w-full rounded-xs border-[1px] bg-transparent px-3 py-[6px] outline-none peer',
      type === 'search' && 'pl-[38px]',
      errorMessage ? 'border-danger-500' : 'border-dark-100',
      'hover:border-light-900',
      'focus:ring-2 focus:ring-accent-500 focus:border-transparent focus:text-light-100 focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:text-light-100 focus-visible:border-transparent active:ring-light-100',
      disabled
         ? 'pointer-events-none border-dark-300 text-dark-300 placeholder:text-dark-300'
         : 'text-light-900 placeholder:text-light-900'
   )

   return (
      <div className={clsx('flex w-full min-w-[250px] flex-col', className)}>
         {label && (
            <Label disabled={disabled}>
               {label}
               {required && <span className="text-danger-500">*</span>}
            </Label>
         )}
         <div className={'relative flex flex-col'}>
            <input
               className={inputClass}
               onChange={handleChangeInput}
               value={value ?? ''}
               type={inputType}
               disabled={disabled}
               {...rest}
            />

            {errorMessage && (
               <div
                  className={
                     errorPosition === 'absolute'
                        ? 'absolute top-9 right-0 -bottom-6 left-0'
                        : 'relative min-h-[24px] w-full'
                  }
               >
                  {errorMessage && !disabled && (
                     <Typography
                        variant={'captionRegular'}
                        className={clsx('text-danger-500 break-words whitespace-normal')}
                     >
                        {errorMessage}
                     </Typography>
                  )}
               </div>
            )}

            {isShowButton && (
               <button
                  className={clsx(
                     'text-light-100 absolute top-2 right-2 cursor-pointer bg-transparent p-0',
                     'peer-disabled:text-dark-300 peer-disabled:pointer-events-none'
                  )}
                  onMouseDown={e => {
                     e.preventDefault()
                     handleSetShowPassword()
                  }}
               >
                  {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
               </button>
            )}
            {isShowSearch && (
               <SearchIcon
                  className={clsx(
                     'text-light-900 absolute top-2 left-3 z-[-1]',
                     'peer-focus:text-light-100',
                     'peer-disabled:text-dark-300'
                  )}
               />
            )}
            {isShowLocation && (
               <PinLocation
                  className={clsx(
                     'text-light-900 absolute top-2 right-3 cursor-pointer',
                     'peer-focus:text-light-100',
                     'peer-disabled:text-dark-300'
                  )}
               />
            )}
         </div>
      </div>
   )
}
