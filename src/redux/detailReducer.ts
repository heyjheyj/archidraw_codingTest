import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './store'

const initialState = {
  items: [],
  currentIndex: 1,
  currentItem: {},
  start: 1,
  end: 0,
  isEnd: false,
  isStart: false
}

export const detailReducer = createSlice({
  name: 'items',
  initialState,
  reducers: {
    initItems : (state, actions: PayloadAction<any>) => {
      // initialState - items에 값 셋팅, currentIndex셋팅, end값 셋팅
      const { data, selectedItem } = actions.payload;
      state.items = data.items;
      state.currentIndex = data.items.findIndex((item: any) => item.key === selectedItem.key)
      state.end = data.items.length;
      state.currentItem = selectedItem
      if(state.currentIndex === 0) {
        state.isStart = true
      } else if (state.currentIndex === data.items.length-1) {
        state.isEnd = true
      }
    },
    prev: (state, actions: PayloadAction<any>) => {
      if (state.currentIndex === 1) {
        state.isStart = true
      } else if (state.isEnd) {
        state.isEnd = false
      }
      state.currentIndex -= 1
    },
    next: (state, actions: PayloadAction<object>) => {
      if (state.isStart) {
        state.isStart = false;
      } else if (state.currentIndex === state.items.length-2) {
        state.isEnd = true;
      }

      state.currentIndex += 1
    },
    clearItems: (state) => {
      state.items = []
      state.currentIndex = 1
      state.end = 0
      state.start = 1
      state.isEnd = false
      state.isStart = false
    },
  },
})

export const { initItems, prev, next, clearItems } = detailReducer.actions

export const selected = (state: RootState) => state

export default detailReducer.reducer