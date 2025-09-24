import { Meta, StoryObj } from '@storybook/nextjs-vite'
import { Modal } from '@/shared/components/Modal'
import { useState } from 'react'
import { Typography } from '@/shared/components/Typography'

const meta = {
   argTypes: {},
   component: Modal,
   parameters: {
      layout: 'centered',
   },
   tags: ['autodocs'],
   title: 'Components/Modal',
} satisfies Meta<typeof Modal>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
   render: args => {
      const DefaultModal = () => {
         const [show, setShow] = useState(false)

         return (
            <>
               <button onClick={() => setShow(true)}>Open modal</button>

               <Modal onOpenChange={setShow} open={show} {...args}>
                  <div className={'flex max-w-[378px] flex-col px-6 py-3'}>
                     <Typography>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                     </Typography>
                     <button
                        className={'bg-accent-300 cursor-pointer self-end rounded-sm px-4 py-1.5'}
                        onClick={() => setShow(false)}
                     >
                        ok
                     </button>
                  </div>
               </Modal>
            </>
         )
      }

      return <DefaultModal />
   },
}

export const WithTitle: Story = {
   render: () => {
      const WithTitleModal = () => {
         const [show, setShow] = useState(false)

         return (
            <>
               <button onClick={() => setShow(true)}>Open modal</button>

               <Modal title={'Title modal'} onOpenChange={setShow} open={show}>
                  <div className={'flex max-w-[378px] flex-col px-6 py-3'}>
                     <Typography>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                     </Typography>
                     <button
                        className={'bg-accent-300 cursor-pointer self-end rounded-sm px-4 py-1.5'}
                        onClick={() => setShow(false)}
                     >
                        ok
                     </button>
                  </div>
               </Modal>
            </>
         )
      }

      return <WithTitleModal />
   },
}
