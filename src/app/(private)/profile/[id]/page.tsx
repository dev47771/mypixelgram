import { PageContainer } from '@/shared/components/PageContainer'

import { ProfileView } from '@/widgets/Profile'
import { redirect } from 'next/navigation'
import { PublicRoutes } from '@/shared/enums'

type Params = {
   id: string
}

export default async function ProfilePage({ params }: { params: Promise<Params> }) {
   const { id } = await params

   if (!id || id === 'undefined') {
      redirect(PublicRoutes.main)
   }

   return (
      <PageContainer>
         <ProfileView userId={id} />
      </PageContainer>
   )
}
