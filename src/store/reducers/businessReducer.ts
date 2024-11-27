import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { DESIGN_WORK_PROPS, FIXED_VALUES } from '@/constants/works'

const initialState = {
   isError: '',
   isFiltered: false,
   data: [] as DESIGN_WORK_PROPS[]
}

export const BusinessSlice = createSlice({
   name: 'business',
   initialState,
   reducers: {
      setBusinessData(
         state,
         action: PayloadAction<{ work: Partial<DESIGN_WORK_PROPS>; table_type: 'fixed' | 'scroll' }>
      ) {
         const { id, ...updates } = action.payload.work

         const fixed: Partial<DESIGN_WORK_PROPS> = {}
         const scroll: Partial<DESIGN_WORK_PROPS> = {}

         Object.keys(updates).forEach((key) => {
            if (FIXED_VALUES.includes(key)) {
               fixed[key] = updates[key as keyof DESIGN_WORK_PROPS]
            } else {
               scroll[key] = updates[key as keyof DESIGN_WORK_PROPS]
            }
         })

         const index = state.data.findIndex((w) => w.id === id)

         if (index !== -1) {
            const existingWork = state.data[index]

            const updatedWork = {
               ...existingWork,
               ...(action.payload.table_type === 'fixed' ? fixed : scroll)
            }

            state.data[index] = updatedWork
         }
      },
      setAllBusinessWorks(state, action: PayloadAction<DESIGN_WORK_PROPS[]>) {
         return { ...state, data: action.payload }
      },
      setError(state, action: PayloadAction<string>) {
         state.isError = action.payload
      },
      setisFiltered(state, action: PayloadAction<boolean>) {
         state.isFiltered = action.payload
      }
   }
})

export const BusinessActions = BusinessSlice.actions
export default BusinessSlice.reducer
