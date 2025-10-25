import React, { ReactNode } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { clsx } from 'clsx'

type Direction = 'prev' | 'next'

type Props = {
   direction: Direction
   disabled?: boolean
   onClick?: () => void
   children: ReactNode
}

export const PaginationLink = ({ direction, disabled, onClick, children }: Props) => {
   const searchParams = useSearchParams()

   const parsed = Number(searchParams?.get('page'))
   const currentPage = parsed && parsed > 0 ? parsed : 1

   const prevPage = currentPage > 1 ? currentPage - 1 : 1
   const targetPage = direction === 'prev' ? prevPage : currentPage + 1

   const newSearchParams = new URLSearchParams(searchParams?.toString() || '')

   if (targetPage === 1) {
      newSearchParams.delete('page')
   } else {
      newSearchParams.set('page', targetPage.toString())
   }

   return (
      <Link
         href={`?${newSearchParams.toString()}`}
         className={clsx(
            'focus-visible:outline-accent-700 focus-visible:outline-2',
            disabled && 'text-dark-100 pointer-events-none cursor-not-allowed'
         )}
         onClick={onClick}
         tabIndex={disabled ? -1 : 1}
      >
         {children}
      </Link>
   )
}
