import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice'
import instructorReducer from './instructorSlice'
import lessonsReducer from './LessonsSlices'
import studentReducer from './studentSlice'
import dashboardReducer from './DashBoardSlice'
import invoiceReducer from './InvoiceSlice'
export const store = configureStore({
  reducer: {
    user: userReducer,
    instructor : instructorReducer,
    student :  studentReducer,
    lessons : lessonsReducer,
    dashboard : dashboardReducer ,
    invoice : invoiceReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
