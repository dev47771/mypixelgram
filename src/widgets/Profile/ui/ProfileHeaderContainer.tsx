import { ProfileHeader } from '@/entities/user'
import { useGetUserByIdQuery } from '@/entities/user/api/user.service'

type Props = {
   userId: string
}

export const ProfileHeaderContainer = ({ userId }: Props) => {
   const { data: user, isLoading: isProfileLoading } = useGetUserByIdQuery(userId)
   // const { data: owner, isLoading: isOwnerProfileLoading } = useMeQuery()
   // const isOwnerProfile = user?.id === owner?.userId // пока не расширят Ми запрос
   const isOwnerProfile = true

   return <ProfileHeader user={user} isOwnerProfile={isOwnerProfile} isLoading={isProfileLoading} />
}
