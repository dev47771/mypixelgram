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
import React from 'react'
import { PublicRoutes } from '@/shared/enums'

export type SidebarItemType = {
   id: string
   name: string
   path: string
   icon?: React.ElementType
   activeIcon?: React.ElementType
   disabled?: boolean
   onClick?: () => void
   className?: string
}

export const sidebarData: SidebarItemType[] = [
   {
      id: '1',
      name: 'Feed',
      icon: HomeOutlineIcon,
      activeIcon: HomeIcon,
      path: '/feed',
   },
   {
      id: '2',
      name: 'Create',
      icon: CreateOutlineIcon,
      activeIcon: CreateIcon,
      path: '/create',
   },
   {
      id: '3',
      name: 'My Profile',
      icon: PersonOutlineIcon,
      activeIcon: PersonIcon,
      path: '/profile',
   },
   {
      id: '4',
      name: 'Messenger',
      icon: MessageOutlineIcon,
      activeIcon: MessageIcon,
      path: '/messenger',
   },
   {
      id: '5',
      name: 'Search',
      icon: SearchIcon,
      path: '/search',
      className: 'mb-15',
   },
   {
      id: '6',
      name: 'Statistics',
      icon: StatisticIcon,
      path: '/statistics',
   },
   {
      id: '7',
      name: 'Favorites',
      icon: FavoriteOutlineIcon,
      activeIcon: FavoriteIcon,
      path: '/favorites',
      className: 'mb-45',
   },
   {
      id: '8',
      name: 'Log Out',
      icon: LogoutIcon,
      path: `${PublicRoutes.signUp}`,
   },
]
