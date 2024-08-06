import { SERVICES, PAGES, TServices, TPages } from '@/constants/pages'

export default function useFind(id: TServices | TPages) {
   const page = [...SERVICES, ...PAGES].find((p) => Object.hasOwn(p, id))

   return Object.values(page)[0]
}
