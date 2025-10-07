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
export default function ProfileLayout({ children }: { children: ReactNode }) {
   const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false)

   const handleLogoutClick = () => {
      setIsLogoutModalOpen(true)
   }

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
               Log Out
               <ModalClose asChild>
                  <CrossIcon />
               </ModalClose>
            </ModalTitle>

            <hr className={'text-dark-100 h-[1px]'} />

            <ModalBody className="flex max-w-[378px] flex-col gap-4 px-6 py-3">
               Are you really want to log out of your account ___email___?
               <span className="flex gap-2 self-end">
                  <ModalClose
                     className={'border-dark-100 h-[36px] w-[96px] rounded-sm border px-4 py-1.5'}
                  >
                     No
                  </ModalClose>
                  <ModalClose className={'bg-accent-300 h-[36px] w-[96px] rounded-sm px-4 py-1.5'}>
                     Yes
                  </ModalClose>
               </span>
            </ModalBody>
         </Modal>
         <div className="ml-[180px] pb-6 pl-6">{children}</div>
      </PageContainer>
   )
}
