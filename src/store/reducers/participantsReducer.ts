import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Participant } from '@/constants/works'
import { RootState } from '@reduxjs/toolkit/query'

const initialState: Participant[] = []

export const ParticipantsSlice = createSlice({
   name: 'participants',
   initialState,
   reducers: {
      setParticipantsData(state, action: PayloadAction<Participant[]>) {
         return action.payload
      },

      updateParticipant(state, action: PayloadAction<{ id: string; updates: Partial<Participant> }>) {
         const { id, updates } = action.payload

         const index = state.findIndex((participant) => participant.id === id)
         if (index !== -1) {
            state[index] = { ...state[index], ...updates }
         }
      }
   }
})

export const ParticipantsActions = ParticipantsSlice.actions
export default ParticipantsSlice.reducer
