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
            ip={currentSession?.ip}
            lastVisit={currentSession?.lastActiveAt}
            isCurrent={currentSession?.isCurrent}
            browser={currentSession?.browser}
            className="mt-[6px] mb-[24px]"
         />
      </div>
   )
}
