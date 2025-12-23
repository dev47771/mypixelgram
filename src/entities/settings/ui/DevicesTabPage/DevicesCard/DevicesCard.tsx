import { useDeleteDeviceByIdMutation } from '@/features/settings/api/settings.service'
import { Button } from '@/shared/components/Button'
import { Card } from '@/shared/components/Card'
import { Typography } from '@/shared/components/Typography'
import { cn } from '@/shared/lib'
import { ComponentPropsWithRef } from 'react'
import { alert } from '@/shared/components/Alert'
import { LogoutIcon } from '@/shared/icons'
import { IphoneIcon } from '@/shared/icons/IphoneIcon'
import { DesktopIcon } from '@/shared/icons/DesktopIcon'
import { format, parseISO } from 'date-fns'
import { Loader } from '@/shared/components/Loader'

type Props = {
   deviceName?: string
   deviceType?: string
   ip?: string
   lastVisit?: string
   sessionId?: string
   isCurrent?: boolean
} & ComponentPropsWithRef<'div'>

export const DevicesCard = ({
   className,
   deviceName,
   deviceType,
   ip,
   lastVisit,
   sessionId,
   isCurrent,
}: Props) => {
   const [deleteDeviceById, { isLoading }] = useDeleteDeviceByIdMutation()

   const formattedDate = lastVisit ? format(parseISO(lastVisit), 'dd.MM.yyyy') : 'No data'

   const handleDelete = async () => {
      if (!sessionId) return

      try {
         await deleteDeviceById({ deviceId: sessionId }).unwrap()
      } catch {
         alert.error('Something went wrong')
      }
   }

   return (
      <Card className={cn('flex min-h-[120px] pt-[18px] pr-[24px] pb-[20px] pl-[20px]', className)}>
         <div>
            {deviceType === 'mobile' && <IphoneIcon />}
            {deviceType === 'desktop' && <DesktopIcon />}
            {deviceType === 'tablet'}
         </div>
         <div className="ml-[12px]">
            <Typography variant="bodyBold" className="mb-[13px]">
               {deviceName}
            </Typography>
            <Typography variant="captionRegular">IP: {ip}</Typography>
            {!isCurrent && (
               <Typography variant="smallRegular">Last visit: {formattedDate}</Typography>
            )}
         </div>
         {!isCurrent && (
            <Button variant="textButton" className="text-light-100" onClick={handleDelete}>
               {isLoading ? (
                  <Loader size="24px" color={'var(--color-light-100)'} fullscreen={false} />
               ) : (
                  <div className="mt-auto mb-auto flex w-fit gap-[12px]">
                     <LogoutIcon /> Log Out
                  </div>
               )}
            </Button>
         )}
      </Card>
   )
}
