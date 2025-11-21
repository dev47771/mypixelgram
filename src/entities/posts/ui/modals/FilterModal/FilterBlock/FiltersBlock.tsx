import { Typography } from '@/shared/components/Typography'
import FilterPhoto from './assets/Filter.jpg'
import Image from 'next/image'
import { cn } from '@/shared/lib'
import { Button } from '@/shared/components/Button'

type FilterProps = {
   filter: FilterValue
   filterName: FilterName
   isActive: boolean
   onClick: () => void
}

export const popularFilters = [
   { filter: 'filter-none', filterName: 'Normal' },
   { filter: 'filter-clarendon', filterName: 'Clarendon' },
   { filter: 'filter-lark', filterName: 'Lark' },
   { filter: 'filter-moon', filterName: 'Moon' },
   { filter: 'filter-grayscale', filterName: 'Juno' },
   { filter: 'filter-retro', filterName: 'Reyes' },
   { filter: 'filter-warm', filterName: 'Warm' },
   { filter: 'filter-aden', filterName: 'Aden' },
   { filter: 'filter-1970s', filterName: '1970s' },
] as const

export type FilterValue = (typeof popularFilters)[number]['filter']
export type FilterName = (typeof popularFilters)[number]['filterName']

const Filter = ({ filter, filterName, isActive, onClick }: FilterProps) => {
   return (
      <Button
         variant="textButton"
         onClick={onClick}
         className={cn(
            'flex flex-col items-center justify-center gap-[6px] rounded-[1px] border-none p-0',
            isActive && 'scale-[1.1]'
         )}
      >
         <Image
            src={FilterPhoto}
            alt={`${filterName} filter`}
            className={cn('h-[108px] w-[108px] rounded-[1px]', filter, isActive && 'brightness-75')}
         />
         <Typography className={cn('text-sm', isActive ? 'text-accent-500' : 'text-light-100')}>
            {filterName}
         </Typography>
      </Button>
   )
}

type Props = {
   currentFilter: string
   onFilterChange: (filter: FilterValue) => void
}

export const FiltersBlock = ({ currentFilter, onFilterChange }: Props) => {
   return (
      <div className="grid grid-cols-3 gap-x-[24px] gap-y-[18px] pt-[24px] pr-[55px] pb-[30px] pl-[54px]">
         {popularFilters.map(item => (
            <Filter
               key={item.filter}
               filter={item.filter}
               filterName={item.filterName}
               isActive={currentFilter === item.filter}
               onClick={() => onFilterChange(item.filter)}
            />
         ))}
      </div>
   )
}
