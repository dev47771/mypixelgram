'use client'
import { PageContainer } from '@/shared/components/PageContainer'
import { Typography } from '@/shared/components/Typography'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
export const UserCounter = () => {
   const [countUsers, setCountUsers] = useState('000000')

   useEffect(() => {
      const interval = setInterval(() => {
         setCountUsers(prev => {
            const newNum = parseInt(prev) + 1
            return newNum.toString().padStart(6, '0')
         })
      }, 2000)

      return () => clearInterval(interval)
   }, [])

   return (
      <PageContainer>
         <div
            className={
               'border-dark-300 bg-dark-500 flex h-[72px] w-full max-w-[972px] items-center justify-between rounded-xs border px-6'
            }
         >
            <Typography variant={'h2'}>Registered users:</Typography>
            <div
               className={
                  'border-dark-300 bg-dark-700 flex h-[48px] items-center gap-3 rounded-xs border px-4'
               }
            >
               {countUsers.split('').map((el, i) => (
                  <div
                     key={i}
                     className={'border-dark-300 border-r pr-2 last:border-none last:pr-0'}
                  >
                     <AnimatePresence mode="wait">
                        <motion.div
                           key={el + i}
                           initial={{ y: -20, opacity: 0 }}
                           animate={{ y: 0, opacity: 1 }}
                           exit={{ y: 20, opacity: 0 }}
                           transition={{ duration: 0.3 }}
                        >
                           <Typography variant={'h2'}>{el}</Typography>
                        </motion.div>
                     </AnimatePresence>
                  </div>
               ))}
            </div>
         </div>
      </PageContainer>
   )
}
