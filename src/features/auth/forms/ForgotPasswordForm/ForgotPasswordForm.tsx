'use client'
import { Card } from '@/shared/components/Card'
import { Typography } from '@/shared/components/Typography'
import { Button } from '@/shared/components/Button'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { Recaptcha } from '@/entities/Recaptcha'
import { PublicRoutes } from '@/shared/enums'
import { ControlledInput } from '@/shared/components/Controlled/ControlledInput'

const schema = z.object({
   email: z.email(),
})

type FormTypes = z.infer<typeof schema>
type Props = {
   onSubmitAction: (data: FormTypes) => void
   disabled?: boolean
}

export const ForgotPasswordForm = ({ onSubmitAction, disabled }: Props) => {
   const {
      control,
      formState: { errors },
      handleSubmit,
   } = useForm<FormTypes>({
      defaultValues: {
         email: '',
      },
      resolver: zodResolver(schema),
   })

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
            <Button fullWidth className={'mb-6'} disabled={disabled}>
               Send Link
            </Button>
            <Button fullWidth asChild variant="textButton" className={'mb-6'}>
               <Link href={PublicRoutes.signIn}>Back to Sign In</Link>
            </Button>
            <Recaptcha />
         </form>
      </Card>
   )
}
