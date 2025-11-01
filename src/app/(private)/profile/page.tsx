import { PostCreator } from '@/features/post-creator/PostCreator'
import { PageContainer } from '@/shared/components/PageContainer'
import { useSearchParams, useRouter } from 'next/navigation'
import { ProfileView } from '@/widgets/Profile'

type Props = {
   params: { id: string }
}

export default function ProfilePage({ params }: Props) {
   const router = useRouter()
   const searchParams = useSearchParams()
   const action = searchParams.get('action')

   const handleClosePostCreator = () => {
      router.back() //возвращаемся назад по истории при закрытии PostCreator
   }

   return (
      <PageContainer>
         {action === 'create' && <PostCreator onClose={handleClosePostCreator} />}

         <ProfileView userId={params.id} />
      </PageContainer>
   )
}
