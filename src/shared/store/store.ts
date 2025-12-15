'use client'
import { configureStore } from '@reduxjs/toolkit'
import { baseApi } from '@/shared/store/base-api'
import { TypedUseSelectorHook, useSelector } from 'react-redux'

export const store = configureStore({
   middleware: getDefaultMiddleware => getDefaultMiddleware().concat(baseApi.middleware),
   reducer: {
      [baseApi.reducerPath]: baseApi.reducer,
   },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
