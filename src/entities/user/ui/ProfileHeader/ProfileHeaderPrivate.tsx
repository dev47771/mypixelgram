import { ProfileHeaderBase } from './ProfileHeaderBase'
import { Button } from '@/shared/components/Button'
import Link from 'next/link'
import { UserProfileType } from '@/entities/user'

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
               <Link href="#">Profile Settings</Link>
            </Button>
         }
      />
   )
}
