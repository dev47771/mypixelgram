import React, { ComponentPropsWithRef } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { clsx } from 'clsx'
import { CrossIcon } from '@/shared/icons'
import { Typography } from '@/shared/components/Typography'

type Props = {
   className?: string
   title?: string
} & ComponentPropsWithRef<typeof Dialog.Root>

export const Modal = ({ children, className, title, ...rest }: Props) => {
   return (
      <Dialog.Root {...rest}>
         <Dialog.Portal>
            <Dialog.Overlay className={'bg-dark-900/50 fixed inset-0'} />

            <Dialog.Content
               className={clsx(
                  'fixed top-1/2 left-1/2 max-h-[90vh] max-w-[972px] -translate-x-1/2 -translate-y-3/4',
                  'bg-dark-300 border-dark-100 rounded-xs border',
                  className
               )}
            >
               {title && (
                  <>
                     <div className="flex items-center justify-between px-6 py-3">
                        <Typography variant={'h1'}>{title}</Typography>
                        <Dialog.Close asChild className={'cursor-pointer'}>
                           <CrossIcon />
                        </Dialog.Close>
                     </div>

                     <hr className="text-dark-100 h-[1px]" />
                  </>
               )}
               {children}
            </Dialog.Content>
         </Dialog.Portal>
      </Dialog.Root>
   )
}
