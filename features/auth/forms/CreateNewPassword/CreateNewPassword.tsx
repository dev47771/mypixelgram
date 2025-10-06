import { Card } from '@/shared/components/Card'
import { Typography } from '@/shared/components/Typography'
import { Button } from '@/shared/components/Button'
import { ControlledInput } from '@/shared/components/Controlled'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { passwordSchema } from '@/shared/schema'

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
   onSubmit: (data: FormTypes) => void
}

export const CreateNewPassword = ({ onSubmit }: Props) => {
   const {
      control,
      formState: { errors },
      handleSubmit,
   } = useForm<FormTypes>({
      defaultValues: {
         password: '',
         confirmPassword: '',
      },
      resolver: zodResolver(schema),
   })

   return (
      <Card>
         <Typography variant={'h1'}>Create New Password</Typography>
         <form onSubmit={handleSubmit(onSubmit)}>
            <ControlledInput
               autoComplete="new-password"
               errorMessage={errors.password?.message}
               name={'password'}
               control={control}
               label={'New password'}
               type="password"
            />
            <ControlledInput
               autoComplete="new-password"
               errorMessage={errors.confirmPassword?.message}
               control={control}
               name={'confirmPassword'}
               label={'Password confirmation'}
               type="password"
            />
            <Typography variant={'captionRegular'}>
               Your password must be between 6 and 20 characters
            </Typography>
            <Button fullWidth>Create New Password</Button>
         </form>
      </Card>
   )
}
