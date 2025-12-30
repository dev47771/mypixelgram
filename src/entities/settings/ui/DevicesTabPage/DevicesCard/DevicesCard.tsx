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
import { ChromeIcon } from '@/shared/icons/browsers/ChromeIcon'
import { BraveIcon } from '@/shared/icons/browsers/BraveIcon'
import { ExplorerIcon } from '@/shared/icons/browsers/ExplorerIcon'
import { FirefoxIcon } from '@/shared/icons/browsers/FirefoxIcon'
import { MicrosoftEdge } from '@/shared/icons/browsers/MicrosoftEdge'
import { OperaIcon } from '@/shared/icons/browsers/OperaIcon'
import { SafariIcon } from '@/shared/icons/browsers/SafariIcon'
import { UcBrowserIcon } from '@/shared/icons/browsers/UcBrowserIcon'
import { YandexIcon } from '@/shared/icons/browsers/YandexIcon'

type Props = {
   deviceName?: string
   deviceType?: string
   ip?: string
   lastVisit?: string
   deviceId?: string
   isCurrent?: boolean
   browser?: string
} & ComponentPropsWithRef<'div'>

const browserIcons: Record<string, React.ComponentType> = {
   brave: BraveIcon,
   chrome: ChromeIcon,
   explorer: ExplorerIcon,
   firefox: FirefoxIcon,
   'microsoft edge': MicrosoftEdge,
   opera: OperaIcon,
   safari: SafariIcon,
   'uc browser': UcBrowserIcon,
   yandex: YandexIcon,
}

const getBrowserIcon = (browserName?: string) => {
   if (!browserName) return DesktopIcon

   const name = browserName.toLowerCase()
   if (name.includes('brave')) return browserIcons.brave || DesktopIcon
   if (name.includes('chrome')) return browserIcons.chrome || DesktopIcon
   if (name.includes('explorer')) return browserIcons.explorer || DesktopIcon
   if (name.includes('firefox')) return browserIcons.firefox || DesktopIcon
   if (name.includes('microsoft edge')) return browserIcons['microsoft edge'] || DesktopIcon
   if (name.includes('opera')) return browserIcons.opera || DesktopIcon
   if (name.includes('safari')) return browserIcons.safari || DesktopIcon
   if (name.includes('uc browser')) return browserIcons['uc browser'] || DesktopIcon
   if (name.includes('yandex')) return browserIcons.yandex || DesktopIcon

   return DesktopIcon
}

export const DevicesCard = ({
   className,
   deviceName,
   deviceType,
   ip,
   lastVisit,
   deviceId,
   isCurrent,
   browser,
}: Props) => {
   const [deleteDeviceById, { isLoading }] = useDeleteDeviceByIdMutation()

   const BrowserIcon = getBrowserIcon(browser)

   const formatIP = (ip: string) => ip.replace(/^::ffff:/, '')

   const formattedDate = lastVisit ? format(parseISO(lastVisit), 'dd.MM.yyyy') : 'No data'

   const handleDelete = async () => {
      if (!deviceId) return

      try {
         await deleteDeviceById({ deviceId: deviceId }).unwrap()
      } catch {
         alert.error('Something went wrong')
      }
   }

   return (
      <Card className={cn('flex min-h-[120px] pt-[18px] pr-[24px] pb-[20px] pl-[20px]', className)}>
         <div className="flex gap-[12px]">
            <div className="mt-[6px]">
               {isCurrent ? (
                  <BrowserIcon />
               ) : (
                  <>
                     {deviceType === 'mobile' && <IphoneIcon />}
                     {deviceType === 'desktop' && <DesktopIcon />}
                     {deviceType === 'tablet' && <DesktopIcon />}
                  </>
               )}
            </div>
            <div>
               <Typography variant="bodyBold" className="mb-[13px]">
                  {isCurrent ? browser : deviceName}
               </Typography>
               <Typography variant="captionRegular">IP: {ip ? formatIP(ip) : 'Unknown'}</Typography>
               {!isCurrent && (
                  <Typography variant="smallRegular">Last visit: {formattedDate}</Typography>
               )}
            </div>
         </div>

         {!isCurrent && (
            <Button variant="textButton" className="text-light-100 ml-auto" onClick={handleDelete}>
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
