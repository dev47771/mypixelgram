import { PostModal } from '@/shared/components/PostModal'
import { PostCreatorSlider } from '../../PostCreatorSlider/PostCreatorSlider'
import { FiltersBlock } from '../FilterBlock/FiltersBlock'

type Props = {
   onBack: () => void
   onNext: () => void
   //onClose: () => void
   images: string[]
   currentFilter: string
   onSlideChange: (index: number) => void
   onFilterChange: (filter: string) => void
}

export const FilterModal = ({
   onBack,
   onNext,
   //onClose,
   images,
   currentFilter,
   onSlideChange,
   onFilterChange,
}: Props) => {
   return (
      <PostModal
         key="filters"
         size="post-management"
         headerText="Filters"
         headerVariant="with-navigation"
         contentColumns="two"
         onBack={onBack}
         onNext={onNext}
         //onClose={onClose}
         leftContent={
            <PostCreatorSlider
               //передаем ссылку на каждую фотографию для предпоказа в слайдере
               images={images}
               //применяем фильтр к текущему в слайдере фото, если к фото был применен фильтр (только предпоказ, сам файл не изменяется)
               currentFilter={currentFilter}
               //узнаем индекс текущего в слайдере фото (нумерация в нашем массиве с объектами фото и нумерация при отрисовке url этих фото в слайдере одинаковая => index === currentPhotoIndex)
               onSlideChange={onSlideChange}
            />
         }
         rightContent={
            <FiltersBlock
               //на основании примененного фильтра к текущему фото изменяем внешний вид иконки с фильтром (если текущее фото с фильтром moon, то иконка moon подсветится как выбранная)
               currentFilter={currentFilter}
               //узнаем, какой фильтр хочет применить пользователь к фото (при нажатии на фильтр moon сработает функция applyFilterToCurrentPhoto и в объект текущей фотографии будет внесено изменение, будет добавлен фильтр)
               onFilterChange={onFilterChange}
            />
         }
      />
   )
}
