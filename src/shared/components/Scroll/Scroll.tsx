import * as ScrollArea from '@radix-ui/react-scroll-area'
import { ComponentPropsWithRef, ReactNode } from 'react'

export type ScrollProps = {
   children: ReactNode
} & ComponentPropsWithRef<typeof ScrollArea.Root>

export const Scroll = ({ children, className, ...props }: ScrollProps) => {
   return (
      <ScrollArea.Root className={`${className} || ''`} {...props}>
         <ScrollArea.Viewport className="h-full w-full">{children}</ScrollArea.Viewport>

         <ScrollArea.Scrollbar
            orientation="horizontal"
            className="flex h-4 touch-none flex-col bg-transparent p-1.5 transition-colors duration-150 select-none"
         >
            <ScrollArea.Thumb className="bg-dark-300 hover:bg-light-900 h-1 flex-1 rounded-full" />
         </ScrollArea.Scrollbar>

         <ScrollArea.Scrollbar
            orientation="vertical"
            className="flex w-4 touch-none bg-transparent p-1.5 transition-colors duration-150 select-none"
         >
            <ScrollArea.Thumb className="bg-dark-300 hover:bg-light-900 w-1 flex-1 rounded-full" />
         </ScrollArea.Scrollbar>

         <ScrollArea.Corner />
      </ScrollArea.Root>
   )
}
