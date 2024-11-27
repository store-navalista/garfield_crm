import { combineReducers } from 'redux'
import ContentReducer from './contentReducer'
import DashboardReducer from './dashboardReducer'
import RadioReducer from './radioReducer'
import BusinessReducer from './businessReducer'

export const reducer = combineReducers({
   content: ContentReducer,
   dashboard: DashboardReducer,
   radio: RadioReducer,
   business: BusinessReducer
})
