'use client'
import { useEffect, useState } from 'react'
import { formatDistanceToNow } from 'date-fns'

export const useRelativeTime = (date: string) => {
   const [relativeTime, setRelativeTime] = useState('')

   useEffect(() => {
      setRelativeTime(formatDistanceToNow(new Date(date), { addSuffix: true }))

      const interval = setInterval(() => {
         setRelativeTime(formatDistanceToNow(new Date(date), { addSuffix: true }))
      }, 60_000)

      return () => clearInterval(interval)
   }, [date])

   return relativeTime
}
