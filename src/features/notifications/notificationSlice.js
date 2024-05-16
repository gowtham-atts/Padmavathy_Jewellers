import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
  name: 'notification',
  initialState: {
     notifyCounts:{}
  },
  reducers: {
    setNotificationCount: (state, action) => {
      state.notifyCounts = action.payload;
    }
  }
});

export const { setNotificationCount } = notificationSlice.actions;

export const selectNotificationCount = (state) => state.notification.notifyCounts;

export default notificationSlice.reducer;
