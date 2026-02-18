'use client'

import React, { ChangeEvent, ComponentPropsWithRef, useId } from 'react'
import { Label } from '@/shared/components/Label'
import { Typography } from '@/shared/components/Typography'
import { cn } from '@/shared/lib'

export type TextareaProps = {
   label?: string
   resize?: 'none' | 'vertical' | 'horizontal' | 'both'
   errorMessage?: string
   onValueChange?: (value: string) => void
   showCount?: boolean
   maxLength?: number
} & ComponentPropsWithRef<'textarea'>

export const Textarea = ({
   label,
   resize = 'both',
   errorMessage,
   onValueChange,
   onChange,
   disabled,
   id,
   className,
   showCount,
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

   const currentLength = typeof rest.value === 'string' ? rest.value.length : 0

   return (
      <div className={'flex flex-col'}>
         {label && (
            <Label disabled={disabled} htmlFor={textareaId}>
               {label}
            </Label>
         )}
         <textarea
            className={cn(
               'bg-dark-500 min-h-21 w-full rounded-xs border px-3 pt-1.5 outline-none focus:ring-0',
               errorMessage
                  ? 'border-danger-500 focus:border-danger-500'
                  : 'border-dark-100 focus:border-accent-700 active:border-light-100 focus:border-2',
               disabled
                  ? 'placeholder-dark-100 text-dark-100'
                  : 'text-light-100 placeholder-light-900',
               {
                  'resize-none': resize === 'none',
                  'resize-x': resize === 'horizontal',
                  'resize-y': resize === 'vertical',
                  resize: resize === 'both',
               },
               className
            )}
            disabled={disabled}
            id={textareaId}
            onChange={onChangeHandler}
            {...rest}
         />
         {showCount && (
            <Typography className="text-light-900 text-right" variant="smallRegular">
               {currentLength}/{rest.maxLength}
            </Typography>
         )}
         {errorMessage && (
            <Typography className={'text-danger-500'} variant={'captionRegular'}>
               {errorMessage}
            </Typography>
         )}
      </div>
   )
}
