import type { ComponentPropsWithRef } from 'react'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

const Table = ({ className, ...rest }: ComponentPropsWithRef<'table'>) => {
   return (
      <table
         className={clsx(
            'bg-dark-700 text-light-100 border-dark-500 w-full rounded border',
            className
         )}
         {...rest}
      />
   )
}
Table.displayName = 'Table'

const TableHead = ({ className, ...rest }: ComponentPropsWithRef<'thead'>) => {
   return <thead className={clsx('bg-dark-500 text-light-100', className)} {...rest} />
}
TableHead.displayName = 'TableHead'

const TableBody = ({ ...rest }: ComponentPropsWithRef<'tbody'>) => {
   return <tbody {...rest} />
}
TableBody.displayName = 'TableBody'

const TableCell = ({ className, ...rest }: ComponentPropsWithRef<'td'>) => {
   return (
      <td
         className={twMerge(
            clsx(
               'border-dark-500 font-regular leading-m text-s h-full border-b-1 px-4 py-6',
               className
            )
         )}
         {...rest}
      />
   )
}
TableCell.displayName = 'TableCell'

const TableRow = ({ ...rest }: ComponentPropsWithRef<'tr'>) => {
   return <tr {...rest} />
}
TableRow.displayName = 'TableRow'

const TableHeadCell = ({ className, ...rest }: ComponentPropsWithRef<'th'>) => {
   return (
      <th
         className={twMerge(clsx('leading-m text-s px-4 py-6 text-left font-semibold', className))}
         {...rest}
      />
   )
}
TableHeadCell.displayName = 'TableHeadCell'

export { TableHeadCell, TableBody, TableHead, TableCell, TableRow, Table }
