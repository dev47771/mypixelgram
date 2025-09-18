import * as Checkbox from '@radix-ui/react-checkbox'
import { Typography } from '../Typography'

export interface UICheckboxProps {
   id: string
   label?: string
   checked?: Checkbox.CheckedState
   onCheckedChange?: (checked: Checkbox.CheckedState) => void
   disabled?: boolean
}

export const UICheckbox: React.FC<UICheckboxProps> = ({
   id,
   label,
   checked,
   onCheckedChange,
   disabled,
}) => {
   return (
      <div className="flex w-fit items-center gap-[2px]">
         <div
            tabIndex={0}
            className={`force-hover relative flex h-9 w-9 items-center justify-center rounded-full border-none bg-transparent shadow-none ring-0 outline-none ${
               disabled
                  ? 'hover:bg-transparent active:bg-transparent focus-visible:bg-transparent'
                  : 'hover:bg-dark-300 active:bg-dark-100 focus-visible:bg-dark-500'
            } `}
         >
            <Checkbox.Root
               className="border-light-100 border-light-500 data-[state=checked]:bg-dark-900 data-[state=checked]:disabled:bg-light-700 data-[state=unchecked]:disabled:border-dark-100 flex h-4.5 w-4.5 cursor-pointer items-center justify-center rounded-[2px] border-2 bg-transparent outline-none data-[state=checked]:h-4 data-[state=checked]:w-4 data-[state=checked]:border-none data-[state=checked]:disabled:cursor-not-allowed data-[state=unchecked]:disabled:cursor-not-allowed"
               id={id}
               checked={checked}
               onCheckedChange={onCheckedChange}
               disabled={disabled}
            >
               <Checkbox.Indicator>
                  <svg
                     width="18"
                     height="18"
                     viewBox="0 0 18 18"
                     fill={disabled ? 'var(--color-dark-100)' : 'var(--color-light-100)'}
                     xmlns="http://www.w3.org/2000/svg "
                  >
                     <path d="M16 0H2C0.89 0 0 0.9 0 2V16C0 17.1 0.89 18 2 18H16C17.11 18 18 17.1 18 16V2C18 0.9 17.11 0 16 0ZM7 14L2 9L3.41 7.59L7 11.17L14.59 3.58L16 5L7 14Z" />
                  </svg>
               </Checkbox.Indicator>
            </Checkbox.Root>
         </div>
         {label && (
            <Typography
               className={disabled ? 'text-light-900' : 'text-light-100'}
               variant="captionRegular"
            >
               {label}
            </Typography>
         )}
      </div>
   )
}
