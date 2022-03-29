import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './store'
import { saveAs } from 'file-saver'
import JsZip from 'jszip'
import { Promise } from 'bluebird'
import JSZipUtils from '../service/jsziputils';

import test from '../data/test.json'

export interface State {
  _id: string,
  key: number,
  checked: boolean,
  isShowMenu: boolean
}

const initialState = {
  items: [],
  isSelecting: false,
  selectedItem: { _id: '', key: 0, checked: false, isShowMenu: false },
  checkedItems: {},
  isAllChecked: false,
  downLoadItem: [],
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

function urlToPromise(url: string) {
  return new Promise(function(resolve, reject) {
      JSZipUtils.getBinaryContent(url, function (err: any, data: any) {
          if(err) {
              reject(err);
          } else {
              resolve(data);
          }
      });
  });
}

const exportZip = (urls: any) => {
  const zip = JsZip();
  urls.forEach(function(url:string, index:number){
    var filename = "galleryImage" + index + ".png";
    zip.file(filename, urlToPromise(url), {binary:true});
  });
  zip.generateAsync({type:'blob'}).then(function(content) {
    const fileName = `images.zip`;
    saveAs(content, fileName);
  });
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
    deleteAll: (state: any, actions: PayloadAction<object>) => {
      const items = Object.values(actions.payload)
      state.items = state.items.filter((i: State) => !items.includes(i.key))
    },
    downLoadItem: (state, actions: PayloadAction<string>) => {
      const url = actions.payload;
      saveAs(url, 'image.png')
    },
    downloadAll: (state: any, actions: PayloadAction<object>) => {
      const selectedItem = Object.values(actions.payload)
      state.downLoadItem = state.items.filter((i: State) => selectedItem.includes(i.key))
      let urls = state.downLoadItem.map((i: State) => {return i._id})
      exportZip(urls)
    }
  },
})

export const { 
  manipulate, 
  selectItem, 
  checkItem, 
  deleteItem, 
  downLoadItem, 
  showModal, 
  checkAll, 
  uncheckedAll, 
  uncheckItem, 
  showMenu, 
  closeMenu, 
  closeMenuAll, 
  deleteAll, 
  downloadAll 
} = itemReducer.actions

export const selected = (state: RootState) => state

export default itemReducer.reducer