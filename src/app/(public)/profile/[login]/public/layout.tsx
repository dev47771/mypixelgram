import { ReactNode } from 'react'
import { PageContainer } from '@/shared/components/PageContainer'

export default function ProfilePublicLayout({
   children,
   post,
}: {
   children: ReactNode,
   post: ReactNode
}) {
   return (
      <PageContainer
         className={'mx-auto w-full flex-row items-stretch justify-center px-15 py-0'}
      >
         <div className={'ml-0 flex w-full max-w-248 justify-center border-none'}>
            {children}
            {post}
         </div>
      </PageContainer>
   )
}
