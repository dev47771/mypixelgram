'use client'

import { type ReactNode } from 'react'

export default function ForgotPasswordLayout({ children }: { children: ReactNode }) {
   return (
      <>
         <script
            async
            src={`https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`}
         />
         {children}
      </>
   )
}
