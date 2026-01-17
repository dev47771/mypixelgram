import React from 'react'
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from '@/shared/components/Select'

export type SelectOptionsType = {
   label: string
   value: string
}

type Props = {
   selectOptions: readonly SelectOptionsType[]
   onPageSizeChange: (item: string) => void
   defaultValue?: string
}

export const PaginationSelect = ({ defaultValue, onPageSizeChange, selectOptions }: Props) => {
   const itemsToChoose = selectOptions?.map((option, idx) => (
      <SelectItem key={idx} value={option.value} isPagination>
         {option.label}
      </SelectItem>
   ))

   return (
      <Select
         onValueChange={onPageSizeChange}
         defaultValue={defaultValue ?? selectOptions[0].value}
      >
         <SelectTrigger isPagination>
            <SelectValue />
         </SelectTrigger>
         <SelectContent>{itemsToChoose}</SelectContent>
      </Select>
   )
}
