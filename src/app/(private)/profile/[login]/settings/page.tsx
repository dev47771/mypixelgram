export default function ProfileSettingsPage() {
   return (
      <div className={'flex w-full flex-col pt-[36px] pl-6'}>
         <div className={'border-dark-100 h-[36px] w-[972px] border'}>Tabs</div>
         <div className={'flex flex-row'}>
            <div className={'flex flex-col'}>
               <div className={'border-dark-100 h-[192px] w-[192px] border'}>Avatar</div>
               <div className={'border-dark-100 h-[36px] w-[201px] border'}>
                  Select Profile photo
               </div>
            </div>
            <div className={'border-dark-100 h-[700px] w-[740px] border'}>Form</div>
         </div>
      </div>
   )
}
