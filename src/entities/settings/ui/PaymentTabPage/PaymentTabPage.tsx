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
import { PAGE_SIZE_OPTIONS } from '@/entities/settings/constants/pageSizeOptions'

import { useState } from 'react'

export const PaymentTabPage = () => {
   const [currentPage, setCurrentPage] = useState(1)
   const [pageSize, setPageSize] = useState(10)

   const { data, isLoading, isError } = useGetPaymentsQuery({
      page: currentPage,
      limit: pageSize,
   })

   if (isLoading) return <Loader />
   if (isError) {
      return (
         <div className="bg-dark-500 border-dark-300 mx-auto w-fit border p-4">
            Failed to payments. Please try again later.
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
                  payments.map((payment, index) => (
                     <TableRow key={index}>
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

         {totalCount > pageSize && (
            <Pagination
               currentPage={currentPage}
               onChangePage={setCurrentPage}
               onPageSizeChange={value => {
                  setPageSize(Number(value))
                  setCurrentPage(1) // When changing the pageSize, jumps to first page
               }}
               selectOptions={PAGE_SIZE_OPTIONS}
               pageSize={pageSize}
               totalCount={totalCount}
            />
         )}
      </div>
   )
}
