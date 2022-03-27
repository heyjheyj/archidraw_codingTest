import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './store'

import test from '../data/test.json'

export interface State {
  _id: string,
  key?: number
}

const initialState = {
  items : [],
  isSelecting: false,
  selectedItem: 0,
  checkedItems: [],
}

const manipulateData = () => {
  let result = test.renderings.map((item: State, index:number) => {
    return item = {
      "_id" : item["_id"],
      "key" : index + 1
    }
  })
  return result;
}

export const itemReducer = createSlice({
  name: 'items',
  initialState,
  reducers: {
    manipulate: (state: any) => {
      let result = manipulateData()
      state.items = result;
    },
    selectItem: (state, action: PayloadAction<number>) => {
      console.log(selected)
      // const { key } = actions // payload 필요
      // state.selectedItem = key
    },
    checkItem: (state, actions: PayloadAction<object>) => {
      console.log('check')
    },
    deleteItem: (state, actions: PayloadAction<object>) => {
      console.log('delete')
    },
    downLoadItem: (state, actions: PayloadAction<object>) => {
      console.log('download')
    }
  },
})

export const { manipulate, selectItem, checkItem, deleteItem, downLoadItem } = itemReducer.actions

export const selected = (state: RootState) => state

export default itemReducer.reducer