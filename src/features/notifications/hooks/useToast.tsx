import { useState } from 'react'
import { ToastType, ToastUIType } from '..'

export const useToast = () => {
   const [toasts, setToasts] = useState<ToastUIType[]>([])

   const addToast = (newToast: ToastType) => {
    const toastWithTimer = {
      ...newToast,
      timerId: setTimeout(() => {
        removeToast(newToast.id)
      }, 30000) 
    }
    
    setToasts(prev => [...prev, toastWithTimer])
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
   }
}
