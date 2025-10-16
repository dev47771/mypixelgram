'use client' // Error boundaries must be Client Components

import { useEffect } from 'react'
import { PageContainer } from '@/shared/components/PageContainer'
import { Button } from '@/shared/components/Button'

export default function Error({
   error,
   reset,
}: {
   error: Error & { digest?: string }
   reset: () => void
}) {
   useEffect(() => {
      // Log the error to an error reporting service
      console.error(error)
   }, [error])

   return (
      <PageContainer className="flex-1 justify-center gap-3 p-0">
         <div className="flex flex-col items-center gap-4 rounded-xl border border-red-800/40 bg-red-950/30 p-8">
            <h2>Something went wrong!</h2>
            <p className="text-muted-foreground max-w-md text-sm">
               An unexpected error occurred. Please try refreshing the page or try again later.
            </p>
            <Button
               onClick={
                  // Attempt to recover by trying to re-render the segment
                  () => reset()
               }
            >
               Try again
            </Button>
         </div>
      </PageContainer>
   )
}
