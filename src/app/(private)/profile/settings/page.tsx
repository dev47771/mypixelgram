import { TabsBlock } from '@/entities/settings'
import { Suspense } from 'react'

interface PageProps {
   searchParams: Promise<{ part?: string }>
}

export default async function ProfileSettingsPage({ searchParams }: PageProps) {
   const { part } = await searchParams
   const initialPart = part ?? 'info'

   return (
      <Suspense>
         <TabsBlock initialPart={initialPart} />
      </Suspense>
   )
}
