import { RadioGroup, RadioItem } from '@/shared/components/Radio-group'

export default function Home() {
   return (
      <RadioGroup>
         <RadioItem value="1" label="Первый вариант" />
         <RadioItem value="2" label="Второй вариант" />
         <RadioItem value="3" label="Третий вариант" />
      </RadioGroup>
   )
}
