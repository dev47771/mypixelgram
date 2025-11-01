import { PageContainer } from '@/shared/components/PageContainer'
import { ProfileView } from '@/widgets/Profile'

export default function ProfilePage({ params }: { params: { id: string } }) {
   return (
      <PageContainer>
         <ProfileView userId={params.id} />
      </PageContainer>
   )
}
