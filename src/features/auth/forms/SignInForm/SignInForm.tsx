'use client'

import React, { useEffect } from 'react'
import { Card } from '@/shared/components/Card'
import { Typography } from '@/shared/components/Typography'
import { GitHubIcon, GoogleIcon } from '@/shared/icons'
import { type SubmitHandler, useForm, type UseFormSetError } from 'react-hook-form'
import { ControlledInput } from '@/shared/components/Controlled'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/shared/components/Button'
import Link from 'next/link'
import { PublicRoutes } from '@/shared/enums'

const signInSchema = z.object({
   email: z.email({ error: 'The email must match the format example@example.com' }),
   password: z.string({ error: 'The email or password are incorrect. Try again please' }),
})

export type Inputs = z.infer<typeof signInSchema>

type Props = {
   onSubmitAction: (data: Inputs, setError: UseFormSetError<Inputs>) => void
   errorsFromApi?: { field: string; message: string }[] | undefined
}

export const SignInForm = ({ onSubmitAction, errorsFromApi }: Props) => {
   const {
      control,
      handleSubmit,
      setError,
      formState: { errors },
   } = useForm<Inputs>({ resolver: zodResolver(signInSchema) })

   useEffect(() => {
      errorsFromApi?.forEach(error => {
         setError(error.field as keyof Inputs, { message: error.message })
      })
   }, [errorsFromApi, setError])

   const onSubmit: SubmitHandler<Inputs> = data => {
      onSubmitAction(data, setError)
   }
   return (
      <Card className={'flex w-full max-w-[378px] flex-col items-center p-6'}>
         <Typography variant="h1">Sign In</Typography>
         <div className={'mt-3 mb-6 flex gap-15'}>
            <GoogleIcon width={'36px'} height={'36px'} />
            <GitHubIcon width={'36px'} height={'36px'} />
         </div>
         <form onSubmit={handleSubmit(onSubmit)} className={'flex w-full flex-col items-center'}>
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
            <Typography variant={'captionRegular'} className={'text-light-900 mt-9 mb-6 self-end'}>
               <Link href={PublicRoutes.forgotPassword}>Forgot Password</Link>
            </Typography>

            <Button type="submit" fullWidth>
               Sign In
            </Button>
            <Typography className={'my-4.5'}>Don’t have an account?</Typography>
            <Typography variant={'h3'} className={'text-accent-500'}>
               <Link href={PublicRoutes.signUp}>Sign Up</Link>
            </Typography>
         </form>
      </Card>
   )
}
