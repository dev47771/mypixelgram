import React, { ComponentPropsWithRef } from 'react'
import { clsx } from 'clsx'
import { CrossIcon } from '@/shared/icons'
import * as Dialog from '@radix-ui/react-dialog'

type ModalProps = {
   className?: string
} & ComponentPropsWithRef<typeof Dialog.Root>

const ModalTitle = ({
   className,
   children,
   ...rest
}: ComponentPropsWithRef<typeof Dialog.Title>) => {
   return (
      <Dialog.Title className={clsx('px-6 py-3', className)} {...rest}>
         {children}
      </Dialog.Title>
   )
}

const ModalClose = ({ className, ...rest }: ComponentPropsWithRef<typeof Dialog.Close>) => {
   return (
      <Dialog.Close asChild className={clsx('cursor-pointer', className)} {...rest}>
         <CrossIcon />
      </Dialog.Close>
   )
}

const ModalBody = ({ children, ...rest }: ComponentPropsWithRef<typeof Dialog.Description>) => {
   return <Dialog.Description {...rest}>{children}</Dialog.Description>
}

const Modal = ({ children, className, ...rest }: ModalProps) => {
   return (
      <Dialog.Root {...rest}>
         <Dialog.Portal>
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
         </Dialog.Portal>
      </Dialog.Root>
   )
}

export { Modal, ModalTitle, ModalClose, ModalBody }
