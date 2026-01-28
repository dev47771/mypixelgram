import { Meta, StoryObj } from '@storybook/nextjs-vite'
import { ToastContainer } from './ToastContainer'
import { useToast } from '../hooks/useToast'
import { Button } from '@/shared/components/Button'
import { useState } from 'react'
import { Toast } from './Toast/Toast'

const meta = {
   component: ToastContainer,
   parameters: {
      layout: 'centered',
   },
   tags: ['autodocs'],
   title: 'Components/ToastContainer',
} satisfies Meta<typeof ToastContainer>

export default meta
type Story = StoryObj<typeof meta>

const ToastContainerTest = () => {
   const { toasts, addToast, removeToast } = useToast()
   const [isMuted, setIsMuted] = useState(false)
   const [counter, setCounter] = useState(1)

   const handleAddToast = () => {
      addToast({
         id: `test-${Date.now()}`,
         status: 'unread',
         title: `Тестовое уведомление #${counter}`,
         description: `Это тестовое сообщение номер ${counter}. Проверяем как всё работает!`,
         createdAt: new Date().toISOString(),
      })
      setCounter(prev => prev + 1)
   }

   const handleRemoveAll = () => {
      toasts.forEach(toast => removeToast(toast.id))
   }

   return (
      <div>
         <div className="mb-8 p-4">
            <div className="mb-4 flex gap-4">
               <Button onClick={handleAddToast} className="bg-green-600 hover:bg-green-700">
                  ➕ Добавить уведомление
               </Button>

               <Button
                  onClick={() => setIsMuted(!isMuted)}
                  className="bg-blue-600 hover:bg-blue-700"
               >
                  {isMuted ? '🔊 Включить звук' : '🔇 Выключить звук'}
               </Button>

               <Button onClick={handleRemoveAll} className="bg-red-600 hover:bg-red-700">
                  🗑️ Удалить все
               </Button>
            </div>
         </div>

         <div style={{ position: 'relative', height: '400px' }}>
            <div className="fixed right-5 bottom-5 z-50 flex flex-col gap-3">
               {toasts.map(toast => (
                  <Toast
                     key={toast.id}
                     id={toast.id}
                     onClose={() => removeToast(toast.id)}
                     onSoundChange={() => setIsMuted(!isMuted)}
                     onOpenNotifications={() => {}}
                     isMuted={isMuted}
                     title={toast.title}
                     message={toast.description}
                  />
               ))}
            </div>
         </div>
      </div>
   )
}

export const TestEnvironment: Story = {
   render: () => <ToastContainerTest />,
}

export const SingleToast: Story = {
   render: () => {
      const Component = () => {
         const { addToast } = useToast()
         const [isMuted] = useState(false)
         console.log('Sound muted:', isMuted)

         useState(() => {
            setTimeout(() => {
               addToast({
                  id: 'demo-1',
                  title: 'Демо уведомление',
                  description: 'Пример как выглядит один тост',
                  status: 'unread',
                  createdAt: '',
               })
            }, 100)
         })

         return (
            <div className="h-[400px] w-[600px] border p-4">
               <div className="fixed right-5 bottom-5">{/* Здесь будет тост */}</div>
            </div>
         )
      }
      return <Component />
   },
}
