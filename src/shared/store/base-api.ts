'use client'
import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQueryWithReAuth } from '@/shared/store/base-query'

export const baseApi = createApi({
   reducerPath: 'baseApi',
   baseQuery: baseQueryWithReAuth,
   tagTypes: ['getPosts', 'getPost', 'Profile'],
   endpoints: () => ({}),
})
