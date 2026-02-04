'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/components/Tabs'
import { settingsRoutes } from '@/shared/enums'
import { useRouter } from 'next/navigation'

import {
   DevicesTabPage,
   InfoTabPage,
   SETTINGS_TAB_VALUES,
   SettingsTabType,
   SubscriptionTabPage,
} from '@/entities/settings'
import { PaymentTabPage } from '../../entities/settings/ui/PaymentTabPage/PaymentTabPage'

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
               <TabsTrigger value={SETTINGS_TAB_VALUES.info}>General information</TabsTrigger>
               <TabsTrigger value={SETTINGS_TAB_VALUES.devices}>Devices</TabsTrigger>
               <TabsTrigger value={SETTINGS_TAB_VALUES.subscriptions}>Subscriptions</TabsTrigger>
               <TabsTrigger value={SETTINGS_TAB_VALUES.payments}>My payments</TabsTrigger>
            </TabsList>
            <TabsContent value={SETTINGS_TAB_VALUES.info}>
               <InfoTabPage />
            </TabsContent>
            <TabsContent value={SETTINGS_TAB_VALUES.devices}>
               <DevicesTabPage />
            </TabsContent>
            <TabsContent value={SETTINGS_TAB_VALUES.subscriptions}>
               <SubscriptionTabPage />
            </TabsContent>
            <TabsContent value={SETTINGS_TAB_VALUES.payments}>
               <PaymentTabPage />
            </TabsContent>
         </Tabs>
      </div>
   )
}
