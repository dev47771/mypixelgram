'use client'
import { Button } from '@/shared/components/Button'
import { Card } from '@/shared/components/Card'
import { ControlledInput } from '@/shared/components/Controlled'
import { Typography } from '@/shared/components/Typography'
import { zodResolver } from '@hookform/resolvers/zod'
import clsx from 'clsx'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { verificationExpiredSchema } from '../../schema/authSchemas'

type FormTypes = z.infer<typeof verificationExpiredSchema>

type Props = {
   onSubmitAction: (data: FormTypes) => void
}

export const VerificationExpiredForm = ({ onSubmitAction }: Props) => {
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
         <form onSubmit={handleSubmit(onSubmitAction)} className={'max-w-[229px]'}>
            <ControlledInput
               errorMessage={errors.email?.message}
               name={'email'}
               control={control}
               label={'Email'}
               type={'email'}
               autoComplete={'email'}
               placeholder={'Test@test.com'}
               className={clsx(errors.email ? 'mb-0' : 'mb-6', 'w-full min-w-0!')}
            />
            <Button fullWidth>Resend verification link</Button>
         </form>
      </Card>
   )
}
