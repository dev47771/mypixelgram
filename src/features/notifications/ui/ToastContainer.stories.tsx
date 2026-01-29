import { Meta, StoryObj } from '@storybook/nextjs-vite'
import { useToast } from '../hooks/useToast'
import { Button } from '@/shared/components/Button'
import { useState } from 'react'
import { Toast } from '..'

const meta = {
   parameters: {
      layout: 'centered',
   },
   tags: ['autodocs'],
   title: 'Components/Toast/Test',
} satisfies Meta

export default meta
type Story = StoryObj

const ToastTest = () => {
   const { toasts, addToast, removeToast, isSoundEnabled, toggleSound } = useToast()
   const [counter, setCounter] = useState(1)

   const handleAddToast = () => {
      addToast({
         id: `test-${Date.now()}`,
         status: 'unread',
         title: `Уведомление #${counter}`,
         description: `Тестовое сообщение номер ${counter}. Следующая оплата спишется через 7 дней. Все понятно? Надеюсь, да, не забудь заплатить)`,
         createdAt: new Date().toISOString(),
      })
      setCounter(prev => prev + 1)
   }

   const handleRemoveAll = () => {
      toasts.forEach(toast => removeToast(toast.id))
   }

   return (
      <div className="relative h-[600px] w-[900px] p-6">
         <div className="mb-8 flex gap-4">
            <Button onClick={handleAddToast} className="bg-green-600">
               ➕ Создать уведомление
            </Button>

            <Button onClick={toggleSound} className="bg-blue-600">
               {isSoundEnabled ? '🔇 Выключить звук' : '🔊 Включить звук'}
            </Button>

            <Button onClick={handleRemoveAll} className="bg-red-600">
               🗑️ Удалить все
            </Button>
         </div>

         <div>
            <div className="fixed right-5 bottom-5 z-50 flex flex-col gap-3">
               {toasts.map(toast => (
                  <Toast
                     key={toast.id}
                     id={toast.id}
                     onClose={() => removeToast(toast.id)}
                     onSoundChange={toggleSound}
                     onOpenNotifications={() => {}} ////!!!
                     isSoundEnabled={isSoundEnabled}
                     title={toast.title}
                     message={toast.description}
                  />
               ))}
            </div>
         </div>
      </div>
   )
}

export const Test: Story = {
   render: () => <ToastTest />,
}
