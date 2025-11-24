import { Sidebar } from '@/widgets/Sidebar'
import { ReactNode } from 'react'
import { PageContainer } from '@/shared/components/PageContainer'

export default function ProfileLayout({ children }: { children: ReactNode }) {
   return (
      <PageContainer
         className={'mx-auto w-full flex-row items-stretch justify-between px-[60px] py-0'}
      >
         <Sidebar />
         <div className="border-dark-300 ml-[180px] min-h-screen w-full border-l">{children}</div>
      </PageContainer>
   )
}
