import { Typography } from '@/shared/components/Typography'
import { RadioGroup, RadioItem } from '@/shared/components/Radio-group'
import { Card } from '@/shared/components/Card'
import { ACCOUNT_TYPE } from '@/features/settings'
import { AccountType } from '@/features/settings/model/hooks/useSubscription'

type Props = {
   value: AccountType
   disabled: boolean
   onChange: (value: string) => void
}

export const UserAccountType = ({ value, disabled, onChange }: Props) => {
   return (
      <>
         <Typography variant="h3" className="mb-4.5">
            Account type:
         </Typography>

         <Card className="mb-10.5 px-3 py-1.5">
            <RadioGroup value={value} onValueChange={onChange}>
               <RadioItem disabled={disabled} value={ACCOUNT_TYPE.PERSONAL} label="Personal" />
               <RadioItem value={ACCOUNT_TYPE.BUSINESS} label="Business" />
            </RadioGroup>
         </Card>
      </>
   )
}
