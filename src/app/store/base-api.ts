'use client'
import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQueryWithReAuth } from '@/app/store/base-query'

export const baseApi = createApi({
   reducerPath: 'baseApi',
   baseQuery: baseQueryWithReAuth,
   tagTypes: ['getPosts', 'getPost', 'Profile', 'Device', 'Me', 'Notifications'],
   endpoints: () => ({}),
})
