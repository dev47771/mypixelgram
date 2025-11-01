import { Provider } from 'react-redux'
import { store } from '@/shared/store'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { PublicationModal } from '@/entities/posts/ui/modals/PublicationModal'

const meta = {
   title: 'Forms/PublicationForm',
   component: PublicationModal,
   decorators: [
      Story => (
         <Provider store={store}>
            <Story />
         </Provider>
      ),
   ],
} satisfies Meta<typeof PublicationModal>

export default meta
type Story = StoryObj<typeof PublicationModal>

export const Default: Story = {
   args: {
      open: true,
      onBack: () => alert('Back clicked'),
      images: ['./public/404.jpg', './public/logo-light.png', './public/logo-dark.png'],
   },
}
