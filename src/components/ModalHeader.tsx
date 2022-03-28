import React from 'react';
import styled from 'styled-components'
import Bookmark from '../icons/bookmark';
import CloseIcon from '../icons/close'
import Download from '../icons/download';
import Trash from '../icons/trash';

import domtoimage from "dom-to-image";
import { saveAs } from 'file-saver'

import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { deleteItem, showModal } from '../redux/itemReducer';
import { clearItems } from '../redux/detailReducer';

const ModalHeader = ({selectedItem, current, imageRef}: any, ) => {
  const isSelecting = useAppSelector(state => state.items.isSelecting)
  const dispatch = useAppDispatch()

  const downloadFile = () => {
    // let node = imageRef.current
    // domtoimage
    //   .toBlob(node)
    //   .then((blob) => {
    //     saveAs(blob, 'image.png');
    //   });
  };

  const closeModal = () => {
    if (isSelecting === true) {
      dispatch(showModal())
      dispatch(clearItems())
    }
  }

  const onDelete = () => {
    let message = "정말 삭제하시겠습니까?";
    let result = window.confirm(message);
    if (result) {
      dispatch(deleteItem(selectedItem))
      closeModal()
    } else {
      return;
    }
  }

  return (<TopBar>
    <CloseButton onClick={closeModal}>
      <CloseIcon /> 
    </CloseButton>
    <RightMenu>
      <BookmarkButton>
        <Bookmark />
      </BookmarkButton>
      <DownloadButton onClick={downloadFile}>
        <Download />
        <Text>Download</Text>
      </DownloadButton>
      <TrashButton onClick={onDelete}>
        <Trash />
      </TrashButton>
    </RightMenu>
  </TopBar>
  )}

export default ModalHeader;

const TopBar = styled.main`
  width: 100%;
  height: 56px;
  padding: 8px;
  background: rgba(255, 255, 255, 0.8);
  border-bottom: 1px solid rgba(235, 235, 235, 0.8);
  position: fixed;
  display: flex;
  justify-content: space-between;
  z-index: 9999;
`

const CloseButton = styled.button`
  height: 40px;
  display: flex;
  box-sizing: border-box;
  justify-content: center;
  align-items: center;
  border: none;
  border-radius: 4px;
  padding: 0 10px;
  cursor: pointer;
  &:hover {
    background: #ddd;
  }
`

const RightMenu = styled.div`
  min-width: 208px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`

const BookmarkButton = styled.button`
  height: 40px;
  display: flex;
  box-sizing: border-box;
  justify-content: center;
  align-items: center;
  border: none;
  border-radius: 4px;
  padding: 0 5px;
  cursor: pointer;
  &:hover {
    background: #ddd;
  }
`

const DownloadButton = styled.button`
  height: 40px;
  display: flex;
  box-sizing: border-box;
  justify-content: center;
  align-items: center;
  border: none;
  border-radius: 4px;
  padding: 0 10px;
  cursor: pointer;
  &:hover {
    background: #ddd;
  }
`

const Text = styled.span`
  font-size: 14px;
  padding-left: 5px;
`

const TrashButton = styled.button`
  height: 40px;
  display: flex;
  box-sizing: border-box;
  justify-content: center;
  align-items: center;
  border: none;
  border-radius: 4px;
  padding: 0 12px;
  cursor: pointer;
  &:hover {
    background: #ddd;
  }
`