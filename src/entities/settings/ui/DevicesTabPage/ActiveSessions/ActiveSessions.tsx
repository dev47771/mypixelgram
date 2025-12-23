import { getSessionResponse } from '@/features/settings/api/settings.types'
import { Typography } from '@/shared/components/Typography'
import { DevicesCard } from '../DevicesCard/DevicesCard'

type Props = {
   otherSessions?: getSessionResponse[]
}

export const ActiveSessions = ({ otherSessions }: Props) => {
   return (
      <div>
         <Typography variant="h3">Active sessions</Typography>
         {otherSessions?.map(s => (
            <DevicesCard
               key={s.sessionId}
               deviceName={s.deviceName}
               deviceType={s.deviceType}
               ip={s.sessionId}
               lastVisit={s.lastActiveAt}
               sessionId={s.sessionId}
               isCurrent={s.isCurrent}
            />
         ))}
      </div>
   )
}
