import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQuery } from '@/shared/store/base-query'

export const baseApi = createApi({
   reducerPath: 'baseApi',
   baseQuery: baseQuery,
   tagTypes: [],
   endpoints: () => ({}),
})
