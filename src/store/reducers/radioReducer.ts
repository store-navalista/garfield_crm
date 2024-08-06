import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface RadioState {
   current: {
      id: string
      stream: string
      meta: string
   }
   volume: number
   isPlaying: boolean
   isRadioNavigate: boolean
   description: Record<string, string>
}

const initialState: RadioState = {
   current: {
      id: '',
      stream: '',
      meta: ''
   },
   volume: 1,
   isPlaying: false,
   isRadioNavigate: false,
   description: {}
}

export const RadioSlice = createSlice({
   name: 'dashboard',
   initialState,
   reducers: {
      playToggle(state, action: PayloadAction<boolean>) {
         state.isPlaying = action.payload
      },
      setCurrentStation(state, action: PayloadAction<RadioState['current']>) {
         state.current = { ...action.payload }
      },
      setVolume(state, action: PayloadAction<number>) {
         state.volume = action.payload
      },
      setIsRadioNavigate(state, action: PayloadAction<boolean>) {
         state.isRadioNavigate = action.payload
      },
      setDescription(state, action: PayloadAction<Record<string, string>>) {
         state.description = action.payload
      }
   }
})

export const RadioActions = RadioSlice.actions
export default RadioSlice.reducer
