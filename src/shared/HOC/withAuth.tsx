import { usePathname, useRouter } from 'next/navigation'
import { ComponentType, useEffect, useState } from 'react'
import { TOKEN } from '@/shared/constants'
import { PrivateRoutes, PublicRoutes } from '@/shared/enums'
import { Loader } from '@/shared/components/Loader'

const PUBLIC_PATHS = [
   PublicRoutes.signIn,
   PublicRoutes.signUp,
   PublicRoutes.privacyPolicy,
   PublicRoutes.termsOfService,
   PublicRoutes.createNewPassword,
   PublicRoutes.forgotPassword,
   PublicRoutes.verificationExpired,
   PublicRoutes.signUpSuccess,
].map(String)

const PROTECTED_PATHS = [
   PrivateRoutes.profile,
   PrivateRoutes.settings,
   PrivateRoutes.favorites,
   PrivateRoutes.feed,
   PrivateRoutes.messenger,
   PrivateRoutes.search,
   PrivateRoutes.statistics,
].map(String)

export const withAuth = <P extends object>(WrappedComponent: ComponentType<P>) => {
   // eslint-disable-next-line react/display-name
   return (props: P) => {
      const router = useRouter()
      const pathname = usePathname()
      const [authStatus, setAuthStatus] = useState<'checking' | 'auth' | 'unauth'>('checking')

      useEffect(() => {
         const checkAuth = () => !!localStorage.getItem(TOKEN)

         const verifyAuth = () => {
            const isAuthenticated = checkAuth()

            const isPublic = PUBLIC_PATHS.some(p => pathname.startsWith(p))
            const isProtected = PROTECTED_PATHS.some(p => pathname.startsWith(p))

            if (isAuthenticated) {
               if (isPublic) {
                  setAuthStatus('auth')
               } else {
                  setAuthStatus('auth')
               }
            } else {
               if (isProtected) {
                  router.replace(PublicRoutes.signIn)
                  setAuthStatus('unauth')
               } else {
                  setAuthStatus('unauth')
               }
            }
         }

         verifyAuth()
      }, [pathname, router])

      if (authStatus === 'checking') {
         return <Loader />
      }

      if (
         (authStatus === 'auth' && !PUBLIC_PATHS.includes(pathname)) ||
         (authStatus === 'unauth' && PUBLIC_PATHS.includes(pathname))
      ) {
         return <WrappedComponent {...props} />
      }

      return null
   }
}
