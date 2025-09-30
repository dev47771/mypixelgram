'use client'

import React, { ComponentPropsWithRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/shared/lib'
import { SidebarItemType } from '@/widgets/Sidebar/sidebarData'

export type Props = SidebarItemType & ComponentPropsWithRef<'li'>

export const Sidebar = ({ children, className, ...rest }: ComponentPropsWithRef<'nav'>) => {
   return (
      <nav {...rest} className={cn('fixed top-[72px] min-w-[220px] pl-15', className)}>
         <ul className={cn('border-dark-300 flex flex-col border-r')}>{children}</ul>
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
}: Props) => {
   const currentPath = usePathname()
   const IconToRender = currentPath === path && ActiveIcon ? ActiveIcon : Icon

   const content = (
      <>
         {IconToRender && <IconToRender />}
         {name}
      </>
   )

   const classesForItem = cn(
      'text-light-100 text-sm flex items-center gap-3 rounded-xs font-medium outline-none transition-colors duration-200',
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
