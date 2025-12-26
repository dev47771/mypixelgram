'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/components/Tabs'
import { settingsRoutes } from '@/shared/enums'
import { useRouter } from 'next/navigation'
import { SettingsTabType, settingsTabValues } from '../../constants/settingTabValues'
import { InfoTabPage } from '../InfoTabPage/InfoTabPage'
import { PaymentTabPage } from '../PaymentTabPage/PaymentTabPage'

interface TabsBlockProps {
   initialPart: string
}

export function TabsBlock({ initialPart }: TabsBlockProps) {
   const router = useRouter()

   const handleTabChange = (value: string) => {
      router.push(settingsRoutes.create(value as SettingsTabType), { scroll: false })
   }

   return (
      <div suppressHydrationWarning className="pt-[36px] pb-[26px] pl-[24px]">
         <Tabs value={initialPart} onValueChange={handleTabChange}>
            <TabsList>
               <TabsTrigger value={settingsTabValues.info}>General information</TabsTrigger>
               <TabsTrigger value={settingsTabValues.devices}>Devices</TabsTrigger>
               <TabsTrigger value={settingsTabValues.subscriptions}>Subscriptions</TabsTrigger>
               <TabsTrigger value={settingsTabValues.payments}>My payments</TabsTrigger>
            </TabsList>
            <TabsContent value={settingsTabValues.info}>
               <InfoTabPage />
            </TabsContent>
            <TabsContent value={settingsTabValues.devices}>Devices content</TabsContent>
            <TabsContent value={settingsTabValues.subscriptions}>Subscriptions content</TabsContent>
            <TabsContent value={settingsTabValues.payments}>
               <PaymentTabPage />
            </TabsContent>
         </Tabs>
      </div>
   )
}
