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
    getItems : (state, actions: PayloadAction<any>) => {
      // initialState - items에 값 셋팅, currentIndex셋팅, end값 셋팅
      const { data, selectedItem } = actions.payload;
      state.items = data.items;
      state.currentIndex = selectedItem.key;
      state.end = data.items.length;
      state.currentItem = selectedItem
      if(selectedItem.key === 1) {
        state.isStart = true
      } else if (selectedItem.key === data.items.length) {
        state.isEnd = true
      }
    },
    prev: (state, actions: PayloadAction<any>) => {
      // 현재 값 앞으로 이동
      // 제일 앞으로 이동하면 버튼이 사라짐
      const {selectedItem, currentIndex} = actions.payload
      console.log(selectedItem, currentIndex)

      // 아이템length
      // 삭제

      if (state.currentIndex < 3) {
        state.currentIndex = 1
        state.isStart = true
        state.isEnd = false
      } else {
        state.isStart = false
        state.isEnd = false
        state.currentIndex -= 1
      }
    },
    next: (state, actions: PayloadAction<object>) => {
      // 다음 값으로 이동
      // 제일 마지막으로 이동하면 버튼이 사라짐
      if (state.currentIndex > state.end - 2) {
        state.currentIndex = state.end
        state.isEnd = true
        state.isStart = false
      } else {
        state.currentIndex += 1
        state.isEnd = false
        state.isStart = false
      }
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

export const { getItems, prev, next, clearItems } = detailReducer.actions

export const selected = (state: RootState) => state

export default detailReducer.reducer