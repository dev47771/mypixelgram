'use client'

import { type ReactNode } from 'react'
import { withAuth } from '@/shared/HOC'

function AuthLayout({ children }: { children: ReactNode }) {
   return children
}

export default withAuth(AuthLayout)
