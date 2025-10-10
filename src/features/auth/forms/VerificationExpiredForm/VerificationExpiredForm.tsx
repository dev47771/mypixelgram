'use client'
import { Card } from '@/shared/components/Card'
import { Typography } from '@/shared/components/Typography'
import { Button } from '@/shared/components/Button'
import { ControlledInput } from '@/shared/components/Controlled'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { emailSchema } from '@/shared/schema'
import clsx from 'clsx'

const verificationExpiredSchema = z.object({
   email: emailSchema,
})

type FormTypes = z.infer<typeof verificationExpiredSchema>

type Props = {
   onSubmit: (data: FormTypes) => void
}

export const VerificationExpiredForm = ({ onSubmit }: Props) => {
   const {
      control,
      formState: { errors },
      handleSubmit,
   } = useForm<FormTypes>({
      defaultValues: {
         email: '',
      },
      resolver: zodResolver(verificationExpiredSchema),
   })

   return (
      <Card
         className={
            'flex w-full max-w-[294px] flex-col items-center justify-center border-none bg-transparent pt-[35px] pb-[36px]'
         }
      >
         <Typography variant={'h1'} className={'mb-[19px]'}>
            Email verification link expired
         </Typography>
         <Typography variant={'bodyRegular'} className={'mb-[30px] text-center'}>
            Looks like the verification link has expired. Not to worry, we can send the link again
         </Typography>
         <form onSubmit={handleSubmit(onSubmit)} className={'max-w-[229px]'}>
            <ControlledInput
               errorMessage={errors.email?.message}
               name={'email'}
               control={control}
               label={'Email'}
               type={'text'}
               placeholder={'Test@test.com'}
               className={clsx(errors.email ? 'mb-0' : 'mb-6', 'w-full min-w-0!')}
            />
            <Button fullWidth>Resend verification link</Button>
         </form>
      </Card>
   )
}
