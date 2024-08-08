import { TID } from '@/constants/dashboard'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface DashboardState {
   dashboardItems: Record<Exclude<TID, 'logout'>, boolean>
}

const initialState: DashboardState = {
   dashboardItems: {
      greating: true,
      ctoProperty: false,
      CTO: false,
      account: false,
      time: false,
      qr: false,
      radio: false,
      employees: false,
      timing: false,
      charts: false,
      holidayCalendar: false,
      pdf: false,
      video: false
   }
}

export const DashboardSlice = createSlice({
   name: 'dashboard',
   initialState,
   reducers: {
      setDahsboardItems(state, action: PayloadAction<DashboardState['dashboardItems']>) {
         state.dashboardItems = { ...state.dashboardItems, ...action.payload }
      }
   }
})

export const DashboardActions = DashboardSlice.actions
export default DashboardSlice.reducer
