'use client'

import Script from 'next/script'
import { type ReactNode } from 'react'

export default function ForgotPasswordLayout({ children }: { children: ReactNode }) {
   return (
      <>
         <Script
            async
            src={`https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`}
            strategy="afterInteractive"
         />
         {children}
      </>
   )
}
