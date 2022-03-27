import { configureStore } from '@reduxjs/toolkit'
import carouselReducer from './carouselReducer'
import itemReducer from './itemReducer'

export const store = configureStore({
  reducer: {
    items: itemReducer,
    carousel: carouselReducer
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch