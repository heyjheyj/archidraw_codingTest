import { configureStore } from '@reduxjs/toolkit'
import detailReducer from './detailReducer'
import itemReducer from './itemReducer'

export const store = configureStore({
  reducer: {
    items: itemReducer,
    detail: detailReducer
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch