'use client'

import { ComponentPropsWithRef, useId } from 'react'
import { ArrowDownIcon } from '@/shared/icons'
import * as SelectPrimitive from '@radix-ui/react-select'
import { clsx } from 'clsx'
import { Label } from '@/shared/components/Label'
import { twMerge } from 'tailwind-merge'

type Props = {
   label?: string
   id?: string
   isPagination?: boolean
} & ComponentPropsWithRef<typeof SelectPrimitive.Trigger>

function Select({ disabled, ...props }: ComponentPropsWithRef<typeof SelectPrimitive.Root>) {
   return <SelectPrimitive.Root disabled={disabled} data-slot="select" {...props} />
}

function SelectGroup({ ...props }: ComponentPropsWithRef<typeof SelectPrimitive.Group>) {
   return <SelectPrimitive.Group data-slot="select-group" {...props} />
}

function SelectValue({ ...props }: ComponentPropsWithRef<typeof SelectPrimitive.Value>) {
   return <SelectPrimitive.Value data-slot="select-value" {...props} />
}

function SelectTrigger({ id, label, className, isPagination = false, children, ...props }: Props) {
   const generateId = useId()
   const selectId = id ?? generateId

   return (
      <>
         {label && <Label htmlFor={selectId}>{label}</Label>}
         <SelectPrimitive.Trigger
            id={selectId}
            data-slot="select-trigger"
            className={twMerge(
               'group text-light-100 border-dark-100 text-s flex w-fit cursor-pointer items-center justify-between rounded-xs border py-1.5 outline-none',

               'focus-visible:text-light-900 focus-visible:border-accent-500',
               'disabled:border-dark-100 disabled:text-dark-100 disabled:cursor-not-allowed',
               'active:bg-dark-500',
               'hover:text-light-900',

               'data-[state=open]:border-light-100 *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2',

               isPagination ? 'h-6 gap-0 px-1' : 'h-9 gap-2 px-3',

               className || ''
            )}
            {...props}
         >
            {children}
            <SelectPrimitive.Icon asChild>
               <ArrowDownIcon
                  className={clsx(
                     'transition-transform duration-200 ease-in-out group-data-[state=open]:rotate-180'
                  )}
                  color={'var(--color-light-100)'}
                  width={isPagination ? '16px' : '24px'}
                  height={isPagination ? '16px' : '24px'}
               />
            </SelectPrimitive.Icon>
         </SelectPrimitive.Trigger>
      </>
   )
}

function SelectContent({
   className,
   children,
   position = 'popper',
   ...props
}: ComponentPropsWithRef<typeof SelectPrimitive.Content>) {
   return (
      <SelectPrimitive.Portal>
         <SelectPrimitive.Content
            data-slot="select-content"
            className={clsx(
               'active:bg-dark-500 bg-dark-500 border-light-100 bg-popover relative z-50 min-w-[var(--radix-select-trigger-width)] overflow-x-hidden overflow-y-auto rounded-xs border',
               className || ''
            )}
            position={position}
            {...props}
         >
            <SelectPrimitive.Viewport
               className={clsx(
                  position === 'popper' &&
                     'h-[var(--radix-select-trigger-height)] w-full scroll-my-1'
               )}
            >
               {children}
            </SelectPrimitive.Viewport>
         </SelectPrimitive.Content>
      </SelectPrimitive.Portal>
   )
}

function SelectLabel({ className, ...props }: ComponentPropsWithRef<typeof SelectPrimitive.Label>) {
   return (
      <SelectPrimitive.Label
         data-slot="select-label"
         className={clsx('text-light-100 px-2 py-1.5 text-xs', className || '')}
         {...props}
      />
   )
}

function SelectItem({
   className,
   children,
   isPagination = false,
   ...props
}: ComponentPropsWithRef<typeof SelectPrimitive.Item> & { isPagination?: boolean }) {
   return (
      <SelectPrimitive.Item
         data-slot="select-item"
         className={clsx(
            'text-s relative flex w-full cursor-pointer items-center gap-2 py-1.5 outline-hidden select-none',

            'focus:bg-accent active:text-light-100 focus:text-accent-foreground',

            'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',

            "[&_svg:not([class*='text-'])]:text-muted-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2",
            {
               'text-light-100 hover:bg-dark-100 h-6 px-1.5': isPagination,
               'text-light-900 hover:text-accent-500 hover:bg-dark-300 px-3': !isPagination,
            },
            className || ''
         )}
         {...props}
      >
         <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
      </SelectPrimitive.Item>
   )
}

export { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue }
