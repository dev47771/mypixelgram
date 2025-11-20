import { Sidebar } from '@/widgets/Sidebar'
import { ReactNode } from 'react'

export default function ProfileLayout({ children }: { children: ReactNode }) {
   return (
      <div className="mx-auto flex w-full flex-col justify-between px-[60px]">
         <Sidebar />
         <div className="border-dark-300 ml-[180px] min-h-screen border-l">{children}</div>
      </div>
   )
}
