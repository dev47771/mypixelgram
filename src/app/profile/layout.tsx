'use client'

import { PageContainer } from '@/shared/components/PageContainer'
import { Sidebar, SidebarItem } from '@/widgets/Sidebar'
import { ReactNode, useState } from 'react'
import { Modal, ModalBody, ModalClose, ModalTitle } from '@/shared/components/Modal'
import {
   CreateIcon,
   CreateOutlineIcon,
   CrossIcon,
   FavoriteIcon,
   FavoriteOutlineIcon,
   HomeIcon,
   HomeOutlineIcon,
   LogoutIcon,
   MessageIcon,
   MessageOutlineIcon,
   PersonIcon,
   PersonOutlineIcon,
   SearchIcon,
   StatisticIcon,
} from '@/shared/icons'
import { Typography } from '@/shared/components/Typography'
import { Button } from '@/shared/components/Button'
import { useLogoutMutation, useMeQuery } from '@/features/auth/api'
import { useRouter } from 'next/navigation'
import { PublicRoutes } from '@/shared/enums'
export default function ProfileLayout({ children }: { children: ReactNode }) {
   const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false)
   const { data: user, isLoading, isError } = useMeQuery()
   const [logout] = useLogoutMutation()
   const router = useRouter()

   const handleLogoutClick = () => {
      setIsLogoutModalOpen(true)
   }

   const handleCloseModal = () => {
      setIsLogoutModalOpen(false)
   }

   /* const handleConfirmLogout = async () => {
      try {
         await logout().unwrap()
         router.push(PublicRoutes.signIn)
      } catch (e) {
         console.error('Logout error', e)
      }
   } */

   const handleConfirmLogout = async () => {
      try {
         await logout().unwrap()
      } catch (e) {
         console.error('Logout error', e)
      } finally {
         localStorage.removeItem('accessToken')
         router.push(PublicRoutes.signIn)
      }
   }

   if (isLoading) return <p>Loading...</p>
   if (isError) return <p>Error loading user</p>

   return (
      <PageContainer className="items-start">
         <Sidebar className="top-[60px] min-w-[180px] pl-[0px]">
            <SidebarItem id="1" name="Feed" icon={HomeOutlineIcon} activeIcon={HomeIcon} path="/" />
            <SidebarItem
               id="2"
               name="Create"
               icon={CreateOutlineIcon}
               activeIcon={CreateIcon}
               path="/create"
            />
            <SidebarItem
               id="3"
               name="My Profile"
               icon={PersonOutlineIcon}
               activeIcon={PersonIcon}
               path="/profile"
            />
            <SidebarItem
               id="4"
               name="Messenger"
               icon={MessageOutlineIcon}
               activeIcon={MessageIcon}
               path="/messenger"
            />
            <SidebarItem id="5" name="Search" icon={SearchIcon} path="/search" className="mb-15" />
            <SidebarItem id="6" name="Statistics" icon={StatisticIcon} path="/statistics" />
            <SidebarItem
               id="7"
               name="Favorites"
               icon={FavoriteOutlineIcon}
               activeIcon={FavoriteIcon}
               path="/favorites"
               className="mb-45"
            />
            <SidebarItem
               id="8"
               name="Log Out"
               icon={LogoutIcon}
               path="/signup"
               onClick={handleLogoutClick}
            />
         </Sidebar>

         <Modal open={isLogoutModalOpen} onOpenChange={setIsLogoutModalOpen}>
            <ModalTitle className={'flex items-center justify-between'}>
               <Typography variant={'h1'}>Log Out</Typography>
               <ModalClose asChild>
                  <CrossIcon />
               </ModalClose>
            </ModalTitle>

            <hr className={'text-dark-100 h-[1px]'} />

            <ModalBody className="flex max-w-[378px] flex-col gap-4 px-6 py-3">
               <Typography>
                  Are you really want to log out of your account {user?.email}?
               </Typography>
               <span className="flex gap-2 self-end">
                  <Button
                     onClick={handleCloseModal}
                     variant="outlined"
                     className={'h-[36px] w-[96px]'}
                  >
                     No
                  </Button>
                  <Button onClick={handleConfirmLogout} className={'h-[36px] w-[96px]'}>
                     Yes
                  </Button>
               </span>
            </ModalBody>
         </Modal>
         <div className="ml-[180px] pb-6 pl-6">{children}</div>
      </PageContainer>
   )
}
