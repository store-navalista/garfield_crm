import { Vessel } from '@/constants/works'

export const extractMessageBeforeView = (input) => {
   const match = input.match(/^[^:]+/)
   return match ? match[0] : null
}

export const getFieldTitle = (field: string) => {
   switch (field) {
      case 'name_of_vessel':
         return 'Name of vessel'
      case 'imo_frozen':
         return 'Freeze IMO'
      case 'executor_name':
         return 'Executor'
      case 'contractor_name':
         return 'Contractor'
      case 'description':
         return 'Description'
      default:
         return 'IMO'
   }
}

export const findDuplicates = (vessels: Vessel[], setError: React.Dispatch<React.SetStateAction<string>>) => {
   const IMOs = vessels.map((v) => v.IMO)
   const sorted = IMOs.slice().sort()
   const duplicates = []

   for (let i = 1; i < sorted.length; i++) {
      if (sorted[i - 1] === sorted[i]) {
         duplicates.push(sorted[i])
      }
   }
   if (duplicates.length) {
      const same_imos = vessels.filter((v) => v.IMO === duplicates[0])
      setError(
         `Vessels ${same_imos[0].name_of_vessel} and ${same_imos[1].name_of_vessel} have the same IMO number ${same_imos[0].IMO}!`
      )
      return false
   }
   return true
}

export const findDuplicatesBeforeCreate = (
   vessels: Vessel[],
   IMO: number,
   setError: React.Dispatch<React.SetStateAction<string>>
) => {
   const isIMOExist: Vessel[] = vessels.filter((v) => v.IMO === IMO)
   if (isIMOExist?.length) {
      setError(
         `We already have a vessel with IMO ${isIMOExist[0].IMO} with name of vessel "${isIMOExist[0].name_of_vessel}"!`
      )
      return false
   }
   return true
}
