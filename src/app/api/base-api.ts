import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQuery } from '.'

export const baseApi = createApi({
   reducerPath: 'baseApi',
   baseQuery: baseQuery,
   tagTypes: [],
   endpoints: () => ({}),
})
