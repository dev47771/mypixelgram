import { Typography } from '@/shared/components/Typography'

type Props = {
   totalCount: number | null
}

export const UserCounter = ({ totalCount }: Props) => {
   const countString = totalCount ? totalCount.toString().padStart(6, '0') : '—'

   return (
      <div
         className={
            'border-dark-300 bg-dark-500 mb-9 flex h-[72px] w-full max-w-[972px] items-center justify-between rounded-xs border px-6'
         }
      >
         <Typography variant={'h2'}>Registered users:</Typography>
         <div
            className={
               'border-dark-300 bg-dark-700 flex h-[48px] items-center gap-3 rounded-xs border px-4'
            }
         >
            {countString.split('').map((el, i) => (
               <div key={i} className={'border-dark-300 border-r pr-2 last:border-none last:pr-0'}>
                  <Typography variant={'h2'}>{el}</Typography>
               </div>
            ))}
         </div>
      </div>
   )
}
