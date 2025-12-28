'use client'
import { useSearchParams } from 'next/navigation'
import { useCallback } from 'react'

export const useCreateQueryString = () => {
   const searchParams = useSearchParams()

   return useCallback(
      (name: string, value: string): string => {
         const params = new URLSearchParams(searchParams.toString())
         params.set(name, value)
         return params.toString()
      },
      [searchParams]
   )
}
