import { Meta, StoryObj } from '@storybook/nextjs-vite'
import { Checkbox } from './Checkbox'
import { useState } from 'react'

const meta = {
   component: Checkbox,
   parameters: {
      layout: 'centered',
   },
   tags: ['autodocs'],
   title: 'Components/Checkbox',
} satisfies Meta<typeof Checkbox>

export default meta
type Story = StoryObj<typeof meta>

const CheckboxController = () => {
   const [agreements, setAgreements] = useState({
      terms: false,
      newsletter: false,
      notifications: false,
   })

   const handleAgreementChange = (key: string) => (checked: boolean) => {
      setAgreements(prev => ({ ...prev, [key]: checked }))
   }

   return (
      <div className="bg-dark-700 flex flex-col gap-4 rounded border p-4">
         <Checkbox
            label="Принять условия использования"
            checked={agreements.terms}
            onCheckedChange={handleAgreementChange('terms')}
         />

         <Checkbox
            label="Подписаться на рассылку"
            checked={agreements.newsletter}
            onCheckedChange={handleAgreementChange('newsletter')}
         />

         <Checkbox
            label="Получать уведомления"
            checked={agreements.notifications}
            onCheckedChange={handleAgreementChange('notifications')}
         />
         <Checkbox label="Постоянная загрузка :)" variant={'recaptcha'} checked={'indeterminate'} />
         <div className="rounded bg-gray-100 p-2 text-sm">
            <p>Текущие значения для бэкенда:</p>
            <pre>{JSON.stringify(agreements, null, 2)}</pre>
         </div>
      </div>
   )
}

export const States: Story = {
   render: () => (
      <div className="bg-dark-700 flex flex-col gap-4 p-4">
         <Checkbox label="Default" />
         <Checkbox label="Disabled and unchecked" disabled />
         <Checkbox label="Disabled and checked" checked disabled />
      </div>
   ),
}

export const Controlled: Story = {
   render: () => <CheckboxController />,
}
