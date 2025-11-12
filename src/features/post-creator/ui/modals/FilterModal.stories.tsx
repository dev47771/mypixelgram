import { PostModal } from '@/shared/components/PostModal'
import { FiltersBlock } from './FilterBlock/FiltersBlock'
import { useState } from 'react'
import { Meta, StoryObj } from '@storybook/nextjs-vite'
import { PostCreatorSlider } from '../PostCreatorSlider/PostCreatorSlider'

const meta = {
   title: 'Components/PostModals/Filters',
   component: PostModal,
   parameters: {
      layout: 'centered',
   },
} satisfies Meta<typeof PostModal>

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

export const InteractiveFilters: Story = {
   args: {
      size: 'post-management',
      headerText: 'Filters',
      headerVariant: 'with-navigation',
      contentColumns: 'two',
      //Остальные аргументы типа onNext не добавляла в историю
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
            <PostModal
               {...args}
               leftContent={
                  // - images: массив previewUrl (готовые ссылки)
                  // - currentFilter: берётся из photos[currentPhotoIndex]
                  // - onSlideChange: обновляет currentPhotoIndex при перелистывании
                  <PostCreatorSlider
                     //передаем ссылку на каждую фотографию для предпоказа в слайдере
                     images={photos.map(photo => photo.previewUrl)}
                     //применяем фильтр к текущему в слайдере фото, если к фото был применен фильтр (только предпоказ, сам файл не изменяется)
                     currentFilter={
                        photos[currentPhotoIndex]?.currentFilter || 'filter-none'
                     }
                     //узнаем индекс текущего в слайдере фото (нумерация в нашем массиве с объектами фото и нумерация при отрисовке url этих фото в слайдере одинаковая => index === currentPhotoIndex)
                     onSlideChange={setCurrentPhotoIndex}
                  />
               }
               rightContent={
                  // - currentFilter: показывает фильтр активного фото
                  // - onFilterChange: вызывает applyFilterToCurrentPhoto
                  <FiltersBlock
                     currentFilter={photos[currentPhotoIndex]?.currentFilter || 'filter-none'}
                     onFilterChange={applyFilterToCurrentPhoto}
                  />
               }
            />

            {/* ТОЛЬКО ДЛЯ ИСТОРИИ: Показывает состояние ВСЕХ фото для наглядности */}
            <div className="bg-dark-500 text-light-500 fixed bottom-4 left-4 max-w-md rounded p-3 text-sm">
               <div className="mb-2 font-semibold">Состояние фото (дебаг):</div>
               {photos.map((photo, index) => (
                  <div
                     key={photo.id}
                     className={index === currentPhotoIndex ? 'text-accent-300' : ''}
                  >
                     Фото {index + 1}: {photo.currentFilter}
                     {index === currentPhotoIndex && ' ← активное'}
                  </div>
               ))}
            </div>
         </>
      )
   },
}
