'use client'

import React, { ComponentPropsWithRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/shared/lib'
import { sidebarData, SidebarItemType } from '@/widgets/Sidebar/sidebarData'

export type SidebarProps = {
   items?: SidebarItemType[]
} & ComponentPropsWithRef<'nav'>

export type SidebarItemProps = SidebarItemType & ComponentPropsWithRef<'li'>

export const Sidebar = ({ items = sidebarData, children, className, ...rest }: SidebarProps) => {
   return (
      <nav {...rest} className={cn('fixed top-[72px] min-w-[220px] pl-[60px]', className)}>
         <ul className={cn('border-dark-300 flex h-screen flex-col border-r pt-[72px]')}>
            {children ? children : items.map(item => <SidebarItem key={item.id} {...item} />)}
         </ul>
      </nav>
   )
}

export const SidebarItem = ({
   path,
   icon: Icon,
   activeIcon: ActiveIcon,
   disabled,
   name,
   onClick,
   className,
   ...rest
}: SidebarItemProps) => {
   const currentPath = usePathname()
   const IconToRender = currentPath === path && ActiveIcon ? ActiveIcon : Icon

   const content = (
      <>
         {IconToRender && <IconToRender />}
         {name}
      </>
   )

   const classesForItem = cn(
      'text-light-100 text-sm flex items-center gap-3 rounded-xs font-medium outline-none transition-colors duration-200 cursor-pointer',
      'focus-visible:ring-accent-700 hover:text-accent-100 active:text-accent-500 focus-visible:ring-2',
      {
         'text-dark-100 pointer-events-none': disabled,
         'text-accent-500': currentPath === path,
      }
   )

   return (
      <li {...rest} className={cn('mb-6 last:mb-9', className)}>
         {onClick ? (
            <button disabled={disabled} onClick={onClick} className={classesForItem}>
               {content}
            </button>
         ) : (
            <Link href={path} className={classesForItem}>
               {content}
            </Link>
         )}
      </li>
   )
}
