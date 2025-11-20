import { PublicationForm } from '@/features/posts/forms/PublicationForm'
import { Modal } from '@/shared/components/Modal'
import { store } from '@/shared/store'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { Provider } from 'react-redux'

const meta: Meta<typeof PublicationForm> = {
   title: 'Forms/PublicationForm',
   component: PublicationForm,
   decorators: [
      Story => (
         <Provider store={store}>
            <Story />
         </Provider>
      ),
   ],
}

export default meta
type Story = StoryObj<typeof PublicationForm>

export const Default: Story = {
   render: () => {
      const onBack = () => alert('Back')
      const isLoading = false
      const images = ['./public/404.jpg', './public/logo-light.png', './public/logo-dark.png']

      return (
         <Modal open className="w-full max-w-[972px]">
            <PublicationForm
               onSubmit={async () => alert('Publish')}
               onBack={onBack}
               isLoading={isLoading}
               images={images}
            />
         </Modal>
      )
   },
}
