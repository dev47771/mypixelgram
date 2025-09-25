import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from './'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'

const meta = {
   component: Table,
   tags: ['autodocs'],
   title: 'Components/Table',
} satisfies Meta<typeof Table>

export default meta
type Story = StoryObj<typeof meta>

export const TableStory: Story = {
   args: {
      children: (
         <>
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
               <TableRow>
                  <TableCell>12.12.2022</TableCell>
                  <TableCell>12.12.2022</TableCell>
                  <TableCell>$100</TableCell>
                  <TableCell>1 day</TableCell>
                  <TableCell>Stripe</TableCell>
               </TableRow>
               <TableRow>
                  <TableCell>12.12.2022</TableCell>
                  <TableCell>12.12.2022</TableCell>
                  <TableCell>$100</TableCell>
                  <TableCell>1 day</TableCell>
                  <TableCell>Stripe</TableCell>
               </TableRow>
               <TableRow>
                  <TableCell>12.12.2022</TableCell>
                  <TableCell>12.12.2022</TableCell>
                  <TableCell>$100</TableCell>
                  <TableCell>1 day</TableCell>
                  <TableCell>Stripe</TableCell>
               </TableRow>
            </TableBody>
         </>
      ),
   },
}
