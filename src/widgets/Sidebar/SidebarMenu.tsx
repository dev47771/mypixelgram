'use client'

import {
   CreateIcon,
   CreateOutlineIcon,
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

import { LogoutModal, Sidebar, SidebarItem } from '@/widgets/Sidebar'
import { useState } from 'react'

export const SidebarMenu = () => {
   const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false)

   const handleLogoutClick = () => setIsLogoutModalOpen(true)

   return (
      <>
         <Sidebar className="top-[60px] min-w-[180px] pl-[0px]">
            <SidebarItem
               id="1"
               name="Feed"
               icon={HomeOutlineIcon}
               activeIcon={HomeIcon}
               path="/feed"
            />
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
            <SidebarItem id="8" name="Log Out" icon={LogoutIcon} onClick={handleLogoutClick} />
         </Sidebar>

         <LogoutModal open={isLogoutModalOpen} onOpenChange={setIsLogoutModalOpen} />
      </>
   )
}
