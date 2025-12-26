'use client'

import { Pagination } from '@/shared/components/Pagination'
import {
   Table,
   TableBody,
   TableCell,
   TableHead,
   TableHeadCell,
   TableRow,
} from '@/shared/components/Table'
import { useState } from 'react'

type Payment = {
   id: string
   paymentDate: string
   endDate: string
   price: number
   subscriptionType: string
   paymentType: string
}

/* type Props = {
   payments: Payment[]
} */

/* {
  "items": [
    {
      "id": "1",
      "paymentDate": "2024-12-12",
      "endDate": "2025-01-12",
      "price": 10,
      "subscriptionType": "1 month",
      "paymentType": "Stripe"
    }
  ],
  "totalCount": 83
}

GET /payments?page=3&pageSize=5

getPayments: builder.query<
  { items: Payment[]; totalCount: number },
  { page: number; pageSize: number }
>({
  query: ({ page, pageSize }) => ({
    url: 'payments',
    params: { page, pageSize },
  }),
})
 */

const paymentsMock: Payment[] = [
   {
      id: '1',
      paymentDate: '12.12.2024',
      endDate: '12.01.2025',
      price: 10,
      subscriptionType: '1 month',
      paymentType: 'Stripe',
   },
   {
      id: '2',
      paymentDate: '12.11.2024',
      endDate: '12.12.2024',
      price: 10,
      subscriptionType: '1 month',
      paymentType: 'Stripe',
   },
   {
      id: '3',
      paymentDate: '12.10.2024',
      endDate: '12.11.2024',
      price: 10,
      subscriptionType: '1 month',
      paymentType: 'PayPal',
   },
   {
      id: '4',
      paymentDate: '12.09.2024',
      endDate: '12.10.2024',
      price: 25,
      subscriptionType: '3 months',
      paymentType: 'Stripe',
   },
   {
      id: '5',
      paymentDate: '12.06.2024',
      endDate: '12.09.2024',
      price: 25,
      subscriptionType: '3 months',
      paymentType: 'PayPal',
   },
   {
      id: '6',
      paymentDate: '12.03.2024',
      endDate: '12.06.2024',
      price: 50,
      subscriptionType: '6 months',
      paymentType: 'Stripe',
   },
   {
      id: '7',
      paymentDate: '12.09.2023',
      endDate: '12.03.2024',
      price: 50,
      subscriptionType: '6 months',
      paymentType: 'PayPal',
   },
   {
      id: '8',
      paymentDate: '12.09.2022',
      endDate: '12.09.2023',
      price: 90,
      subscriptionType: '1 year',
      paymentType: 'Stripe',
   },
]

const selectOptions = [
   { label: '5', value: '5' },
   { label: '10', value: '10' },
   { label: '20', value: '20' },
]

export const PaymentTabPage = () => {
   const payments = paymentsMock

   const [currentPage, setCurrentPage] = useState(1)
   const [pageSize, setPageSize] = useState(5)

   const totalCount = payments.length

   const startIndex = (currentPage - 1) * pageSize
   const endIndex = startIndex + pageSize
   const currentPayments = payments.slice(startIndex, endIndex)

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
               {currentPayments.length > 0 ? (
                  currentPayments.map(payment => (
                     <TableRow key={payment.id}>
                        <TableCell>{payment.paymentDate}</TableCell>
                        <TableCell>{payment.endDate}</TableCell>
                        <TableCell>${payment.price}</TableCell>
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
               setPageSize(Number(value))
               setCurrentPage(1) // ⚠️ обязательно
            }}
            selectOptions={selectOptions}
            pageSize={pageSize}
            totalCount={totalCount}
         />
      </div>
   )
}
