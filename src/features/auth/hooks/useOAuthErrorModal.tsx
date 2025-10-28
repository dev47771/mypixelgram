import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { OAuthErrorModal } from '@/entities/auth/ui/OAuthErrorModal'
import { useState } from 'react'

export const useOAuthErrorModal = () => {
   const [isModalOpen, setIsModalOpen] = useState(true)

   const router = useRouter()
   const currentPath = usePathname()
   const searchParams = useSearchParams()
   const isOAuthError = searchParams.get('error') === 'oauth'

   const handleClose = () => {
      setIsModalOpen(false)
      router.replace(currentPath)
   }

   const modal = isOAuthError && <OAuthErrorModal isOpen={isModalOpen} onClose={handleClose} />
   return { modal }
}
