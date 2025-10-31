'use client'

import React, { ChangeEvent, ComponentPropsWithRef, useId } from 'react'
import { Label } from '@/shared/components/Label'
import { clsx } from 'clsx'
import { Typography } from '@/shared/components/Typography'

export type TextareaProps = {
   label?: string
   errorMessage?: string
   onValueChange?: (value: string) => void
} & ComponentPropsWithRef<'textarea'>

export const Textarea = ({
   label,
   errorMessage,
   onValueChange,
   onChange,
   disabled,
   id,
   className,
   ...rest
}: TextareaProps) => {
   const generateId = useId()
   const textareaId = id ?? generateId

   const onChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
      if (onValueChange) {
         onValueChange(e.currentTarget.value)
      }

      if (onChange) {
         onChange(e)
      }
   }

   return (
      <div className={'flex flex-col'}>
         {label && (
            <Label disabled={disabled} htmlFor={textareaId}>
               {label}
            </Label>
         )}
         <textarea
            className={clsx(
               'bg-dark-500 min-h-21 w-full min-w-71 resize-none rounded-xs border px-3 pt-1.5 outline-none focus:ring-0',
               errorMessage
                  ? 'border-danger-500 focus:border-danger-500'
                  : 'border-dark-100 focus:border-accent-700 active:border-light-100 focus:border-2',
               disabled
                  ? 'placeholder-dark-100 text-dark-100'
                  : 'text-light-100 placeholder-light-900',
               className || ''
            )}
            disabled={disabled}
            id={textareaId}
            onChange={onChangeHandler}
            {...rest}
         />
         {errorMessage && (
            <Typography className={'text-danger-500'} variant={'captionRegular'}>
               {errorMessage}
            </Typography>
         )}
      </div>
   )
}
