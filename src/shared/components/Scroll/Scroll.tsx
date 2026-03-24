import * as ScrollArea from '@radix-ui/react-scroll-area'
import { ComponentPropsWithRef, ReactNode } from 'react'

export type ScrollProps = {
   children: ReactNode
} & ComponentPropsWithRef<typeof ScrollArea.Root>

export const Scroll = ({ children, className, ref, ...props }: ScrollProps) => {
   return (
      <ScrollArea.Root className={`${className} || ''`} {...props}>
         <ScrollArea.Viewport ref={ref} className="h-full w-full pb-4">
            {children}
         </ScrollArea.Viewport>

         <ScrollArea.Scrollbar
            orientation="horizontal"
            className="flex h-4 touch-none flex-col bg-transparent p-1.5 transition-colors duration-150 select-none"
         >
            <ScrollArea.Thumb className="bg-dark-300 hover:bg-light-900 h-1 flex-1 rounded-full" />
         </ScrollArea.Scrollbar>

         <ScrollArea.Scrollbar
            orientation="vertical"
            className="absolute top-2 right-0 bottom-2 flex w-1 touch-none p-0 select-none"
         >
            <ScrollArea.Thumb className="bg-dark-300 hover:bg-light-900 w-1 flex-1 rounded-full" />
         </ScrollArea.Scrollbar>

         <ScrollArea.Corner />
      </ScrollArea.Root>
   )
}
