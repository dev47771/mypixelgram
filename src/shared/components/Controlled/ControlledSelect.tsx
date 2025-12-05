'use client'

import {
   useController,
   type UseControllerProps,
   type FieldValues,
   type Control,
} from 'react-hook-form'
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from '@/shared/components/Select'
import { Label } from '@/shared/components/Label'

type Props<T extends FieldValues> = Omit<
   UseControllerProps<T>,
   'defaultValue' | 'disabled' | 'rules'
> & {
   control: Control<T>
   label: string
   placeholder?: string
   options: string[]
   disabled?: boolean
   className?: string
}

export const ControlledSelect = <T extends FieldValues>(props: Props<T>) => {
   const {
      control,
      name,
      label,
      placeholder = 'Select...',
      options,
      disabled,
      className,
      ...rest
   } = props

   const { field } = useController({
      control,
      name,
      disabled,
   })

   return (
      <div className={`w-full ${className}`}>
         <Label className="text-sm font-medium">{label}</Label>
         <Select value={field.value} onValueChange={field.onChange} disabled={disabled} {...rest}>
            <SelectTrigger className="w-full">
               <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent className="max-h-[200px] overflow-y-auto">
               {options.map((option, index) => (
                  <SelectItem key={`${option}-${index}`} value={option}>
                     {option}
                  </SelectItem>
               ))}
            </SelectContent>
         </Select>
      </div>
   )
}
