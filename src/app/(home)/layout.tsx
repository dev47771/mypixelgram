import { ReactNode } from 'react'
import { cn } from '@/shared/lib'
import SidebarClient from '@/app/(home)/SidebarClient'

export default function HomeLayout({ children, post }: { children: ReactNode; post: ReactNode }) {
   return (
      //здесь стили зависили от data в me запросе, пока что временно убрала, чтобы оставить компонент серверным
      <div className={cn('mx-auto flex w-full max-w-[1280px] px-[60px]')}>
         <SidebarClient />
         <div className={cn('transition-all duration-300')}>
            {children}
            {post}
         </div>
      </div>
   )
}
