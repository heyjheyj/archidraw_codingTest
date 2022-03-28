import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './store'

import test from '../data/test.json'

export interface State {
  _id: string,
  key: number,
  checked: boolean,
  isShowMenu: boolean
}

interface Parameter {
  [key:number] : string | number
}

const initialState = {
  items: [],
  isSelecting: false,
  selectedItem: { _id: '', key: 0, checked: false, isShowMenu: false },
  checkedItems: {},
  isAllChecked: false,
}

const manipulateData = () => {
  let result = test.renderings.map((item: any, index:number) => {
    return item = {
      "_id" : item["_id"],
      "key" : index + 1,
      "checked": false,
      "isShowMenu": false
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
    showModal: (state) => {
      state.isSelecting = !state.isSelecting
    },
    selectItem: (state: any, actions: PayloadAction<State>)=> {
      state.selectedItem = actions.payload
    },
    checkItem: (state: any, actions: PayloadAction<State>) => {
      const item = actions.payload
      state.items = state.items.map((i: State) => {
        if (i.key === item.key) {
          i.checked = true
        }
        return i
      })
      state.checkedItems[item.key] = true;
    },
    uncheckItem: (state: any, actions: PayloadAction<State>) => {
      const item = actions.payload;
      state.items = state.items.map((i: State) => {
        if(i.key === item.key) {
          i.checked = false
        }
        return i
      })
      delete state.checkedItems[item.key]
    },
    checkAll: (state: any) => {
      state.isAllChecked = true;
      state.items = state.items.map((i: State) => {
        i.checked = true
        return {...i}
      })
      state.items.forEach((item: State) => {
        state.checkedItems[item.key] = true
      })
    },
    uncheckedAll: (state: any) => {
      state.isAllChecked = false
      state.checkedItems = {}
      state.items = state.items.map((i: State) => {
        i.checked = false
        return {...i}
      })
    },
    showMenu: (state: any, actions: PayloadAction<State>) => {
      const item = actions.payload;
      state.items.map((i: State) => {
        if (item.key === i.key){
          i.isShowMenu = true
        } else if (item.key !== i.key) {
          i.isShowMenu = false
        }
        return i
      })
    },
    closeMenu: (state: any, actions: PayloadAction<State>) => {
      const item = actions.payload;
      state.items.map((i: State) => {
        if (item.key === i.key){
          i.isShowMenu = false
        }
        return i
      })
    },
    closeMenuAll: (state: any) => {
      state.items.map((i: State) => {
        i.isShowMenu = false
        return i
      })
    },
    deleteItem: (state: any, actions: PayloadAction<State>) => {
      const item = actions.payload;
      state.items = state.items.filter((i: State) => {
        return i.key !== item.key
      })
    },
    deleteAll: (state: any, actions: PayloadAction<Parameter>) => {
      // 비교 타입이 달라서 문제
      // Object.keys(checkItems).map(Number)
      const items = Object.values(actions.payload)
      state.items = state.items.filter((i: State) => !items.includes(i.key))
    },
    downLoadItem: (state, actions: PayloadAction<object>) => {
      console.log('download')
    }
  },
})

export const { manipulate, selectItem, checkItem, deleteItem, downLoadItem, showModal, checkAll, uncheckedAll, uncheckItem, showMenu, closeMenu, closeMenuAll, deleteAll } = itemReducer.actions

export const selected = (state: RootState) => state

export default itemReducer.reducer