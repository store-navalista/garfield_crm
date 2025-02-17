import { useGetUserQuery } from '@/store/reducers/apiReducer'

export default function useUserByID() {
   if (typeof window === 'undefined') return { data: null }

   const urlParams = new URLSearchParams(window.location.search)
   const userId = urlParams.get('id')

   const { data } = useGetUserQuery({ userId }, { skip: !userId })

   return { data: data || null }
}
