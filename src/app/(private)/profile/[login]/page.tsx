import { PageContainer } from '@/shared/components/PageContainer'

import { ProfileView } from '@/widgets/Profile'
import { redirect } from 'next/navigation'
import { PublicRoutes } from '@/shared/enums'

type Params = {
   login: string
}

export default async function ProfilePage({ params }: { params: Promise<Params> }) {
   const { login } = await params

   if (!login || login === 'undefined') {
      redirect(PublicRoutes.main)
   }

   return (
      <PageContainer className={'items-stretch'}>
         <ProfileView login={login} />
      </PageContainer>
   )
}
