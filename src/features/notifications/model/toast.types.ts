export type ToastType = {
   id: string
   status: 'read' | 'unread'
   title: string
   description: string
   createdAt: string
}

export type ToastUIType = ToastType & {
  timerId?: NodeJS.Timeout
}
