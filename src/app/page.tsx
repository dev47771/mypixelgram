import { PageContainer } from '@/shared/components/PageContainer'

const arr = ['1', '2', '3', '4']

type CardProps = {
   children?: React.ReactNode
}

export default function Home() {
   return (
      <PageContainer>
         <div className="bg-dark-500 border-dark-300 mb-[36px] h-[72px] w-[972px] border"></div>
         <div className="flex flex-row gap-4">
            {arr.map((el, index) => (
               <Card key={index}>{el}</Card>
            ))}
         </div>
      </PageContainer>
   )
}

const Card = ({ children }: CardProps) => {
   return <div className="bg-dark-500 border-dark-300 h-[391px] w-[234px] border">{children}</div>
}
