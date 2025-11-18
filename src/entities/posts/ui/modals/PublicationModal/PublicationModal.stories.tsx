'use client'

import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { PublicationModal } from './PublicationModal'
import { PhotoState } from '@/features/post-creator/PostCreator'
import { Provider } from 'react-redux'
import { store } from '@/shared/store'

const meta: Meta = {
   title: 'Modals/PublicationModal',
   decorators: [
      Story => (
         <Provider store={store}>
            <Story />
         </Provider>
      ),
   ],
}

export default meta
type Story = StoryObj

// export const Publication: Story = {
//    render: () => {
//       const images = ['./public/404.jpg', './public/logo-light.png', './public/logo-dark.png']
//       const onBack = () => alert('Back')

//       return (
//          <Modal open className="w-full max-w-[972px]">
//             <form>
//                <ModalTitle className="flex items-center justify-between px-[0px]">
//                   <Button
//                      variant="textButton"
//                      className="text-light-100"
//                      type="button"
//                      onClick={onBack}
//                   >
//                      <ArrowLeftIcon />
//                   </Button>

//                   <Typography variant="h1">Publication</Typography>

//                   <Button type="button" variant="textButton" onClick={() => alert('Publish')}>
//                      Publish
//                   </Button>
//                </ModalTitle>

//                <hr className="text-dark-100 h-[1px]" />

//                <ModalBody className="flex flex-row">
//                   <Slider images={images} className={'h-[501px] w-[490px]'} />
//                   <div className="flex flex-1 items-center justify-center bg-gray-950 text-white">
//                      Right content area
//                   </div>
//                </ModalBody>
//             </form>
//          </Modal>
//       )
//    },
// }

export const PublicationModalStory: Story = {
   render: () => {
      const mockFile = new File([], 'placeholder.jpg', {
         type: 'image/jpeg',
      })

      const photos: PhotoState[] = [
         {
            id: '1',
            originalFile: mockFile,
            previewUrl: './public/404.jpg',
            currentFilter: 'filter-moon',
         },
         {
            id: '2',
            originalFile: mockFile,
            previewUrl: './public/logo-light.png',
            currentFilter: 'filter-moon',
         },
         {
            id: '3',
            originalFile: mockFile,
            previewUrl: './public/logo-dark.png',
            currentFilter: 'filter-moon',
         },
      ]

      return (
         <PublicationModal
            onBack={() => alert('previous modal')}
            photos={photos}
            onOpenChange={() => alert('open CloseCreatePostModal')}
            closePostCreator={() => alert('close PostCreator')}
         />
      )
   },
}
