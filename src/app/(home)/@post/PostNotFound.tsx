'use client'
import { useEffect } from 'react'
import { alert } from '@/shared/components/Alert'
export default function PostNotFound() {
   useEffect(() => {
      alert.error('PostNotFound')
   }, [])
   return null
}
