import { useState } from 'react'
import { Meta, StoryObj } from '@storybook/nextjs-vite'
import { FilterModal } from './FilterModal'
import { FilterValue } from '.'

const meta = {
   title: 'Modals/FilterModal',
   component: FilterModal,
   parameters: {
      layout: 'centered',
   },
} satisfies Meta<typeof FilterModal>

export default meta
type Story = StoryObj<typeof meta>

const createMockPhotoState = (url: string, index: number) => ({
   id: `photo-${index + 1}`,
   // originalFile: File,    // НЕ РАБОТАЕТ В STORYBOOK - операции с File недоступны
   previewUrl: url, // В ИСТОРИИ: готовая ссылка вместо URL.createObjectURL(file)
   currentFilter: 'filter-none' as const,
})

const mockImages = [
   'https://images.unsplash.com/photo-1743233883542-6028ee3882f4?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1974',
   'https://images.unsplash.com/photo-1748014145277-7d7a173329f9?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2070',
   'https://images.unsplash.com/photo-1743947197487-3534e60ca31b?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=931',
]

export const FilterModalExample: Story = {
   args: {
      onBack: () => {},
      onNext: () => {},
      images: [],
      filters: [],
      onSlideChange: () => {},
      onFilterChange: () => {},
      onOpenChange: () => {},
   },
   render: function Render(args) {
      type PhotoState = {
         id: string
         previewUrl: string
         currentFilter: FilterValue
      }

      const [photos, setPhotos] = useState<PhotoState[]>(() =>
         mockImages.map((url, index) => createMockPhotoState(url, index))
      )

      const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0)

      const applyFilterToCurrentPhoto = (filter: FilterValue) => {
         setPhotos(prev =>
            prev.map((photo, index) =>
               index === currentPhotoIndex ? { ...photo, currentFilter: filter } : photo
            )
         )
      }

      return (
         <>
            <FilterModal
               {...args}
               onBack={() => {}}
               onNext={() => {}}
               images={photos.map(photo => photo.previewUrl)}
               filters={photos.map(photo => photo.currentFilter)}
               onSlideChange={setCurrentPhotoIndex}
               onFilterChange={applyFilterToCurrentPhoto}
               onOpenChange={() => alert('open CloseCreatePostModal')}
            />
         </>
      )
   },
}
