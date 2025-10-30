'use client'

import { type ReactNode } from 'react'
import { withPublicRoute } from '@/shared/HOC/withPublicRoute'

function AuthLayout({ children }: { children: ReactNode }) {
   return <>{children}</>
}

export default withPublicRoute(AuthLayout)
