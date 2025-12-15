import { UserProfileType } from '@/entities/user'
import { settingsRoutes } from '@/shared/enums'
import { Button } from '@/shared/components/Button'
import Link from 'next/link'
import { ProfileHeaderBase } from './ProfileHeaderBase'

type Props = {
   userProfile: UserProfileType
}

export const ProfileHeaderPrivate = ({ userProfile }: Props) => {
   return (
      <ProfileHeaderBase
         user={userProfile.user}
         following={userProfile.following}
         followers={userProfile.followers}
         publicationCount={userProfile.publicationCount}
         description={userProfile.description}
         actions={
            <Button variant="secondary" asChild>
               <Link href={settingsRoutes.base}>Profile Settings</Link>
            </Button>
         }
      />
   )
}
