import { Typography } from '@/shared/components/Typography'
import { CrossIcon } from '@/shared/icons'
import { VolumeIcon } from '@/shared/icons/VolumeIcon'
import { VolumeMuteIcon } from '@/shared/icons/VolumeMuteIcon'

type Props = {
   id: string
   onClose: () => void
   onSoundChange: () => void
   onOpenNotifications: () => void
   isSoundEnabled: boolean
   title: string
   message: string
}

export const Toast = ({
   id,
   onClose,
   onSoundChange,
   onOpenNotifications,
   isSoundEnabled,
   title,
   message,
}: Props) => {
   const handleCloseToast = (e: React.MouseEvent) => {
      e.stopPropagation()
      onClose()
   }
   const toggleNotificationSound = (e: React.MouseEvent) => {
      e.stopPropagation()
      onSoundChange()
   }
   const handleNotificationClick = () => {
      onOpenNotifications()
      onClose()
   }

   return (
      <div
         key={id}
         onClick={handleNotificationClick}
         className="text-light-100 bg-dark-500 border-dark-300 hover:border-dark-100 z-20 max-w-[400px] cursor-pointer border-2 px-4 py-5 wrap-break-word transition-all"
      >
         <div className="mb-4 flex content-center items-center justify-between">
            <Typography>{title}</Typography>
            <div className="ml-15 flex gap-5">
               <button
                  onClick={toggleNotificationSound}
                  className="hover:text-accent-300 cursor-pointer"
               >
                  {isSoundEnabled ? <VolumeIcon /> : <VolumeMuteIcon />}
               </button>
               <button onClick={handleCloseToast} className="hover:text-accent-300 cursor-pointer">
                  <CrossIcon />
               </button>
            </div>
         </div>
         <Typography variant="smallRegular">{message}</Typography>
      </div>
   )
}
