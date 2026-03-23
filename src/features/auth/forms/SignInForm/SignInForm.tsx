'use client'

import React, { useEffect } from 'react'
import { Card } from '@/shared/components/Card'
import { Typography } from '@/shared/components/Typography'
import { useForm } from 'react-hook-form'
import { ControlledInput } from '@/shared/lib/Controlled'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/shared/components/Button'
import Link from 'next/link'
import { ROUTES } from '@/shared/constants'
import { Loader } from '@/shared/components/Loader'
import { GoogleOAuthButton } from '@/features/auth/oauth'
import { signInSchema } from '../../model/schemas/authSchemas'
import { GitHubOAuthButton } from '@/features/auth/oauth/GitHubOAuthButton'

type FormTypes = z.infer<typeof signInSchema>

type Props = {
   onSubmitAction: (data: FormTypes) => void
   isLoading: boolean
   errorsFromApi?: { field: string; message: string }[] | undefined
}

export const SignInForm = ({ onSubmitAction, isLoading, errorsFromApi }: Props) => {
   const {
      control,
      handleSubmit,
      setError,
      formState: { errors },
   } = useForm<FormTypes>({ resolver: zodResolver(signInSchema) })

   useEffect(() => {
      errorsFromApi?.forEach(error => {
         setError(error.field as keyof FormTypes, { message: error.message })
      })
   }, [errorsFromApi, setError])

   return (
      <Card className={'flex w-full max-w-[378px] flex-col items-center p-6'}>
         <Typography variant="h1">Sign In</Typography>
         <div className={'mt-3 mb-6 flex gap-15'}>
            <GoogleOAuthButton />
            <GitHubOAuthButton />
         </div>
         <form
            onSubmit={handleSubmit(onSubmitAction)}
            className={'flex w-full flex-col items-center'}
         >
            <ControlledInput
               name={'email'}
               control={control}
               label={'Email'}
               errorMessage={errors.email?.message}
               className={'mb-6'}
               autoComplete="email"
               placeholder={'example@example.com'}
            />
            <ControlledInput
               name={'password'}
               control={control}
               label={'Password'}
               type={'password'}
               errorMessage={errors.password?.message}
               placeholder={'**********'}
            />
            <Typography
               variant={'captionRegular'}
               className={
                  'text-light-900 hover:text-light-700 mt-9 mb-6 self-end transition-colors duration-200'
               }
            >
               <Link href={ROUTES.public.forgotPassword}>Forgot Password</Link>
            </Typography>

            <Button type="submit" fullWidth disabled={isLoading} className="h-[36px]">
               {isLoading ? (
                  <Loader size="24px" color={'var(--color-light-100)'} fullscreen={false} />
               ) : (
                  'Sign In'
               )}
            </Button>

            <Typography className={'my-4.5'}>Don’t have an account?</Typography>
            <Button asChild variant={'textButton'}>
               <Link href={ROUTES.public.signUp}>Sign Up</Link>
            </Button>
         </form>
      </Card>
   )
}
