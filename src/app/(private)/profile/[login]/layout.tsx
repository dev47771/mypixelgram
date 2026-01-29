'use client'

import { ReactNode } from 'react'

export default function LoginProfileLayout({
   children,
   post,
}: {
   children: ReactNode
   post: ReactNode
}) {
   return (
      <>
         {children}
         {post}
      </>
   )
}
