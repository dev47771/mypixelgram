'use client'

import { Provider } from 'react-redux'
import { ReactNode } from 'react'
import { store } from '..'
import { useAuthSync } from '@/shared/hooks/useAuthSync'

export const StoreProvider = ({ children }: { children: ReactNode }) => {
   return (
      <Provider store={store}>
         <AuthSyncWrapper>{children}</AuthSyncWrapper>
      </Provider>
   )
}

const AuthSyncWrapper = ({ children }: { children: ReactNode }) => {
   useAuthSync()
   return children
}
