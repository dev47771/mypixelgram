'use client'

import { PostModal } from '@/shared/components/PostModal'
import { PostCreatorSlider } from '../../PostCreatorSlider/PostCreatorSlider'
import { FiltersBlock, FilterValue } from '.'

type Props = {
   onBack: () => void
   onNext: () => void
   onOpenChange: () => void
   images: string[]
   filters: FilterValue[]
   onSlideChange: (index: number) => void
   onFilterChange: (filter: FilterValue) => void
   currentSlide?: number
}

export const FilterModal = ({
   onBack,
   onNext,
   onOpenChange,
   images,
   filters,
   onSlideChange,
   onFilterChange,
   currentSlide = 0,
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
         onOpenChange={onOpenChange}
         leftContent={
            <PostCreatorSlider
               images={images}
               filters={filters}
               onSlideChangeAction={onSlideChange}
               currentSlide={currentSlide}
               resetOnMount
            />
         }
         rightContent={
            <FiltersBlock currentFilter={filters[currentSlide]} onFilterChange={onFilterChange} />
         }
      />
   )
}
