'use client'
import { useMeQuery } from '@/features/auth/api'
import { Sidebar } from '@/widgets/Sidebar'

export default function SidebarClient() {
   const { data } = useMeQuery()

   return data ? <Sidebar /> : null
}
