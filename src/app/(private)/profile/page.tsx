import { PageContainer } from '@/shared/components/PageContainer'

import { ProfileView } from '@/widgets/Profile'

type Props = {
   params: { id: string }
}

export default function ProfilePage({ params }: Props) {
   return (
      <PageContainer>
         <ProfileView userId={params.id} />
      </PageContainer>
   )
}
