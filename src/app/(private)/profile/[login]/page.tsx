import { ProfileView } from '@/widgets/Profile'

type Params = {
   login: string
}

export default async function ProfilePage({ params }: { params: Promise<Params> }) {
   const { login } = await params

   return <ProfileView login={login} />
}
