import { DASHBOARD, TBoardItems, TID } from '@/constants/dashboard'
import { IUser } from '@/constants/users'

type MenuOptions = { exclude?: TID }

export default function useMenu(user: IUser, options: MenuOptions = {}): TBoardItems {
   const { nav, items } = DASHBOARD
   const mutateNav = []

   const { describe_role } = user

   nav.forEach((item) => {
      if (describe_role && items[describe_role].includes(item.id)) mutateNav.push(item)
   })

   if (options['exclude']) {
      return mutateNav.filter((item) => item.id !== options['exclude'])
   }

   return mutateNav
}
