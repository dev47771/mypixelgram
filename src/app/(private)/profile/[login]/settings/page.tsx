'use client'

import { AvatarUploader } from '@/entities/settings/ui/modals/AddAvatarModal'
import { withPrivateRoute } from '@/shared/HOC'

function ProfileSettingsPage() {
   return (
      <div className={'flex w-full flex-col pt-[36px] pl-6'}>
         <div className={'border-dark-100 h-[36px] w-[972px] border'}>Tabs</div>
         <div className={'flex flex-row'}>
            <AvatarUploader />
            <div className={'border-dark-100 h-[700px] w-[740px] border'}>Form</div>
         </div>
      </div>
   )
}

export default withPrivateRoute(ProfileSettingsPage)
