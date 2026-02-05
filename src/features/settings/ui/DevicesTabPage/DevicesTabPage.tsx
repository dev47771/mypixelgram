import { Button } from '@/shared/components/Button'
import { ActiveSessions, CurrentDevice } from '.'

import { alert } from '@/shared/components/Alert'
import { Loader } from '@/shared/components/Loader'
import { useDeleteOtherDevicesMutation, useGetDevicesQuery } from '@/features/settings/api'

export const DevicesTabPage = () => {
   const { data, isLoading: isLoadingGetProfile } = useGetDevicesQuery()
   const otherSessions = data?.sessions.filter(session => !session.isCurrent) || []
   const currentSession = data?.sessions.find(session => session.isCurrent === true)

   const [deleteOtherDevices, { isLoading }] = useDeleteOtherDevicesMutation()

   const handleDelete = async () => {
      try {
         await deleteOtherDevices().unwrap()
      } catch {
         alert.error('Something went wrong')
      }
   }
   if (isLoadingGetProfile) return <Loader />
   return (
      <div className="flex flex-col">
         <CurrentDevice currentSession={currentSession} />
         <Button
            variant="outlined"
            className={`pl-auto pr-auto mb-[18px] ml-auto min-w-[257px] transition-all duration-200 ${
               otherSessions.length > 0
                  ? 'pointer-events-auto visible opacity-100'
                  : 'pointer-events-none invisible opacity-0'
            }`}
            onClick={handleDelete}
            disabled={isLoading || otherSessions.length === 0}
         >
            {isLoading ? (
               <Loader size="24px" color={'var(--color-light-100)'} fullscreen={false} />
            ) : (
               'Terminate all other session'
            )}
         </Button>
         <ActiveSessions otherSessions={otherSessions} />
      </div>
   )
}
