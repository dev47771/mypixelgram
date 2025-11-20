import { PageContainer } from '@/shared/components/PageContainer'
import { ProfileView } from '@/widgets/Profile'

type Params = {
   userLogin: string
}

export default async function ProfilePage({ params }: { params: Promise<Params> }) {
   const { userLogin } = await params

   return (
      <PageContainer>
         <ProfileView login={userLogin} />
      </PageContainer>
   )
}
