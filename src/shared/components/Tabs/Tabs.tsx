import type { ComponentPropsWithRef } from 'react'
import * as TabsPrimitive from '@radix-ui/react-tabs'
import { clsx } from 'clsx'

const Tabs = ({
   className,
   children,
   ...rest
}: ComponentPropsWithRef<typeof TabsPrimitive.Root>) => {
   return (
      <TabsPrimitive.Root className={clsx('', className)} {...rest}>
         {children}
      </TabsPrimitive.Root>
   )
}
Tabs.displayName = TabsPrimitive.Root.displayName

const TabsList = ({
   className,
   children,
   ...rest
}: ComponentPropsWithRef<typeof TabsPrimitive.List>) => {
   return (
      <TabsPrimitive.List className={clsx('mb-6 flex w-full justify-between', className)} {...rest}>
         {children}
      </TabsPrimitive.List>
   )
}
TabsList.displayName = TabsPrimitive.List.displayName

const TabsTrigger = ({
   children,
   className,
   ...rest
}: ComponentPropsWithRef<typeof TabsPrimitive.Trigger>) => {
   return (
      <TabsPrimitive.Trigger
         className={clsx(
            'leading-m text-m border-b-dark-300 text-dark-100 w-1/4 cursor-pointer border-b py-1 font-semibold',

            'hover:[&:not([data-state=active]):not([data-disabled])]:bg-accent-100',
            'hover:data-[state=active]:[&:not([data-disabled])]:bg-accent-100',
            'data-[state=active]:text-accent-500 data-[state=active]:border-b-accent-500',
            className
         )}
         {...rest}
      >
         {children}
      </TabsPrimitive.Trigger>
   )
}
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

const TabsContent = ({
   children,
   className,
   ...rest
}: ComponentPropsWithRef<typeof TabsPrimitive.Content>) => {
   return (
      <TabsPrimitive.Content className={clsx('', className)} {...rest}>
         {children}
      </TabsPrimitive.Content>
   )
}
TabsContent.displayName = TabsPrimitive.Content.displayName

export { Tabs, TabsList, TabsTrigger, TabsContent }
