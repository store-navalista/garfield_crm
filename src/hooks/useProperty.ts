import { SERVICES, PAGES, Page } from '@/constants/pages'
import { useAppSelector } from './redux'

export default function useProperty(property: keyof Page) {
   const pageID = useAppSelector((state) => state.reducer.content._id)
   const arr = [...SERVICES, ...PAGES]
   const [content] = arr.filter((i) => Object.hasOwn(i, pageID))

   return content[pageID][property]
}
