import { UserProfileType } from '@/entities/user'
import { Button } from '@/shared/components/Button'
import { profileRoutes } from '@/shared/enums'
import Link from 'next/link'
import { ProfileHeaderBase } from './ProfileHeaderBase'

type Props = {
   userProfile: UserProfileType
   login: string
}

export const ProfileHeaderPrivate = ({ userProfile, login }: Props) => {
   return (
      <ProfileHeaderBase
         user={userProfile.user}
         following={userProfile.following}
         followers={userProfile.followers}
         publicationCount={userProfile.publicationCount}
         description={userProfile.description}
         actions={
            <Button variant="secondary" asChild>
               <Link href={`${profileRoutes.private(login)}/settings`}>Profile Settings</Link>
            </Button>
         }
      />
   )
}
