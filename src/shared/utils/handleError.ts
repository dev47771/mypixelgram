import {
   BaseQueryApi,
   FetchBaseQueryError,
   FetchBaseQueryMeta,
   QueryReturnValue,
} from '@reduxjs/toolkit/query/react'

import { isErrorWithMessage } from '.'
import { alert } from '@/shared/components/Alert'

export const handleError = (
   api: BaseQueryApi,
   result: QueryReturnValue<unknown, FetchBaseQueryError, FetchBaseQueryMeta>
) => {
   let error = 'Some error occurred'
   let flag = true

   if (result.error) {
      switch (result.error.status) {
         case 'FETCH_ERROR':
            error = 'Check your internet connection.'
            break
         case 'PARSING_ERROR':
         case 'CUSTOM_ERROR':
            error = result.error.error
            break
         case 403:
            error = '403 Forbidden Error. Check API-KEY.'
            break
         case 400:
            if (Array.isArray(result.error.data)) {
               flag = false
            }
            if (isErrorWithMessage(result.error.data)) {
               error = result.error.data[0].message
            } else {
               error = JSON.stringify(result.error.data)
            }

            break
         case 401:
            error = 'You are not authorized.'
            break
         default:
            if (
               typeof result.error.status === 'number' &&
               result.error.status >= 500 &&
               result.error.status < 600
            ) {
               error = 'Server error occurred. Please try again later.'
            } else {
               error = JSON.stringify(result.error)
            }
            break
      }
      if (flag) {
         alert.error(error)
      }
   }
}
