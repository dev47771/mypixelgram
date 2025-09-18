'use client'

import React, { ChangeEvent, ComponentPropsWithRef, useState } from 'react'
import { clsx } from 'clsx'
import { SearchIcon, VisibilityIcon, VisibilityOffIcon } from '@/shared/icons'
import { Label } from '@/shared/components/Label'
import { Typography } from '@/shared/components/Typography'

type Props = {
   errorMessage?: string
   label?: string
   onValueChange?: (value: string) => void
   type?: 'password' | 'search' | 'text'
} & ComponentPropsWithRef<'input'>

export const Input = ({
   type = 'text',
   onValueChange,
   label,
   errorMessage,
   className,
   disabled,
   ...rest
}: Props) => {
   const [showPassword, setShowPassword] = useState(false)

   const isShowSearch = type === 'search'
   const isShowButton = type === 'password'

   const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
      if (onValueChange) {
         onValueChange(e.currentTarget.value)
      }
   }

   const handleSetShowPassword = () => {
      setShowPassword(prev => !prev)
   }

   const inputType = type === 'password' ? (showPassword ? 'text' : 'password') : type

   const inputClass = clsx(
      'w-full rounded-xs border-2 bg-transparent px-3 py-[6px] outline-none peer',
      type === 'search' && 'pl-[38px]',
      errorMessage ? 'border-danger-500' : 'border-dark-100',
      'hover:border-light-900',
      'focus:ring-2 focus:ring-accent-500 focus:border-transparent focus:text-light-100 focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:text-light-100 active:ring-light-100',
      disabled
         ? 'pointer-events-none border-dark-300 text-dark-300 placeholder:text-dark-300'
         : 'text-light-900 placeholder:text-light-900',
      className
   )

   return (
      <div className={clsx('flex w-full min-w-[250px] flex-col')}>
         {label && <Label disabled={disabled}>{label}</Label>}
         <div className={'relative flex flex-col'}>
            <input
               className={inputClass}
               onChange={handleChangeInput}
               type={inputType}
               disabled={disabled}
               {...rest}
            />

            <div className={'relative min-h-[24px] w-full'}>
               {errorMessage && !disabled && (
                  <Typography
                     variant={'captionRegular'}
                     className={clsx('text-danger-500 break-words whitespace-normal')}
                  >
                     {errorMessage}
                  </Typography>
               )}
            </div>

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
         </div>
      </div>
   )
}
