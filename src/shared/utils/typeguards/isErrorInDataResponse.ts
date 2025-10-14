import type { ErrorDataResponse } from '@/features/auth/api'

export function isErrorInDataResponse(error: unknown): error is ErrorDataResponse {
   return typeof error === 'object' && error != null && 'status' in error && 'data' in error
}
