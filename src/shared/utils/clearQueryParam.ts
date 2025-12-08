export const clearQueryParam = (searchParams: URLSearchParams, key: string) => {
   const params = new URLSearchParams(searchParams.toString())
   params.delete(key)

   return params.toString()
}
