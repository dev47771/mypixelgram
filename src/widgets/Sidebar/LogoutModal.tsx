'use client'

import { useLogoutMutation, useMeQuery } from '@/features/auth/api'
import { Button } from '@/shared/components/Button'
import { Modal, ModalBody, ModalClose, ModalTitle } from '@/shared/components/Modal'
import { Typography } from '@/shared/components/Typography'
import { PublicRoutes } from '@/shared/enums'
import { CrossIcon } from '@/shared/icons'
import { useRouter } from 'next/navigation'

type LogoutModalProps = {
   open: boolean
   onOpenChange: (value: boolean) => void
}

export const LogoutModal = ({ open, onOpenChange }: LogoutModalProps) => {
   const [logout] = useLogoutMutation()
   const router = useRouter()

   const { data: user } = useMeQuery()

   const handleClose = () => onOpenChange(false)

   const handleConfirmLogout = async () => {
      try {
         await logout().unwrap()
      } catch (error) {
         console.warn('Logout request failed:', error)
      } finally {
         localStorage.removeItem('accessToken')
         onOpenChange(false)
         router.push(PublicRoutes.signIn)
      }
   }

   return (
      <Modal open={open} onOpenChange={onOpenChange}>
         <ModalTitle className="flex items-center justify-between">
            <Typography variant="h1">Log Out</Typography>
            <ModalClose asChild>
               <CrossIcon />
            </ModalClose>
         </ModalTitle>

         <hr className="text-dark-100 h-[1px]" />

         <ModalBody className="flex max-w-[378px] flex-col gap-4 px-6 py-3">
            <Typography>Are you really want to log out of your account {user?.email}?</Typography>
            <span className="flex gap-2 self-end">
               <Button onClick={handleClose} variant="outlined" className="h-[36px] w-[96px]">
                  No
               </Button>
               <Button onClick={handleConfirmLogout} className="h-[36px] w-[96px]">
                  Yes
               </Button>
            </span>
         </ModalBody>
      </Modal>
   )
}
