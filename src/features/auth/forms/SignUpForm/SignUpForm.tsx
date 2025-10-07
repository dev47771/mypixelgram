import React from 'react'
import { Card } from '@/shared/components/Card'
import { Typography } from '@/shared/components/Typography'
import Link from 'next/link'
import { GitHubIcon, GoogleIcon } from '@/shared/icons'
import { Button } from '@/shared/components/Button'
import { PublicRoutes } from '@/shared/enums'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ControlledCheckbox, ControlledInput } from '@/shared/components/Controlled'
import { emailSchema, passwordSchema, usernameSchema } from '@/shared/schema'
import { clsx } from 'clsx'

const signUpSchema = z
   .object({
      login: usernameSchema,
      email: emailSchema,
      password: passwordSchema,
      confirmPassword: passwordSchema,
      termsAccepted: z.boolean(),
   })
   .refine(date => date.password === date.confirmPassword, {
      message: 'Passwords must match',
      path: ['confirmPassword'],
   })

type FormTypes = z.infer<typeof signUpSchema>

type Props = {
   onSubmit: (data: FormTypes) => void
}

export const SignUpForm = ({ onSubmit }: Props) => {
   const {
      control,
      formState: { errors, isValid, isSubmitting },
      handleSubmit,
      watch,
      reset,
   } = useForm<FormTypes>({
      mode: 'onBlur',
      defaultValues: {
         login: '',
         email: '',
         password: '',
         confirmPassword: '',
         termsAccepted: false,
      },
      resolver: zodResolver(signUpSchema),
   })

   const submitHandler = (data: FormTypes) => {
      onSubmit(data)
      reset()
   }

   return (
      <Card className={'max-w-[378px] px-6 py-6'}>
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
            <form onSubmit={handleSubmit(submitHandler)}>
               <ControlledInput
                  errorMessage={errors.login?.message}
                  name={'login'}
                  control={control}
                  label={'Username'}
                  type="text"
                  placeholder={'Test1'}
                  className={clsx(errors.login ? 'mb-0' : 'mb-6')}
               />
               <ControlledInput
                  errorMessage={errors.email?.message}
                  name={'email'}
                  control={control}
                  label={'Email'}
                  type={'text'}
                  placeholder={'Test@test.com'}
                  className={clsx(errors.email ? 'mb-0' : 'mb-6')}
               />
               <ControlledInput
                  errorMessage={errors.password?.message}
                  name={'password'}
                  control={control}
                  type={'password'}
                  label={'Password'}
                  placeholder={'Enter your password'}
                  className={clsx(errors.password ? 'mb-0' : 'mb-6')}
               />

               <ControlledInput
                  errorMessage={errors.confirmPassword?.message}
                  name={'confirmPassword'}
                  control={control}
                  type={'password'}
                  label={'Password confirmation'}
                  placeholder={'Enter your password'}
                  className={clsx(errors.confirmPassword ? 'mb-0' : 'mb-2')}
               />

               <div className={'flex items-center justify-center gap-[8px]'}>
                  <ControlledCheckbox name={'termsAccepted'} control={control} />
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

               <Button
                  className={'mt-3 mb-[18px]'}
                  type={'submit'}
                  variant={'primary'}
                  disabled={!watch('termsAccepted') || isSubmitting || !isValid}
                  fullWidth
               >
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
