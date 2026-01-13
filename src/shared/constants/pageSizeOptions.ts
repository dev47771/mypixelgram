//for PaymentTabPage

export const PAGE_SIZE_OPTIONS = [
   { label: '10', value: '10' },
   { label: '20', value: '20' },
   { label: '50', value: '50' },
] as const

export type PageSize = (typeof PAGE_SIZE_OPTIONS)[number]['value']
