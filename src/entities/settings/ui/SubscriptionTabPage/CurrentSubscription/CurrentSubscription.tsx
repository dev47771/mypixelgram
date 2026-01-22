import { Typography } from '@/shared/components/Typography'
import { Card } from '@/shared/components/Card'
import { prettifyDate } from '@/shared/utils/date/prettifyDate'
import { Button } from '@/shared/components/Button'

type Props = {
   expiresAt: string
   nextPayment: string
   onCancelClick: () => void
}

export const CurrentSubscription = ({ expiresAt, nextPayment, onCancelClick }: Props) => {
   return (
      <>
         <Typography variant="h3" className="mb-4.5">
            Current Subscription:
         </Typography>

         <Card className="flex gap-11 px-3 py-1.5">
            <div className="flex flex-col gap-3">
               <Typography as="span" variant="captionRegular" className="text-light-900">
                  Expire at
               </Typography>
               <Typography variant="captionBold">{prettifyDate(expiresAt)}</Typography>
            </div>

            <div className="flex flex-col gap-3">
               <Typography as="span" variant="captionRegular" className="text-light-900">
                  Next payment
               </Typography>
               <Typography variant="captionBold">{prettifyDate(nextPayment)}</Typography>
            </div>
         </Card>

         <div className="my-4 flex justify-end">
            <Button variant="outlined" onClick={onCancelClick}>
               <Typography variant="h3">Cancel subscription</Typography>
            </Button>
         </div>
      </>
   )
}
