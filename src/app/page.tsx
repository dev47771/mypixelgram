import { RadioGroup, RadioItem } from '@/shared/components/Radio-group'
import { Header } from '@/widgets/Header'

export default function Home() {
   return (
      <>
         <Header />
         <RadioGroup>
            <RadioItem value="1" label="Первый вариант" />
            <RadioItem value="2" label="Второй вариант" />
            <RadioItem value="3" label="Третий вариант" />
         </RadioGroup>
      </>
   )
}
