'use client'
import { useEffect } from 'react'
import { alert } from '@/shared/components/Alert'
export function PostNotFound() {
   useEffect(() => {
      alert.error('Post not found')
   }, [])
   return null
}
