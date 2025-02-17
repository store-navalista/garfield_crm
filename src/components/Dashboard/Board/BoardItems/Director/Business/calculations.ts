import { DESIGN_WORK_PROPS, Vessel, WorksTypes } from '@/constants/works'
import { design } from './calculations/design'
import { engineering } from './calculations/engineering'
import { supply } from './calculations/supply'
import { utm } from './calculations/utm'

export class Calculations {
   private works: DESIGN_WORK_PROPS

   constructor(works: DESIGN_WORK_PROPS) {
      this.works = works
   }

   calculate(vessels: Vessel[], type: (typeof WorksTypes)[number]) {
      switch (type) {
         case 'design':
            return design(vessels, this.works)
         case 'engineering':
            return engineering(vessels, this.works)
         case 'supply':
            return supply(vessels, this.works)
         case 'utm':
            return utm(vessels, this.works)
         default:
            throw new Error(`Unsupported calculation type: ${type}`)
      }
   }
}
