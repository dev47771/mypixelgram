import { useMeQuery } from '@/features/auth/api'
import { profileRoutes } from '@/shared/enums'
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
         href={me ? profileRoutes.private(login) : profileRoutes.public(login)}
         className={cn('w-fit', className)}
      >
         {children}
      </Link>
   )
}
