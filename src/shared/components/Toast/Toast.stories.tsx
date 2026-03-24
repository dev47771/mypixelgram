import { Meta, StoryObj } from '@storybook/nextjs-vite'
import { Toast } from './Toast'

const meta = {
   component: Toast,
   parameters: {
      layout: 'centered',
   },
   tags: ['autodocs'],
   title: 'Components/Toast',
} satisfies Meta<typeof Toast>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
   args: {
      id: '1',
      onClose: () => {},
      onSoundChange: () => {},
      onOpenNotifications: () => {},
      isSoundEnabled: true,
      title: 'Новое уведомление!',
      message:
         'Следующая оплата спишется через 7 дней. Все понятно? Надеюсь, да, не забудь заплатить)',
   },
}

export const Muted: Story = {
   args: {
      ...Default.args,
      isSoundEnabled: false,
   },
}

export const LongMessage: Story = {
   args: {
      ...Default.args,
      title: 'Важное обновление',
      message:
         'Дорогой пользователь! Мы выпустили важное обновление безопасности. Пожалуйста, обновите свои данные для продолжения работы с сервисом. Это займет не более 2 минут.',
   },
}
