import { useState } from 'react'
import { Toast, useToast, useWebSocket } from '..'

export const ToastContainer = () => {
   const [isMuted, setIsMuted] = useState(false)

   const { toasts, addToast, removeToast } = useToast()

   //useWebSocket(addToast) //РАСКОММЕНТИТЬ ПОТОМ

   //функция добавления в массив +
   //функция удаления из массива после 30 секунд +
   //функция удаления из массива по id +
   //функция открытия попап при клике
   //добавить звук
   //в localStorage поместить состояние по звуку
   //открытие попапа по клику
   //работа с WebSocket
   //тестирование

   return (
      <div className='fixed bottom-5 right-5 z-50 flex flex-col gap-3'>
         {toasts?.map(toast => (
            <Toast
               key={toast.id}
               id={toast.id}
               onClose={() => removeToast(toast.id)}
               onSoundChange={() => setIsMuted(!isMuted)}
               onOpenNotifications={() => {}} ////////!!!!!!!!!!!!
               isMuted={isMuted}
               title={toast.title}
               message={toast.description}
            />
         ))}
      </div>
   )
}
