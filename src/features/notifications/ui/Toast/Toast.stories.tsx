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
   render: () => {
      return (
         <div>
            <Toast
               id="1"
               onClose={id => {
                  console.log(id)
               }}
               onSoundChange={() => {}}
               isMuted
               title="Новое уведомление!"
               message="Следующая оплата спишется через 7 дней. Все понятно? Надеюсь, да, не забудь заплатить)"
            />
            {/* <ToastContainer /> */}
            {/* <Button className="bg-success-700 mr-4">
               Send message :)
            </Button> */}
         </div>
      )
   },
}
