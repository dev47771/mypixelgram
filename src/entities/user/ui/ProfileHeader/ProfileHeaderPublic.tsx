import { ProfileHeaderBase } from './ProfileHeaderBase'
import { Button } from '@/shared/components/Button'
import { UserProfileType } from '@/entities/user'

type Props = {
   userProfile: UserProfileType
}

export const ProfileHeaderPublic = ({ userProfile }: Props) => {
   return (
      <ProfileHeaderBase
         user={userProfile.user}
         following={userProfile.following}
         followers={userProfile.followers}
         description={userProfile.description}
         publicationCount={userProfile.publicationCount}
         actions={
            <div className="flex items-center gap-3">
               <Button>Follow</Button>
               <Button variant="secondary">Send Message</Button>
            </div>
         }
      />
   )
}
