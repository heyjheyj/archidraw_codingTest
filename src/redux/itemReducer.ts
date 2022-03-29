import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './store'
import { saveAs } from 'file-saver'
import JsZip from 'jszip'
import { Promise } from 'bluebird'
import JSZipUtils from '../service/jsziputils';

import test from '../data/test.json'

export interface IItem {
  _id: string,
  key: number,
  checked: boolean,
  isShowMenu: boolean
}

interface IItemState {
  items: IItem[];
  isSelecting: boolean;
  selectedItem: IItem;
  checkedItems: {[key: number]: boolean};
  isAllChecked: boolean;
  downLoadingTargetItems: IItem[];
}

const initialState: IItemState = {
  items: [],
  isSelecting: false,
  selectedItem: { _id: '', key: 0, checked: false, isShowMenu: false },
  checkedItems: {},
  isAllChecked: false,
  downLoadingTargetItems: [],
}

const manipulateData = () => {
  let result = test.renderings.map((item: any, index: number) => {
    return {
      "_id" : item["_id"],
      "key" : index,
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

const exportZip = (urls: string[]) => {
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
    manipulate: (state: IItemState) => {
      let result = manipulateData()
      state.items = result;
    },
    showModal: (state: IItemState) => {
      state.isSelecting = !state.isSelecting
    },
    selectItem: (state: IItemState, actions: PayloadAction<number>)=> {
      state.selectedItem = state.items[actions.payload]
    },
    checkItem: (state: IItemState, actions: PayloadAction<IItem>) => {
      const item = actions.payload
      state.items = state.items.map((i: IItem) => {
        if (i.key === item.key) {
          i.checked = true
        }
        return i
      })
      state.checkedItems[item.key] = true;
    },
    uncheckItem: (state: IItemState, actions: PayloadAction<IItem>) => {
      const item = actions.payload;
      state.items = state.items.map((i: IItem) => {
        if(i.key === item.key) {
          i.checked = false
        }
        return i
      })
      delete state.checkedItems[item.key]
    },
    checkAll: (state: IItemState) => {
      state.isAllChecked = true;
      state.items = state.items.map((i: IItem) => {
        i.checked = true;
        return {...i};
      })
      state.items.forEach((item: IItem) => {
        state.checkedItems[item.key] = true
      })
    },
    uncheckedAll: (state: IItemState) => {
      state.isAllChecked = false
      state.checkedItems = {}
      state.items = state.items.map((i: IItem) => {
        i.checked = false
        return {...i}
      })
    },
    showMenu: (state: IItemState, actions: PayloadAction<IItem>) => {
      const item = actions.payload;
      state.items.forEach((i: IItem) => {
        if (item.key === i.key) {
          i.isShowMenu = true;
        } else {
          i.isShowMenu = false;
        }
      })
    },
    closeMenu: (state: IItemState, actions: PayloadAction<IItem>) => {
      const item = actions.payload;
      state.items.forEach((i: IItem) => {
        if (item.key === i.key) {
          i.isShowMenu = false;
        }
      })
    },
    closeMenuAll: (state: IItemState) => {
      state.items.forEach((i: IItem) => {
        i.isShowMenu = false
      })
    },
    deleteItem: (state: IItemState, actions: PayloadAction<IItem>) => {
      const item = actions.payload;
      state.items = state.items.filter((i: IItem) => {
        return i.key !== item.key
      })
    },
    deleteAll: (state: IItemState, actions: PayloadAction<object>) => {
      const items = Object.values(actions.payload)
      state.items = state.items.filter((i: IItem) => !items.includes(i.key))
    },
    downLoadItem: (state: IItemState, actions: PayloadAction<string>) => {
      const url = actions.payload;
      saveAs(url, 'image.png')
    },
    downloadAll: (state: IItemState, actions: PayloadAction<object>) => {
      const selectedItem = Object.values(actions.payload)
      state.downLoadingTargetItems = state.items.filter((i: IItem) => selectedItem.includes(i.key))
      let urls = state.downLoadingTargetItems.map((i: IItem) => {return i._id})
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