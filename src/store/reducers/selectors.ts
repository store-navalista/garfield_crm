import { RootState } from '@/hooks/redux'
import { createSelector } from '@reduxjs/toolkit'

export const selectParticipants = createSelector(
   (state: RootState) => state.reducer.participants,
   (participants) => participants
)
