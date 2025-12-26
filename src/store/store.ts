import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice'
import instructorReducer from './instructorSlice'
import lessonsReducer from './LessonsSlices'
import studentReducer from './studentSlice'
import dashboardReducer from './DashBoardSlice'
export const store = configureStore({
  reducer: {
    user: userReducer,
    instructor : instructorReducer,
    student :  studentReducer,
    lessons : lessonsReducer,
    dashboard : dashboardReducer
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
