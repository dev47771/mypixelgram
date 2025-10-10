import { usePathname, useRouter } from 'next/navigation'
import { ComponentType, useCallback, useEffect, useState } from 'react'
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

      const isPublicPath = PUBLIC_PATHS.some(p => pathname.startsWith(p))
      const isProtectedPath = PROTECTED_PATHS.some(p => pathname.startsWith(p))

      const checkAuth = useCallback((): boolean => {
         if (typeof window === 'undefined') return false
         try {
            return !!localStorage.getItem(TOKEN)
         } catch (error) {
            console.error('Error accessing localStorage:', error)
            return false
         }
      }, [])

      const verifyAuth = useCallback(() => {
         const isAuthenticated = checkAuth()

         if (isAuthenticated) {
            if (isPublicPath && !pathname?.includes(PublicRoutes.createNewPassword)) {
               router.replace(PrivateRoutes.profile)
               return
            }
            setAuthStatus('auth')
         } else {
            if (isProtectedPath) {
               router.replace(PublicRoutes.signIn)
               return
            }
            setAuthStatus('unauth')
         }
      }, [checkAuth, isPublicPath, isProtectedPath, pathname, router])

      useEffect(() => {
         verifyAuth()
      }, [pathname, router, verifyAuth])

      if (authStatus === 'checking') {
         return <Loader />
      }

      const shouldRender =
         (authStatus === 'auth' &&
            (!isPublicPath || pathname?.includes(PublicRoutes.createNewPassword))) ||
         (authStatus === 'unauth' && isPublicPath)

      if (!shouldRender) {
         return null
      }

      return <WrappedComponent {...props} />
   }
}
