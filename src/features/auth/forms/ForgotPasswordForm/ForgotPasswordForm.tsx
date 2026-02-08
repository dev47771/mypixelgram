'use client'
import { Card } from '@/shared/components/Card'
import { Typography } from '@/shared/components/Typography'
import { Button } from '@/shared/components/Button'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { Recaptcha } from '@/shared/ui/Recaptcha'
import { ControlledInput } from '@/shared/components/Controlled/ControlledInput'
import { useState } from 'react'
import { useEffect } from 'react'
import { forgotPasswordSchema } from '../../model/schemas/authSchemas'
import { ROUTES } from '@/shared/constants'

type FormTypes = z.infer<typeof forgotPasswordSchema>
type Props = {
   onSubmitAction: (data: FormTypes) => void
   errorsFromApi?: { field: string; message: string }[] | undefined
}

export const ForgotPasswordForm = ({ onSubmitAction, errorsFromApi }: Props) => {
   const [recaptchaReady, setRecaptchaReady] = useState(false)

   const {
      control,
      formState: { errors },
      handleSubmit,
      setError,
      watch,
   } = useForm<FormTypes>({
      defaultValues: {
         email: '',
      },
      resolver: zodResolver(forgotPasswordSchema),
   })

   const emailValue = watch('email')

   useEffect(() => {
      errorsFromApi?.forEach(error => {
         setError(error.field as keyof FormTypes, { message: error.message })
      })
   }, [errorsFromApi, setError])
   return (
      <Card className={'flex w-full max-w-[378px] flex-col items-center justify-center p-6'}>
         <Typography variant={'h1'} className={'mb-[37px]'}>
            Forgot Password
         </Typography>
         <form
            onSubmit={handleSubmit(onSubmitAction)}
            className={'flex w-full flex-col items-center'}
         >
            <ControlledInput
               control={control}
               autoComplete="email"
               errorMessage={errors.email?.message}
               name={'email'}
               label={'Email'}
               placeholder={'Epam@epam.com'}
               type="email"
               className={'mb-[7px]'}
            />
            <Typography variant={'captionRegular'} className={'text-light-900 mb-[17px]'}>
               Enter your email address and we will send you further instructions
            </Typography>
            <Button fullWidth className={'mb-6'} disabled={!recaptchaReady || !emailValue}>
               Send Link
            </Button>
            <Button fullWidth asChild variant="textButton" className={'mb-6'}>
               <Link href={ROUTES.public.signIn}>Back to Sign In</Link>
            </Button>
         </form>
         <Recaptcha onVerificationComplete={setRecaptchaReady} />
      </Card>
   )
}
