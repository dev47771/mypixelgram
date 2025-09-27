import { Meta, StoryObj } from '@storybook/nextjs-vite'
import { Pagination } from '@/shared/components/Pagination/Pagination'
import { Typography } from '@/shared/components/Typography'
import { useState } from 'react'
import { fn } from 'storybook/test'

const meta = {
   argTypes: {},
   component: Pagination,
   parameters: {
      layout: 'centered',
   },
   globals: {
      backgrounds: { value: 'dark' },
   },
   tags: ['autodocs'],
   title: 'Components/Pagination',
} satisfies Meta<typeof Pagination>

export default meta
type Story = StoryObj<typeof meta>

const options = [
   { label: ' 1', value: '1' },
   { label: ' 2', value: '2' },
   { label: ' 3', value: '3' },
   { label: ' 4', value: '4' },
   { label: ' 5 ', value: '5' },
]
const ControlledPagination = () => {
   const [current, setCurrent] = useState(1)
   const [view, setView] = useState('5')

   const items = [
      { id: '1', label: 'title1' },
      { id: '2', label: 'title2' },
      { id: '3', label: 'title3' },
      { id: '4', label: 'title4' },
      { id: '5', label: 'title5' },
      { id: '6', label: 'title6' },
      { id: '7', label: 'title7' },
      { id: '8', label: 'title8' },
      { id: '9', label: 'title9' },
      { id: '10', label: 'title10' },
   ]

   const setPage = (currentPage: number) => {
      if (current > 0) {
         setCurrent(currentPage)
      }
   }

   return (
      <div style={{ alignItems: 'center', display: 'flex', flexDirection: 'column' }}>
         <Typography variant={'h2'}>Number of current page: {current}</Typography>
         <Typography variant={'h2'}>Count items on page: {view}</Typography>
         <ul>
            {items.slice(0, +view).map(el => (
               <li key={el.id}>{el.label}</li>
            ))}
         </ul>
         <Pagination
            currentPage={current}
            onChangePage={setPage}
            onPageSizeChange={setView}
            selectOptions={options}
            pageSize={Number(view)}
            totalCount={200}
         />
      </div>
   )
}

export const ControlledDemo: Story = {
   args: {
      currentPage: 1,
      selectOptions: [],
      pageSize: 5,
      totalCount: 200,
      onPageSizeChange: fn(),
      onChangePage: fn(),
   },
   render: () => <ControlledPagination />,
}
