import { TID } from '@/constants/dashboard'
import { useAppDispatch, useAppSelector } from '@/hooks/redux'
import { useLogoutMutation } from '@/store/reducers/apiReducer'
import { DashboardActions } from '@/store/reducers/dashboardReducer'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

export const useMenuHandler = (id: TID) => {
   const dispatch = useAppDispatch()
   const dashboarItems = useAppSelector((state) => state.reducer.dashboard.dashboardItems)
   const [logout, { isSuccess }] = useLogoutMutation()
   const router = useRouter()

   const setItem = () => {
      const items = { ...dashboarItems }

      for (const key in items) {
         items[key] = false
         if (key === id) items[key] = true
      }

      dispatch(DashboardActions.setDahsboardItems(items))
   }

   const logoutFunc = async () => {
      await logout()
   }

   useEffect(() => {
      if (isSuccess) {
         router.replace('/')
      }
   }, [isSuccess])

   const handler = () => {
      switch (id) {
         case 'logout': {
            logoutFunc()
            break
         }
         default:
            setItem()
      }
   }

   return handler
}
