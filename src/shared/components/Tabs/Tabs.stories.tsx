import { TabsList, Tabs, TabsTrigger, TabsContent } from './'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { useState } from 'react'

const meta = {
   title: 'Components/Tabs',
   tags: ['autodocs'],
   parameters: {
      backgrounds: { default: 'var(--color-dark-700)' },
   },
} satisfies Meta<typeof Tabs>

export default meta

type Story = StoryObj<typeof Tabs>

export const DefaultVariant: Story = {
   render: () => {
      return <TabWrapper />
   },
}

export const DisabledVariant: Story = {
   render: () => (
      <Tabs defaultValue="general">
         <TabsList>
            <TabsTrigger disabled value="general">
               General information
            </TabsTrigger>
            <TabsTrigger disabled value="devices">
               Devices
            </TabsTrigger>
            <TabsTrigger disabled value="account">
               Account Management
            </TabsTrigger>
            <TabsTrigger disabled value="payments">
               My payments
            </TabsTrigger>
         </TabsList>
         <TabsContent value="general">General content</TabsContent>
         <TabsContent value="devices">Devices content</TabsContent>
         <TabsContent value="account">Account</TabsContent>
         <TabsContent value="payments">Payment info goes here</TabsContent>
      </Tabs>
   ),
}

const TabWrapper = () => {
   const [tabValue, setTabValue] = useState('general')

   return (
      <Tabs defaultValue="general" value={tabValue} onValueChange={setTabValue}>
         <TabsList>
            <TabsTrigger value="general">General information</TabsTrigger>
            <TabsTrigger value="devices">Devices</TabsTrigger>
            <TabsTrigger value="account">Account Management</TabsTrigger>
            <TabsTrigger value="payments">My payments</TabsTrigger>
         </TabsList>
         <TabsContent marginTop={24} value="general">
            General content
         </TabsContent>
         <TabsContent marginTop={24} value="devices">
            Devices content
         </TabsContent>
         <TabsContent marginTop={30} value="account">
            Account
         </TabsContent>
         <TabsContent marginTop={30} aria-disabled value="payments">
            Payment info goes here
         </TabsContent>
      </Tabs>
   )
}
