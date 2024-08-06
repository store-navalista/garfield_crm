import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'

// const fetchItem = async () => {
// 	const fetched = await axios.get('/api/cookies');
// 	return fetched;
// };

// export const getCookies = createAsyncThunk('cookies', async () =>
// 	fetchItem(),
// );

interface IMediaQuery {
   isLaptop: boolean | undefined
   isMobile: boolean | undefined
}
interface ContentState {
   _id: string
   currentPage: string
   currentLang: string
   i18n: string
   mediaQuery: IMediaQuery
   loading: boolean
   isModalShow: boolean
   modalProps: any
   progress: number
}

const initialState: ContentState = {
   _id: 'HOME',
   currentPage: '/',
   currentLang: 'ENGLISH',
   i18n: 'en',
   mediaQuery: {
      isLaptop: undefined,
      isMobile: undefined
   },
   loading: true,
   isModalShow: false,
   modalProps: null,
   progress: 0
}

export const ContentSlice = createSlice({
   name: 'content',
   initialState,
   reducers: {
      setID(state, action: PayloadAction<string>) {
         state._id = action.payload
      },
      setLanguage(state, action: PayloadAction<string>) {
         state.currentLang = action.payload
         state.i18n = action.payload.toLocaleLowerCase().substring(0, 2)
      },
      setMediaQuery(state, action: PayloadAction<IMediaQuery>) {
         state.mediaQuery = { ...action.payload }
      },
      setLoading(state, action: PayloadAction<boolean>) {
         state.loading = action.payload
      },
      toggleModalShow(state, action: PayloadAction<boolean>) {
         state.isModalShow = action.payload
      },
      setModalProps(state, action: PayloadAction<Record<string, any>>) {
         state.modalProps = action.payload
      },
      setCurrentPage(state, action: PayloadAction<string>) {
         state.currentPage = action.payload
      },
      setProgress(state, action: PayloadAction<number>) {
         state.progress = action.payload
      }
   }
   // extraReducers: (builder) => {
   // 	builder.addCase(getCookies.fulfilled, (state, action) => {
   // 		return;
   // 	});
   // },
})

export const ContentActions = ContentSlice.actions
export default ContentSlice.reducer
