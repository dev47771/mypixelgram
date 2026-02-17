export { Notification } from './ui/Notification'
export * from './api/notification.service'
export * from './model/notification.types'
export { useNotificationsSocket } from './model/hooks/useNotificationsSocket'
export { NotificationsDropdown } from './ui/NotificationsDropdown'
export {
   notificationSlice,
   selectUnreadCount,
   selectIsDropdownOpen,
   updateUnreadCount,
   decrementUnreadCount,
   setDropdownOpen,
   notificationReducer,
} from './model/notificationSlice'
