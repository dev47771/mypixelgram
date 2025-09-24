import { Meta, StoryObj } from '@storybook/nextjs-vite'
import { Modal } from '@/shared/components/Modal'
import { ComponentPropsWithRef, useState } from 'react'
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

const ModalWrapper = (args: ComponentPropsWithRef<typeof Modal>) => {
   const [show, setShow] = useState(false)

   return (
      <>
         <button onClick={() => setShow(true)}>Open modal</button>

         <Modal onOpenChange={setShow} open={show} {...args}>
            <div className={'flex max-w-[378px] flex-col px-6 py-3'}>
               <Typography>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</Typography>
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

export const Default: Story = {
   render: args => <ModalWrapper {...args} />,
}

export const WithTitle: Story = {
   args: {
      title: 'Title modal',
   },
   render: args => <ModalWrapper {...args} />,
}
