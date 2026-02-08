'use client'
import { useMeQuery } from '@/features/auth/api'
import { ROUTES } from '@/shared/constants'
import { cn } from '@/shared/lib'
import Link from 'next/link'

type Props = {
   children: React.ReactNode
   login: string
   className?: string
}

export const ProfileLink = ({ children, login, className }: Props) => {
   const { data: me } = useMeQuery()

   return (
      <Link
         href={me ? ROUTES.profile.private(login) : ROUTES.profile.public(login)}
         className={cn('w-fit', className)}
      >
         {children}
      </Link>
   )
}
