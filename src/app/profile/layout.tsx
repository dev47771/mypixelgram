import { PageContainer } from '@/shared/components/PageContainer'
import { Sidebar } from '@/widgets/Sidebar'
import { ReactNode } from 'react'

export default function ProfileLayout({ children }: { children: ReactNode }) {
   return (
      <PageContainer className="items-start">
         <Sidebar className="top-[60px] min-w-[180px] pl-[0px]" />
         <div className="ml-[180px] pb-6 pl-6">{children}</div>
      </PageContainer>
   )
}
