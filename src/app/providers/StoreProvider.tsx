'use client'

import { Provider } from 'react-redux'
import { store } from '@/app/model'
import { ReactNode } from 'react'

export const StoreProvider = ({ children }: { children: ReactNode }) => {
   return <Provider store={store}>{children}</Provider>
}
