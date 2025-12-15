import type { ComponentPropsWithRef } from 'react'
import * as TabsPrimitive from '@radix-ui/react-tabs'
import { clsx } from 'clsx'

const Tabs = ({ ...rest }: ComponentPropsWithRef<typeof TabsPrimitive.Root>) => {
   return <TabsPrimitive.Root {...rest} />
}
Tabs.displayName = TabsPrimitive.Root.displayName

const TabsList = ({
   className,
   children,
   ...rest
}: ComponentPropsWithRef<typeof TabsPrimitive.List>) => {
   return (
      <TabsPrimitive.List className={clsx('flex w-full justify-between', className)} {...rest}>
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
            'leading-m text-m border-b-dark-100 text-dark-100 w-1/4 cursor-pointer border-b py-1 font-semibold',

            'hover:[&:not([data-state=active]):not([data-disabled])]:bg-accent-900/15',
            'hover:data-[state=active]:[&:not([data-disabled])]:bg-accent-900/15',
            'active:data-[state=active]:[&:not([data-disabled])]:bg-accent-100/15',
            'data-[state=active]:text-accent-500 data-[state=active]:border-b-accent-500',
            'focus-visible:ring-accent-700 focus-visible:rounded-xs focus-visible:ring-2 focus-visible:outline-none',
            'data-[disabled]:text-dark-300 data-[disabled]:border-b-dark-300 data-[disabled]:cursor-not-allowed',
            'data-[state=active]:data-[disabled]:text-accent-900 data-[state=active]:data-[disabled]:border-b-accent-900',
            className
         )}
         {...rest}
      >
         {children}
      </TabsPrimitive.Trigger>
   )
}
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

type Props = {
   marginTop?: 24 | 30
} & ComponentPropsWithRef<typeof TabsPrimitive.Content>

const TabsContent = ({ marginTop = 24, children, className, ...rest }: Props) => {
   return (
      <TabsPrimitive.Content
         className={clsx(
            {
               'mt-[24px]': marginTop === 24,
               'mt-[30px]': marginTop === 30,
            },
            className
         )}
         {...rest}
      >
         {children}
      </TabsPrimitive.Content>
   )
}
TabsContent.displayName = TabsPrimitive.Content.displayName

export { Tabs, TabsList, TabsTrigger, TabsContent }
