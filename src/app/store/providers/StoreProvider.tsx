'use client'

import { Provider } from 'react-redux'
import { ReactNode } from 'react'

import { useAuthSync } from '@/features/auth/model/hooks/useAuthSync'
import { store } from '@/app/store'

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
