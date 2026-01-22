import { Typography } from '@/shared/components/Typography'
import { RadioGroup, RadioItem } from '@/shared/components/Radio-group'
import { Card } from '@/shared/components/Card'
import { PayPalIcon, StripeIcon } from '@/shared/icons'
import { SubscriptionPlanName } from '@/entities/settings'

type Props = {
   value: SubscriptionPlanName
   onChange: (value: SubscriptionPlanName) => void
   onPay: () => void
   isActiveSubscription: boolean
}

export const SubscriptionOptions = ({ value, onChange, onPay, isActiveSubscription }: Props) => {
   return (
      <>
         <Typography variant="h3" className="mb-4.5">
            {isActiveSubscription ? 'Change your subscription:' : 'Your subscription costs:'}
         </Typography>

         <Card className="mb-6 px-3 py-1.5">
            <RadioGroup value={value} onValueChange={onChange}>
               <RadioItem value="DAY" label="$1.99 per day" />
               <RadioItem value="WEEK" label="$4.99 per week" />
               <RadioItem value="MONTH" label="$9.99 per month" />
               <RadioItem value="YEAR" label="$99.99 per year" />
            </RadioGroup>
         </Card>

         <div className="flex items-center justify-end gap-[54px]">
            <Card
               as="button"
               className="flex h-[64px] w-[96px] cursor-not-allowed items-center justify-center rounded-[5px]"
            >
               <PayPalIcon className="h-[48px] w-[70px]" />
            </Card>

            <Typography variant="bodyRegular">Or</Typography>

            <Card
               as="button"
               onClick={onPay}
               className="flex h-[64px] w-[96px] cursor-pointer items-center justify-center rounded-[5px]"
            >
               <StripeIcon className="h-[29px] w-[70px]" />
            </Card>
         </div>
      </>
   )
}
