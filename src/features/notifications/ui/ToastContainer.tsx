import { Toast, useToast } from '..'

export const ToastContainer = () => {
   const { toasts, removeToast, isSoundEnabled, toggleSound } = useToast()

   //useWebSocket(addToast) //РАСКОММЕНТИТЬ ПОТОМ и добавить addToast в useToast

   //функция добавления в массив +
   //функция удаления из массива после 30 секунд +
   //функция удаления из массива по id +
   //функция открытия попап при клике
   //добавить звук +
   //в localStorage поместить состояние по звуку +
   //работа с WebSocket
   //тестирование

   return (
      <div className="fixed right-5 bottom-5 z-50 flex flex-col gap-3">
         {toasts?.map(toast => (
            <Toast
               key={toast.id}
               id={toast.id}
               onClose={() => removeToast(toast.id)}
               onSoundChange={toggleSound}
               onOpenNotifications={() => {}} ////////!!!!!!!!!
               isSoundEnabled={isSoundEnabled}
               title={toast.title}
               message={toast.description}
            />
         ))}
      </div>
   )
}
