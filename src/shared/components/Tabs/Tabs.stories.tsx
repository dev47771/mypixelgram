import { TabsList, Tabs, TabsTrigger, TabsContent } from './'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { useState } from 'react'

const meta = {
   title: 'Components/Tabs',
   tags: ['autodocs'],
   parameters: {
      backgrounds: { default: '#0d0d0d' },
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
         <TabsContent style={{ marginTop: '12px', opacity: '0.6' }} value="general">
            General content
         </TabsContent>
         <TabsContent style={{ marginTop: '12px', opacity: '0.6' }} value="devices">
            Devices content
         </TabsContent>
         <TabsContent style={{ marginTop: '12px', opacity: '0.6' }} value="account">
            Account
         </TabsContent>
         <TabsContent style={{ marginTop: '12px', opacity: '0.6' }} value="payments">
            Payment info goes here
         </TabsContent>
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
         <TabsContent style={{ marginTop: '12px' }} value="general">
            General content
         </TabsContent>
         <TabsContent style={{ marginTop: '12px' }} value="devices">
            Devices content
         </TabsContent>
         <TabsContent style={{ marginTop: '12px' }} value="account">
            Account
         </TabsContent>
         <TabsContent aria-disabled style={{ marginTop: '12px' }} value="payments">
            Payment info goes here
         </TabsContent>
      </Tabs>
   )
}
