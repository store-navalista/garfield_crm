import { SERVICES, PAGES } from '@/constants/pages'
import { useAppSelector } from './redux'

export default function useCurrentPage() {
   const pageID = useAppSelector((state) => state.reducer.content._id)
   const arr = [...SERVICES, ...PAGES]
   const [content] = arr.filter((i) => Object.hasOwn(i, pageID))

   return content[pageID]
}
