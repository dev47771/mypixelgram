import { ProfileHeader } from '@/entities/user'
import { useGetUserByLoginQuery } from '@/entities/user/api/user.service'

type Props = {
   login: string
}

export const ProfileHeaderContainer = ({ login }: Props) => {
   const { data: userProfile, isLoading: isProfileLoading } = useGetUserByLoginQuery(login)
   // const { data: owner, isLoading: isOwnerProfileLoading } = useMeQuery()
   // const isOwnerProfile = user?.id === owner?.userId // пока не расширят Ми запрос
   const isOwnerProfile = true

   return (
      <ProfileHeader
         userProfile={userProfile}
         isOwnerProfile={isOwnerProfile}
         isLoading={isProfileLoading}
      />
   )
}
