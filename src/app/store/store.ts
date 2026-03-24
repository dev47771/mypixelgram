'use client'
import { configureStore } from '@reduxjs/toolkit'
import { baseApi } from '@/app/store/base-api'
import { TypedUseSelectorHook, useSelector } from 'react-redux'
import { notificationReducer, notificationSlice } from '@/entities/notification'

export const store = configureStore({
   middleware: getDefaultMiddleware => getDefaultMiddleware().concat(baseApi.middleware),
   reducer: {
      [baseApi.reducerPath]: baseApi.reducer,
      [notificationSlice.name]: notificationReducer,
   },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
