import { TID } from '@/constants/dashboard'
import { useAppDispatch, useAppSelector } from '@/hooks/redux'
import { DashboardActions } from '@/store/reducers/dashboardReducer'
import { useCookies } from 'react-cookie'

export const useMenuHandler = (id: TID) => {
   const dispatch = useAppDispatch()
   const dashboarItems = useAppSelector((state) => state.reducer.dashboard.dashboardItems)
   const [, , removeCookie] = useCookies()

   const setItem = () => {
      const items = { ...dashboarItems }

      for (const key in items) {
         items[key] = false
         if (key === id) items[key] = true
      }

      dispatch(DashboardActions.setDahsboardItems(items))
   }

   const handler = () => {
      switch (id) {
         case 'logout': {
            removeCookie('token')
            removeCookie('user_id')

            const items = { ...dashboarItems }

            for (const key in items) {
               items[key] = false
               if (key === 'greating') items[key] = true
            }

            dispatch(DashboardActions.setDahsboardItems(items))
            break
         }
         default:
            setItem()
      }
   }

   return handler
}
