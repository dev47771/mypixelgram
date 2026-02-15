import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '@/shared/store'

type NotificationState = {
   unreadCount: number
}

const initialState: NotificationState = {
   unreadCount: 0,
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
   },
})

export const notificationReducer = notificationSlice.reducer
export const { updateUnreadCount, decrementUnreadCount } = notificationSlice.actions

export const selectUnreadCount = (state: RootState) => state.notification.unreadCount
