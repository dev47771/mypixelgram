'use client'
import { Button } from '@/shared/components/Button'
import { Typography } from '@/shared/components/Typography'
import { PublicRoutes } from '@/shared/enums'
import { CloseLock } from '@/shared/icons/CloseLock'
import { useRouter } from 'next/navigation'

export const LockBlock = () => {
   const router = useRouter()
   const toSingIn = () => {
      router.push(PublicRoutes.signIn)
   }
   const toSingUp = () => {
      router.push(PublicRoutes.signUp)
   }

   return (
      <div className="mt-15 mb-20 flex flex-col items-center justify-center">
         <CloseLock width={80} height={105} />
         <Typography variant="h2" className="text-xxl mt-10 mb-3">
            The best photos are waiting for you
         </Typography>
         <Typography className="text-light-700">
            Log in or create an account to discover more
         </Typography>
         <div className="mt-6 flex items-center justify-center gap-4">
            <Button
               onClick={toSingIn}
               className="bg-success-700 hover:bg-success-500 active:bg-success-900"
            >
               Log In
            </Button>
            <Button
               onClick={toSingUp}
               className="bg-warning-500 hover:bg-warning-300 active:bg-warning-700"
            >
               Register
            </Button>
         </div>
      </div>
   )
}
