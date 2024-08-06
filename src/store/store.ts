import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query/react'
import thunk from 'redux-thunk'
import { reducer } from './reducers'
import { api } from './reducers/apiReducer'
import { fileApi } from './reducers/fileApiReducer'

const store = configureStore({
   reducer: {
      reducer,
      [api.reducerPath]: api.reducer,
      [fileApi.reducerPath]: fileApi.reducer
   },
   middleware: (getDefault) =>
      getDefault({ serializableCheck: false }).concat(thunk, api.middleware, fileApi.middleware)
})

setupListeners(store.dispatch)

export default store
