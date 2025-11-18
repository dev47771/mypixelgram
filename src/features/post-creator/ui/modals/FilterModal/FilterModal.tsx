import { PostModal } from '@/shared/components/PostModal'
import { FiltersBlock, FilterValue } from '@/features/post-creator'
import { PhotoState } from '@/features/post-creator/PostCreator'
import { Slider } from '@/shared/components/Slider'

type Props = {
   onBack: () => void
   onNext: () => void
   //onClose: () => void
   images: PhotoState[]
   currentFilter: FilterValue
   onSlideChange: (index: number) => void
   onFilterChange: (filter: FilterValue) => void
   currentIndex: number
}

export const FilterModal = ({
   onBack,
   onNext,
   //onClose,
   images,
   currentFilter,
   onSlideChange,
   currentIndex,
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
            <Slider
               images={images.map(i => i.modifiedPreviewUrl)}
               onIndexChangeAction={onSlideChange}
               currentIndex={currentIndex}
               className={'h-full w-full'}
               currentFilter={currentFilter}
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
/* <PostCreatorSlider
           //передаем ссылку на каждую фотографию для предпоказа в слайдере
           images={images}
           //применяем фильтр к текущему в слайдере фото, если к фото был применен фильтр (только предпоказ, сам файл не изменяется)
           currentFilter={currentFilter}
           //узнаем индекс текущего в слайдере фото (нумерация в нашем массиве с объектами фото и нумерация при отрисовке url этих фото в слайдере одинаковая => index === currentPhotoIndex)
           onSlideChangeAction={onSlideChange}
        />*/
