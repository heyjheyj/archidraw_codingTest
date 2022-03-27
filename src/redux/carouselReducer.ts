import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './store'

export interface State {
  _id: string,
  key?: number
}

const initialState = {
  Items: [],
  currentItem: 0,
  start: 0,
  end: 0
}

export const carouselReducer = createSlice({
  name: 'items',
  initialState,
  reducers: {
    getItems : (state, actions: PayloadAction<object>) => {
      // initialState items에 값 셋팅, currentItem셋팅
      console.log(actions.payload)
    },
    prev: (state, actions: PayloadAction<object>) => {
      // 현재 값 앞으로 이동
      // 제일 앞으로 이동하면 버튼이 사라짐
    },
    next: (state, actions: PayloadAction<object>) => {
      // 다음 값으로 이동
      // 제일 마지막으로 이동하면 버튼이 사라짐
    }
  },
})

export const { getItems, prev, next } = carouselReducer.actions

export const selected = (state: RootState) => state

export default carouselReducer.reducer