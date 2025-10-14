'use client'
import { Card } from '@/shared/components/Card'
import { Typography } from '@/shared/components/Typography'
import { Button } from '@/shared/components/Button'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { passwordSchema } from '@/shared/schema'
import { ControlledInput } from '@/shared/components/Controlled'
import { useEffect } from 'react'

const schema = z
   .object({
      password: passwordSchema,
      confirmPassword: passwordSchema,
   })
   .refine(data => data.password === data.confirmPassword, {
      message: 'The passwords must match',
      path: ['confirmPassword'],
   })

type FormTypes = z.infer<typeof schema>
type Props = {
   onSubmitAction: (data: FormTypes) => void
   errorsFromApi?: { field: string; message: string }[] | undefined
}

export const CreateNewPasswordForm = ({ onSubmitAction, errorsFromApi }: Props) => {
   const {
      control,
      formState: { errors },
      handleSubmit,
      setError,
   } = useForm<FormTypes>({
      defaultValues: {
         password: '',
         confirmPassword: '',
      },
      resolver: zodResolver(schema),
   })

   useEffect(() => {
      errorsFromApi?.forEach(error => {
         setError(error.field as keyof FormTypes, { message: error.message })
      })
   }, [errorsFromApi, setError])

   return (
      <Card
         className={
            'flex w-full max-w-[378px] flex-col items-center justify-center px-6 pt-[23px] pb-[36px]'
         }
      >
         <Typography variant={'h1'} className={'mb-[37px]'}>
            Create New Password
         </Typography>
         <form onSubmit={handleSubmit(onSubmitAction)} className={'w-full'}>
            <ControlledInput
               autoComplete="new-password"
               errorMessage={errors.password?.message}
               name={'password'}
               control={control}
               label={'New password'}
               type="password"
               className={'mb-6'}
            />
            <ControlledInput
               autoComplete="new-password"
               errorMessage={errors.confirmPassword?.message}
               control={control}
               name={'confirmPassword'}
               label={'Password confirmation'}
               type="password"
               className={'mb-[7px]'}
            />
            <Typography
               variant={'captionRegular'}
               className={'text-light-900 mb-[41px] flex flex-col'}
            >
               <span>Your password must be between 6 and 20 </span>
               <span>characters</span>
            </Typography>
            <Button fullWidth>Create new password</Button>
         </form>
      </Card>
   )
}
