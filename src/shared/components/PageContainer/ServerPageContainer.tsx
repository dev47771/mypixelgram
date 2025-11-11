import { ReactNode } from 'react'
import { PageContainer } from './PageContainer'

export default function ServerPageContainer({ children }: { children: ReactNode }) {
   return <PageContainer>{children}</PageContainer>
}
