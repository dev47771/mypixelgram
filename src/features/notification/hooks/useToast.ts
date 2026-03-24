'use client'

import { useRef, useState } from 'react'
import { ToastUIType } from '..'
import { NewNotificationSocketPayload } from '@/entities/notification'

export const useToast = () => {
   const [toasts, setToasts] = useState<ToastUIType[]>([])

   const soundRef = useRef<HTMLAudioElement | null>(null)

   const [isSoundEnabled, setIsSoundEnabled] = useState(() => {
      if (typeof window === 'undefined') {
         return null
      } else {
         const saved = localStorage.getItem('notificationSoundEnabled')
         return saved !== null ? JSON.parse(saved) : true
      }
   })

   const addToast = (newToast: NewNotificationSocketPayload) => {
      if (isSoundEnabled) {
         playNotificationSound()
      }
      const toastWithTimer = {
         ...newToast,
         timerId: setTimeout(() => {
            removeToast(newToast.id)
         }, 30000),
      }

      setToasts(prev => [...prev, toastWithTimer])
   }

   const playNotificationSound = () => {
      if (!soundRef.current) {
         soundRef.current = new Audio('/sounds/notification.mp3')
      }

      soundRef.current.currentTime = 0
      soundRef.current.play()
   }

   const toggleSound = () => {
      const newValue = !isSoundEnabled
      setIsSoundEnabled(newValue)
      localStorage.setItem('notificationSoundEnabled', JSON.stringify(newValue))
   }

   const removeToast = (id: string) => {
      setToasts(prev => {
         const toastToRemove = prev.find(t => t.id === id)
         if (toastToRemove?.timerId) {
            clearTimeout(toastToRemove.timerId)
         }
         return prev.filter(toast => toast.id !== id)
      })
   }

   return {
      toasts,
      addToast,
      removeToast,
      isSoundEnabled,
      toggleSound,
   }
}
