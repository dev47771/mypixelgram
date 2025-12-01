'use client'
import { configureStore } from '@reduxjs/toolkit'
import {baseApi} from "@/shared/store/base-api";


export const store = configureStore({
   middleware: getDefaultMiddleware => getDefaultMiddleware().concat(baseApi.middleware),
   reducer: {
      [baseApi.reducerPath]: baseApi.reducer,
   },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
