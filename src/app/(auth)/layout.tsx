'use client'

import { type ReactNode } from 'react'
import { withPublicRoute } from '@/features/auth/HOC/withPublicRoute'

function AuthLayout({ children }: { children: ReactNode }) {
   return <>{children}</>
}

export default withPublicRoute(AuthLayout)
