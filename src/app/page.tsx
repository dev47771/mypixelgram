import { PageContainer } from '@/shared/components/PageContainer'
import { RadioGroup, RadioItem } from '@/shared/components/Radio-group'

export default function Home() {
   return (
      <PageContainer className="flex flex-col items-center">
         <RadioGroup>
            <RadioItem value="1" label="Первый вариант" />
            <RadioItem value="2" label="Второй вариант" />
            <RadioItem value="3" label="Третий вариант" />
         </RadioGroup>
      </PageContainer>
   )
}
