import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '@/shared/store'

type NotificationState = {
   unreadCount: number
   isDropdownOpen: boolean
}

const initialState: NotificationState = {
   unreadCount: 0,
   isDropdownOpen: false,
}

export const notificationSlice = createSlice({
   name: 'notification',
   initialState,
   reducers: {
      updateUnreadCount: (state, action: PayloadAction<number>) => {
         state.unreadCount = action.payload
      },
      decrementUnreadCount: state => {
         if (state.unreadCount > 0) {
            state.unreadCount -= 1
         }
      },
      setDropdownOpen: (state, action: PayloadAction<boolean>) => {
         state.isDropdownOpen = action.payload
      },
   },
})

export const notificationReducer = notificationSlice.reducer
export const { updateUnreadCount, decrementUnreadCount, setDropdownOpen } =
   notificationSlice.actions

export const selectUnreadCount = (state: RootState) => state.notification.unreadCount
export const selectIsDropdownOpen = (state: RootState) => state.notification.isDropdownOpen
