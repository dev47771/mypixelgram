import type { ComponentPropsWithRef } from 'react'
import * as TabsPrimitive from '@radix-ui/react-tabs'

const Tabs = TabsPrimitive.Root

const TabsList = ({ children, ...rest }: ComponentPropsWithRef<typeof TabsPrimitive.List>) => {
   return <TabsPrimitive.List {...rest}>{children}</TabsPrimitive.List>
}
TabsList.displayName = TabsPrimitive.List.displayName

const TabsTrigger = ({
   children,
   ...rest
}: ComponentPropsWithRef<typeof TabsPrimitive.Trigger>) => {
   return <TabsPrimitive.Trigger {...rest}>{children}</TabsPrimitive.Trigger>
}
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

const TabsContent = ({
   children,
   ...rest
}: ComponentPropsWithRef<typeof TabsPrimitive.Content>) => {
   return <TabsPrimitive.Content {...rest}>{children}</TabsPrimitive.Content>
}
TabsContent.displayName = TabsPrimitive.Content.displayName

export { Tabs, TabsList, TabsTrigger, TabsContent }
