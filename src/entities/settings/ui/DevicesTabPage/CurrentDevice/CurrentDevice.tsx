import { Typography } from '@/shared/components/Typography'
import { DevicesCard } from '../DevicesCard/DevicesCard'
import { getSessionResponse } from '@/features/settings/api/settings.types'

type Props = {
   currentSession?: getSessionResponse
}

export const CurrentDevice = ({ currentSession }: Props) => {
   return (
      <div>
         <Typography variant="h3">Current device</Typography>
         <DevicesCard
            deviceName={currentSession?.deviceName}
            deviceType={currentSession?.deviceType}
            ip={currentSession?.sessionId}
            lastVisit={currentSession?.lastActiveAt}
            sessionId={currentSession?.sessionId}
            isCurrent={currentSession?.isCurrent}
            className="mt-[6px] mb-[24px]"
         />
      </div>
   )
}
