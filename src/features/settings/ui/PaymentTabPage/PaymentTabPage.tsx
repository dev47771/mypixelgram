'use client'

import { useGetPaymentsQuery } from '@/features/settings/api/settings.service'
import { Loader } from '@/shared/components/Loader'
import { Pagination } from '@/shared/components/Pagination'
import {
   Table,
   TableBody,
   TableCell,
   TableHead,
   TableHeadCell,
   TableRow,
} from '@/shared/components/Table'
import {
   PAGE_SIZE_OPTIONS,
   PageSize,
   START_CURRENT_PAGE,
   START_PAGE_SIZE,
} from '@/features/settings/model/constants/pageSizeOptions'
import { useState } from 'react'
import { Button } from '@/shared/components/Button'

export const PaymentTabPage = () => {
   const [currentPage, setCurrentPage] = useState(START_CURRENT_PAGE)
   const [pageSize, setPageSize] = useState<PageSize>(START_PAGE_SIZE)

   const { data, isLoading, isError, isFetching, refetch } = useGetPaymentsQuery({
      page: currentPage,
      limit: pageSize,
   })

   if (isLoading || isFetching) return <Loader />
   if (isError) {
      return (
         <div className="bg-dark-500 border-dark-300 mx-auto w-fit border p-4">
            Failed to payments. Please try again later.
            <Button onClick={() => refetch()} className="ml-8">
               Try again
            </Button>
         </div>
      )
   }

   const payments = data?.payments ?? []
   const totalCount = data?.pagination.total ?? 0

   const paddingClass = 'py-2'

   return (
      <div className="flex flex-col gap-4">
         <Table className="table-fixed">
            <TableHead>
               <TableRow>
                  <TableHeadCell className={paddingClass}>Date of Payment</TableHeadCell>
                  <TableHeadCell className={paddingClass}>End date of subscription</TableHeadCell>
                  <TableHeadCell className={paddingClass}>Price</TableHeadCell>
                  <TableHeadCell className={paddingClass}>Subscription Type</TableHeadCell>
                  <TableHeadCell className={paddingClass}>Payment Type</TableHeadCell>
               </TableRow>
            </TableHead>

            <TableBody>
               {payments.length > 0 ? (
                  payments.map(payment => (
                     <TableRow key={payment.id}>
                        <TableCell className={paddingClass}>{payment.paymentDate}</TableCell>
                        <TableCell className={paddingClass}>{payment.endDate}</TableCell>
                        <TableCell className={paddingClass}>{payment.amount}</TableCell>
                        <TableCell className={paddingClass}>{payment.subscriptionType}</TableCell>
                        <TableCell className={paddingClass}>{payment.paymentType}</TableCell>
                     </TableRow>
                  ))
               ) : (
                  <TableRow>
                     <TableCell colSpan={5} className="py-8 text-center">
                        No payments yet
                     </TableCell>
                  </TableRow>
               )}
            </TableBody>
         </Table>

         <Pagination
            currentPage={currentPage}
            onChangePage={setCurrentPage}
            onPageSizeChange={value => {
               setPageSize(Number(value) as PageSize)
               setCurrentPage(1) // When changing the pageSize, jumps to first page
            }}
            selectOptions={PAGE_SIZE_OPTIONS}
            pageSize={Number(pageSize)}
            totalCount={totalCount}
         />
      </div>
   )
}
