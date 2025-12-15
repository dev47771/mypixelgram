import { redirect } from 'next/navigation'
import { settingsRoutes } from '@/shared/enums'
import { TabsBlock } from '@/entities/settings'

interface PageProps {
   searchParams: Promise<{ part?: string }>
}

export default async function ProfileSettingsPage({ searchParams }: PageProps) {
   const { part } = await searchParams

   if (!part) {
      redirect(settingsRoutes.create('info'))
   }

   return <TabsBlock initialPart={part} />
}
