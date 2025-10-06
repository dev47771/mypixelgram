import React from 'react'
import { Card } from '@/shared/components/Card'
import { Typography } from '@/shared/components/Typography'
import Link from 'next/link'
import { GitHubIcon, GoogleIcon } from '@/shared/icons'
import { Input } from '@/shared/components/Input'
import { Checkbox } from '@/shared/components/Checkbox'
import { Button } from '@/shared/components/Button'
import { PublicRoutes } from '@/shared/enums'

export const SignUp = () => {
   return (
      <Card className={'max-w-[378px] px-6 pt-6 pb-[30px]'}>
         <div className="w-[330px]">
            <Typography className={'text-center'} variant={'h1'}>
               Sign Up
            </Typography>
            <div className={'mt-3 mb-6 flex justify-center gap-[60px]'}>
               <Link href="#">
                  <GoogleIcon className={'h-[36px] w-[36px]'} />
               </Link>
               <Link href="#">
                  <GitHubIcon className={'h-[36px] w-[36px] text-inherit'} />
               </Link>
            </div>
            <form>
               <Input label={'Username'} placeholder={'Test1'} />
               <Input type={'text'} label={'Email'} placeholder={'Test@test.com'} />
               <Input type={'password'} label={'Password'} placeholder={'Enter your password'} />
               <Input
                  type={'password'}
                  label={'Password confirmation'}
                  placeholder={'Enter your password'}
               />

               <div className={'flex items-center justify-center gap-[8px]'}>
                  <Checkbox />
                  <Typography variant={'smallRegular'}>
                     I agree to the{' '}
                     <Link
                        href={PublicRoutes.termsOfService}
                        className={'text-accent-500 underline'}
                     >
                        Terms of Service
                     </Link>{' '}
                     and{' '}
                     <Link
                        href={PublicRoutes.privicePolicy}
                        className={'text-accent-500 underline'}
                     >
                        Privacy Policy
                     </Link>
                  </Typography>
               </div>

               <Button className={'mt-3 mb-[18px]'} type={'submit'} variant={'primary'} fullWidth>
                  Sign Up
               </Button>
            </form>

            <div>
               <Typography className={'mb-[6px] text-center'}>Do you have an account?</Typography>
               <Button className={'border-0'} variant={'outlined'} fullWidth asChild>
                  <Link href={PublicRoutes.signIn}>Sign In</Link>
               </Button>
            </div>
         </div>
      </Card>
   )
}
