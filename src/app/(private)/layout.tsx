'use client'

import { type ReactNode } from 'react'
import { withAuth } from '@/shared/HOC'

function PrivateLayout({ children }: { children: ReactNode }) {
   return <>{children}</>
}

export default withAuth(PrivateLayout)
