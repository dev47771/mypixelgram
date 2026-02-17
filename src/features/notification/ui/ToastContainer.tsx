'use client'

import { useAppDispatch } from '@/shared/hooks'
import { Toast, useToast, useToastNotifications } from '..'
import { setDropdownOpen } from '@/entities/notification'

export const ToastContainer = () => {
   const { toasts, removeToast, isSoundEnabled, toggleSound, addToast } = useToast()

   useToastNotifications(addToast)

   const dispatch = useAppDispatch()

   return (
      <div className="fixed right-5 bottom-5 z-50 flex flex-col gap-3">
         {toasts?.map(toast => (
            <Toast
               key={toast.id}
               id={toast.id}
               onClose={() => removeToast(toast.id)}
               onSoundChange={toggleSound}
               onOpenNotifications={() => dispatch(setDropdownOpen(true))}
               isSoundEnabled={isSoundEnabled}
               title={toast.title}
               message={toast.description}
            />
         ))}
      </div>
   )
}
