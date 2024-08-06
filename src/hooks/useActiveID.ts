import { TID } from '@/constants/dashboard'
import { useAppSelector } from './redux'

export default function useActiveID() {
   const type = useAppSelector((state) => state.reducer.dashboard.dashboardItems)
   const activeID = Object.fromEntries(Object.entries(type).filter(([_, value]) => value === true))

   return Object.keys(activeID)[0] as TID
}
