'use client'

import { cn } from '@/shared/lib'

import Link from 'next/link'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { ComponentPropsWithRef, useState } from 'react'

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

import { YesAndNoModal } from '@/entities/common/ui/YesAndNoModal'
import { useLogoutMutation, useMeQuery } from '@/features/auth/api'
import { TOKEN } from '@/shared/constants'
import { profileRoutes, PublicRoutes } from '@/shared/enums'
import { useCreateQueryString } from '@/shared/hooks'
import { PostCreator } from '@/features/post-creator/PostCreator'

type SidebarItemType = {
   id: string
   name: string
   path?: string
   icon?: React.ElementType
   activeIcon?: React.ElementType
   disabled?: boolean
   onClick?: () => void
   className?: string
}

type Props = {
   items?: SidebarItemType[]
} & ComponentPropsWithRef<'nav'>

export type SidebarItemProps = SidebarItemType & ComponentPropsWithRef<'li'>

export const Sidebar = ({ className, ...rest }: Props) => {
   const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false)
   const router = useRouter()
   const pathname = usePathname()
   const searchParams = useSearchParams()
   const createQueryString = useCreateQueryString()
   const [logout] = useLogoutMutation()

   const action = searchParams.get('action')
   const isOpenPostCreator = action === 'create'

   const token = typeof window !== 'undefined' ? localStorage.getItem(TOKEN) : null

   const { data: user, isError } = useMeQuery(undefined, {
      skip: !token,
   })

   const userId = user?.userId

   const handleLogoutClick = () => setIsLogoutModalOpen(true)

   const handleConfirmLogout = async () => {
      await logout().unwrap()
      setIsLogoutModalOpen(false)
      router.push(PublicRoutes.signIn)
   }

   const showAddPhotoModalHandler = () => {
      router.push(pathname + '?' + createQueryString('action', 'create'))
   }

   const handleClosePostCreator = () => {
      const params = new URLSearchParams(searchParams.toString())
      params.delete('action')

      router.push(pathname + '?' + params.toString())
   }

   if (isError || !user) return null
   // top-[72px]
   return (
      <aside>
         <nav
            {...rest}
            className={cn('border-dark-300 fixed top-0 w-full max-w-[162px] border-r', className)}
         >
            <ul className={cn('flex h-screen flex-col pt-[132px]')}>
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
                  path={`/profile/${userId}?action=create`}
                  onClick={showAddPhotoModalHandler}
               />
               <SidebarItem
                  id="3"
                  name="My Profile"
                  icon={PersonOutlineIcon}
                  activeIcon={PersonIcon}
                  path={`${profileRoutes.private(user.login)}`}
               />
               <SidebarItem
                  id="4"
                  name="Messenger"
                  icon={MessageOutlineIcon}
                  activeIcon={MessageIcon}
                  path="/messenger"
               />
               <SidebarItem
                  id="5"
                  name="Search"
                  icon={SearchIcon}
                  path="/search"
                  className="mb-15"
               />
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
            </ul>
         </nav>

         <YesAndNoModal
            open={isLogoutModalOpen}
            title="Log Out"
            description={
               <>
                  Are you really want to log out of your account{' '}
                  {user?.email && (
                     <>
                        &quot;<strong className="font-bold">{user?.email}</strong>&quot;
                     </>
                  )}
                  ?
               </>
            }
            onConfirm={handleConfirmLogout}
            onCancel={() => setIsLogoutModalOpen(false)}
         />
         {isOpenPostCreator && <PostCreator onCloseAction={handleClosePostCreator} />}
      </aside>
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
      <>
         <li {...rest} className={cn('mb-6 last:mb-9', className)}>
            {onClick ? (
               <button disabled={disabled} onClick={onClick} className={classesForItem}>
                  {content}
               </button>
            ) : (
               <Link href={path as string} className={classesForItem}>
                  {content}
               </Link>
            )}
         </li>
      </>
   )
}
