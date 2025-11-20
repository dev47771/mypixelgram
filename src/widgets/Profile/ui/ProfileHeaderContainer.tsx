import { ProfileHeader } from '@/entities/user'
import { useGetUserByLoginQuery } from '@/entities/user/api/user.service'
import { useMeQuery } from '@/features/auth/api'

type Props = {
   login: string
}

export const ProfileHeaderContainer = ({ login }: Props) => {
   const { data: userProfile, isLoading: isProfileLoading } = useGetUserByLoginQuery(login)
   const { data: owner, isLoading: isOwnerProfileLoading } = useMeQuery()
   const isOwnerProfile = userProfile?.user.id === owner?.userId

   return (
      <ProfileHeader
         userProfile={userProfile}
         isOwnerProfile={isOwnerProfile}
         isLoading={isProfileLoading || isOwnerProfileLoading}
      />
   )
}
