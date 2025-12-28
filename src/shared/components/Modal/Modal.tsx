import React, { ComponentPropsWithRef } from 'react'
import { clsx } from 'clsx'
import * as Dialog from '@radix-ui/react-dialog'

type Props = {
   className?: string
   portal?: React.ElementType
} & ComponentPropsWithRef<typeof Dialog.Root>

const ModalTitle = ({
   className,
   children,
   ...rest
}: ComponentPropsWithRef<typeof Dialog.Title>) => {
   return (
      <Dialog.Title asChild className={clsx('px-6 py-3', className)} {...rest}>
         <div>{children}</div>
      </Dialog.Title>
   )
}

const ModalClose = ({
   className,
   children,
   ...rest
}: ComponentPropsWithRef<typeof Dialog.Close>) => {
   return (
      <Dialog.Close className={clsx('cursor-pointer', className)} {...rest}>
         {children}
      </Dialog.Close>
   )
}

const ModalBody = ({
   className,
   children,
   ...rest
}: ComponentPropsWithRef<typeof Dialog.Description>) => {
   return (
      <Dialog.Description asChild {...rest} className={className}>
         <div>{children}</div>
      </Dialog.Description>
   )
}

const Modal = ({ portal: Portal = Dialog.Portal, children, className, ...rest }: Props) => {
   return (
      <Dialog.Root {...rest}>
         <Portal>
            <Dialog.Overlay className={'bg-dark-900/50 fixed inset-0'} />

            <Dialog.Content
               className={clsx(
                  'fixed top-1/2 left-1/2 max-h-[90vh] max-w-[972px] -translate-x-1/2 -translate-y-1/2',
                  'bg-dark-300 border-dark-100 rounded-xs border',
                  className
               )}
            >
               {children}
            </Dialog.Content>
         </Portal>
      </Dialog.Root>
   )
}

export { Modal, ModalTitle, ModalClose, ModalBody }
