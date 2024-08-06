import { useGetUserQuery } from '@/store/reducers/apiReducer'

export default function useUserByID() {
   let urlParams = null

   if (typeof window !== 'undefined') {
      urlParams = new URLSearchParams(window.location.search)

      const userId = urlParams.get('id')
      const { data } = useGetUserQuery({ userId })

      return { data }
   }
}
