import { combineReducers } from 'redux'
import ContentReducer from './contentReducer'
import DashboardReducer from './dashboardReducer'
import RadioReducer from './radioReducer'

export const reducer = combineReducers({
   content: ContentReducer,
   dashboard: DashboardReducer,
   radio: RadioReducer
})
