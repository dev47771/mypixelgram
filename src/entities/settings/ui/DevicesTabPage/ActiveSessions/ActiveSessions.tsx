import { getSessionResponse } from '@/features/settings/api/settings.types'
import { Typography } from '@/shared/components/Typography'
import { DevicesCard } from '../DevicesCard/DevicesCard'

type Props = {
   otherSessions?: getSessionResponse[]
}

export const ActiveSessions = ({ otherSessions }: Props) => {
   return (
      <div>
         <Typography variant="h3" className="mb-[18px]">
            Active sessions
         </Typography>
         {otherSessions && otherSessions.length > 0 ? (
            <div className="flex flex-col gap-[12px]">
               {otherSessions?.map(s => (
                  <DevicesCard
                     key={s.sessionId}
                     deviceName={s.deviceName}
                     deviceType={s.deviceType}
                     ip={s.ip}
                     lastVisit={s.lastActiveAt}
                     deviceId={s.deviceId}
                     isCurrent={s.isCurrent}
                  />
               ))}
            </div>
         ) : (
            <Typography variant="h1" className="mt-[84px] mb-[40px] text-center">
               You have not yet logged in from other devices
            </Typography>
         )}
      </div>
   )
}
