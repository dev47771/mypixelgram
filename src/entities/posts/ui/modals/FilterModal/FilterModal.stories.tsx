import { useState } from 'react'
import { Meta, StoryObj } from '@storybook/nextjs-vite'
import { FilterModal } from './FilterModal'

const meta = {
   title: 'Modals/FilterModal',
   component: FilterModal,
   parameters: {
      layout: 'centered',
   },
} satisfies Meta<typeof FilterModal>

export default meta
type Story = StoryObj<typeof meta>

// Mock данные - УПРОЩЁННАЯ КОПИЯ PhotoState из PostCreator
// В РЕАЛЬНОСТИ: здесь был бы оригинальный File + URL.createObjectURL()
// В ИСТОРИИ: используем готовые ссылки, т.к. File операции не работают в Storybook
const createMockPhotoState = (url: string, index: number) => ({
   id: `photo-${index + 1}`,
   // originalFile: File,    // НЕ РАБОТАЕТ В STORYBOOK - операции с File недоступны
   previewUrl: url, // В ИСТОРИИ: готовая ссылка вместо URL.createObjectURL(file)
   currentFilter: 'filter-none',
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
      currentFilter: 'filter-none',
      onSlideChange: () => {},
      onFilterChange: () => {},
      onOpenChange: () => {},
   },
   render: function Render(args) {
      // СПЕЦИАЛЬНО ДЛЯ ИСТОРИИ (На основе моковых ссылок на фото создаем массив обектов по типу InteractiveFilters -> совместила стейт photo и функцию handleAddPhotos)
      // Храним массив фото с их индивидуальными фильтрами
      // Каждое фото имеет свой currentFilter
      const [photos, setPhotos] = useState(() =>
         mockImages.map((url, index) => createMockPhotoState(url, index))
      )

      // Индекс текущего активного фото в слайдере
      // Меняется когда пользователь листает слайдер
      const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0)

      // Применяет фильтр ТОЛЬКО к текущему активному фото
      // Обновляет photos[currentPhotoIndex].currentFilter
      const applyFilterToCurrentPhoto = (filter: string) => {
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
               currentFilter={photos[currentPhotoIndex]?.currentFilter || 'filter-none'}
               onSlideChange={setCurrentPhotoIndex}
               onFilterChange={applyFilterToCurrentPhoto}
               onOpenChange={() => alert('open CloseCreatePostModal')}
            />
         </>
      )
   },
}
