import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './store'
import { IItem } from './itemReducer';

interface IDetailState {
  items: IItem[];
  currentIndex: number,
  currentItem: IItem,
  start: number,
  end: number,
  isEnd: boolean,
  isStart: boolean
}

interface IInitItem {
  items: IItem[];
  selectedItem: IItem;
}

const initialState: IDetailState = {
  items: [],
  currentIndex: 1,
  currentItem: { _id: '', key: 0, checked: false, isShowMenu: false },
  start: 1,
  end: 0,
  isEnd: false,
  isStart: false
}

export const detailReducer = createSlice({
  name: 'items',
  initialState,
  reducers: {
    initItems : (state: IDetailState, actions: PayloadAction<IInitItem>) => {
      const { items, selectedItem } = actions.payload;
      state.items = items;
      state.currentIndex = items.findIndex((item: IItem) => item.key === selectedItem.key)
      state.end = items.length;
      state.currentItem = selectedItem
      if(state.currentIndex === 0) {
        state.isStart = true
      } else if (state.currentIndex === items.length-1) {
        state.isEnd = true
      }
    },
    prev: (state: IDetailState) => {
      if (state.currentIndex === 1) {
        state.isStart = true
      } else if (state.isEnd) {
        state.isEnd = false
      }
      state.currentIndex -= 1
    },
    next: (state: IDetailState) => {
      if (state.isStart) {
        state.isStart = false;
      } else if (state.currentIndex === state.items.length-2) {
        state.isEnd = true;
      }

      state.currentIndex += 1
    },
    clearItems: (state: IDetailState) => {
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