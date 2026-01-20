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
} from '@/entities/settings/constants/pageSizeOptions'
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

   return (
      <div className="flex flex-col gap-4">
         <Table>
            <TableHead>
               <TableRow>
                  <TableHeadCell>Date of Payment</TableHeadCell>
                  <TableHeadCell>End date of subscription</TableHeadCell>
                  <TableHeadCell>Price</TableHeadCell>
                  <TableHeadCell>Subscription Type</TableHeadCell>
                  <TableHeadCell>Payment Type</TableHeadCell>
               </TableRow>
            </TableHead>

            <TableBody>
               {payments.length > 0 ? (
                  payments.map(payment => (
                     <TableRow key={payment.id}>
                        <TableCell>{payment.paymentDate}</TableCell>
                        <TableCell>{payment.endDate}</TableCell>
                        <TableCell>{payment.amount}</TableCell>
                        <TableCell>{payment.subscriptionType}</TableCell>
                        <TableCell>{payment.paymentType}</TableCell>
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
