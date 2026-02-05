'use client'

import { createContext, ReactNode } from 'react'
import { useModalStack } from './hooks/useModalStack'
import { PostCreator } from './PostCreator'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { Provider } from 'react-redux'
import { store } from '@/shared/store'

type ModalStackContextType = ReturnType<typeof useModalStack>

const ModalStackContext = createContext<ModalStackContextType | undefined>(undefined)

type ModalStackProviderProps = {
   children: ReactNode
   initialModal?: string
}

const ModalStackProvider = ({ children, initialModal = 'ADD_PHOTO' }: ModalStackProviderProps) => {
   const modalStack = useModalStack(initialModal)

   return <ModalStackContext.Provider value={modalStack}>{children}</ModalStackContext.Provider>
}

const meta = {
   title: 'Features/PostCreator',
   component: PostCreator,
   decorators: [
      Story => (
         <Provider store={store}>
            <ModalStackProvider>
               <Story />
            </ModalStackProvider>
         </Provider>
      ),
   ],
   parameters: {
      layout: 'fullscreen',
   },
} satisfies Meta<typeof PostCreator>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
   args: {
      onCloseAction: () => console.log('PostCreator closed'),
   },
}
