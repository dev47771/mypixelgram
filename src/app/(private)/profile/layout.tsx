import { Sidebar } from '@/widgets/Sidebar'
import { ReactNode } from 'react'

export default function ProfileLayout({ children }: { children: ReactNode }) {
   return (
      <div className="mx-auto flex w-full max-w-[1280px] flex-col items-start px-[60px]">
         <Sidebar />
         <div className="border-dark-300 ml-[162px] min-h-screen border-l">{children}</div>
      </div>
   )
}
