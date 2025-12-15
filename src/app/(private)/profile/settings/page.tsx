import { TabsBlock } from '@/entities/settings'

interface PageProps {
   searchParams: Promise<{ part?: string }>
}

export default async function ProfileSettingsPage({ searchParams }: PageProps) {
   const { part } = await searchParams
   const initialPart = part ?? 'info'

   return <TabsBlock initialPart={initialPart} />
}
