import { Meta, StoryObj } from '@storybook/nextjs-vite'
import { UICheckbox } from './Checkbox'
import { useState } from 'react'

const meta = {
   component: UICheckbox,
   parameters: {
      layout: 'centered',
   },
   tags: ['autodocs'],
   title: 'Components/Checkbox',
} satisfies Meta<typeof UICheckbox>

export default meta
type Story = StoryObj<typeof meta>

export const States: Story = {
   render: () => (
      <div className="bg-dark-700 flex flex-col gap-4 p-4">
         <UICheckbox label="Default" />
         <UICheckbox label="Disabled and unchecked" disabled />
         <UICheckbox label="Disabled and checked" checked disabled />
      </div>
   ),
}

export const Controlled: Story = {
   render: () => {
      const [agreements, setAgreements] = useState({
         terms: false,
         newsletter: false,
         notifications: false,
      })

      const handleAgreementChange = (key: string) => (checked: boolean) => {
         setAgreements(prev => ({ ...prev, [key]: checked }))
      }

      const handleSubmit = () => {
         console.log('Данные для отправки:', agreements)
         alert(`Данные для бэкенда: ${JSON.stringify(agreements)}`)
      }

      return (
         <div className="bg-dark-700 flex flex-col gap-4 rounded border p-4">
            <UICheckbox
               label="Принять условия использования"
               checked={agreements.terms}
               onCheckedChange={handleAgreementChange('terms')}
            />

            <UICheckbox
               label="Подписаться на рассылку"
               checked={agreements.newsletter}
               onCheckedChange={handleAgreementChange('newsletter')}
            />

            <UICheckbox
               label="Получать уведомления"
               checked={agreements.notifications}
               onCheckedChange={handleAgreementChange('notifications')}
            />

            <button onClick={handleSubmit} className="rounded bg-blue-500 px-4 py-2 text-white">
               Отправить на бэкенд
            </button>

            <div className="rounded bg-gray-100 p-2 text-sm">
               <p>Текущие значения для бэкенда:</p>
               <pre>{JSON.stringify(agreements, null, 2)}</pre>
            </div>
         </div>
      )
   },
}
