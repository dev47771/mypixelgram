import React, { ComponentPropsWithRef, useId } from 'react'
import { ArrowDownIcon, ArrowUpIcon } from '@/shared/icons'
import * as SelectPrimitive from '@radix-ui/react-select'
import { clsx } from 'clsx'
import { Label } from '@/shared/components/Label'

type Props = {
   label?: string
   id?: string
} & ComponentPropsWithRef<typeof SelectPrimitive.Root>

function Select({ label, id, disabled, ...props }: Props) {
   const selectId = useId()

   return (
      <>
         {label && <Label htmlFor={selectId}>{label}</Label>}
         <SelectPrimitive.Root disabled={disabled} data-slot="select" {...props} />
      </>
   )
}

function SelectGroup({ ...props }: React.ComponentProps<typeof SelectPrimitive.Group>) {
   return <SelectPrimitive.Group data-slot="select-group" {...props} />
}

function SelectValue({ ...props }: React.ComponentProps<typeof SelectPrimitive.Value>) {
   return <SelectPrimitive.Value data-slot="select-value" {...props} />
}

function SelectTrigger({
   className,
   size = 'default',
   children,
   ...props
}: React.ComponentProps<typeof SelectPrimitive.Trigger> & {
   size?: 'sm' | 'default'
}) {
   return (
      <SelectPrimitive.Trigger
         data-slot="select-trigger"
         data-size={size}
         className={clsx(
            'active:bg-dark-500 data-[state=open]:border-light-100 hover:text-light-900 text-light-100 focus:text-light-900 border-input border-dark-100 focus:border-accent-500 focus-visible:border-accent-500 data-[placeholder]:text-muted-foreground aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 dark:hover:bg-input/50 disabled:border-dark-100 disabled:text-dark-100 flex w-fit items-center justify-between gap-20 rounded-xs border px-3 py-2 text-base whitespace-nowrap transition-[color,box-shadow] outline-none focus:border-2 focus-visible:border-2 disabled:cursor-not-allowed data-[size=default]:h-9 data-[size=sm]:h-8 *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2',
            className || ''
         )}
         {...props}
      >
         {children}
         <SelectPrimitive.Icon asChild>
            <ArrowDownIcon color={'var(--color-light-100)'} />
         </SelectPrimitive.Icon>
      </SelectPrimitive.Trigger>
   )
}

function SelectContent({
   className,
   children,
   position = 'popper',
   ...props
}: React.ComponentProps<typeof SelectPrimitive.Content>) {
   return (
      <SelectPrimitive.Portal>
         <SelectPrimitive.Content
            data-slot="select-content"
            className={clsx(
               'active:bg-dark-500 bg-dark-500 border-light-100 bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 relative z-50 max-h-(--radix-select-content-available-height) min-w-[8rem] origin-(--radix-select-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-xs border',
               className || ''
            )}
            position={position}
            {...props}
         >
            <SelectPrimitive.Viewport
               className={clsx(
                  position === 'popper' &&
                     'h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)] scroll-my-1'
               )}
            >
               {children}
            </SelectPrimitive.Viewport>
         </SelectPrimitive.Content>
      </SelectPrimitive.Portal>
   )
}

function SelectLabel({ className, ...props }: React.ComponentProps<typeof SelectPrimitive.Label>) {
   return (
      <SelectPrimitive.Label
         data-slot="select-label"
         className={clsx('text-muted-foreground px-2 py-1.5 text-xs', className)}
         {...props}
      />
   )
}

function SelectItem({
   className,
   children,
   ...props
}: React.ComponentProps<typeof SelectPrimitive.Item>) {
   return (
      <SelectPrimitive.Item
         data-slot="select-item"
         className={clsx(
            "text-light-900 hover:text-accent-500 hover:bg-dark-300 focus:bg-accent focus:text-accent-foreground [&_svg:not([class*='text-'])]:text-muted-foreground relative flex w-full cursor-default items-center gap-2 py-1.5 pl-3 text-base outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2",
            className || ''
         )}
         {...props}
      >
         <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
      </SelectPrimitive.Item>
   )
}

export { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue }
