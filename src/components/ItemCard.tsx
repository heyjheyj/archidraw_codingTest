import React, { useRef } from 'react';
import styled from 'styled-components';
import EllipsisIcon from '../icons/ellipsis'

import { State, checkItem, uncheckItem, showMenu, closeMenu, deleteItem, downLoadItem, closeMenuAll } from '../redux/itemReducer'
import { useAppDispatch, useAppSelector } from '../redux/hooks';

interface IProps {
  item: State,
  selectItem: (index: number) => void,
  index: number,
}


const ItemCard = ({item, selectItem, index}: IProps) => {
  const imageRef = useRef<HTMLImageElement>(null);
  const dispatch = useAppDispatch()
  const isAllChecked = useAppSelector(state => state.items.isAllChecked)

  const onSelectItem = () => {
    selectItem(index)
  }

  const downloadFile = () => {
    const file = imageRef.current?.currentSrc
    file && dispatch(downLoadItem(file))

    if (item.isShowMenu) {
      dispatch(closeMenu(item))
    }
  };

  const onCheck = (e: React.MouseEvent<HTMLInputElement>) => {
    e.stopPropagation()

    dispatch(checkItem(item))
    if (isAllChecked || item.checked) {
      dispatch(uncheckItem(item))
    }
    dispatch(closeMenuAll())
  }

  const onShowMenu = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()

    dispatch(showMenu(item))
    if (item.isShowMenu) {
      dispatch(closeMenu(item))
    }
  }

  const onDelete = () => {
    let message = "정말 삭제하시겠습니까?";
    let result = window.confirm(message);
    if (result) {
      dispatch(deleteItem(item))
    } else {
      return;
    }
  }

  return (
  <ItemComponent>
    <Item>
      <ItemInner>
        <Image ref={imageRef} src={`${item._id}`} alt="gallery" />
        {item.checked && 
          <Checked type="checkbox" checked readOnly/>
        }
        <HoverContainer onClick={onSelectItem}>
          <CheckBox 
            type="checkbox" 
            onClick={onCheck} 
            checked={item.checked} 
            readOnly 
          />
          <Menu onClick={onShowMenu}>
            <EllipsisIcon/>
          </Menu>
        </HoverContainer>
        {item.isShowMenu && 
          <MenuContainer>
            <DownLoad onClick={downloadFile}>다운로드</DownLoad>
            <Delete onClick={onDelete}>삭제</Delete>
          </MenuContainer>}
      </ItemInner>
    </Item>
  </ItemComponent>
  )
}

export default ItemCard;

const ItemComponent = styled.li`
  flex: 0 1 25%;
  width: 25%;
`

const Item = styled.div`
  margin: 9px;
`

const ItemInner = styled.div`
  background-color: rgb(255, 255, 255);
  cursor: pointer;
  position: relative;
  width: 100%;
  overflow: hidden;
  border-radius: 4px;
`

const Image = styled.img`
  top:0;
  width: 130%;
  height: 100%;
  object-fit: cover;
	display: block;
	height: auto;
`

const Checked = styled.input`
  position: absolute;
  top: 15px;
  left: 15px;
  box-sizing: border-box;
  font-size: 20px;
  color: rgb(255,0,0, 0.2);
`

const HoverContainer = styled.div`
  background-color:rgba(75, 79, 84, 0.7);
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  border-radius: 4px;
  display: none;
  ${ItemComponent}:hover & {
    display: block;
  }
`

const CheckBox = styled.input`
  position: absolute;
  top: 15px;
  left: 15px;
  box-sizing: border-box;
  font-size: 20px;
  color: rgb(0,0,0, 0.65);
`

const Menu = styled.button`
  position: absolute;
  top: 10px;
  right: 15px;
  color: rgb(255,255,255);
  font-size: 24px;
  background-color: transparent;
  border: none;
  &:hover {
    cursor: pointer;
  }
`

const MenuContainer = styled.ul`
  width: 80px;
  height: 64px;
  background-color: #fff;
  padding: 4px 0;
  border-radius: 2px;
  position: absolute;
  z-index: 9999;
  min-width: 32px;
  top: 36px;
  right: 18px;
  box-shadow: 1 2 8 #000;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`

const DownLoad = styled.li`
  padding-top: 5px;
width: 100%;
  height: 100%;
  text-align: center;
  &:hover {
    background-color: #ddd;
  }
`

const Delete = styled.li`
  padding-top: 5px;
  width: 100%;
  height: 100%;
  text-align: center;
  &:hover {
    background-color: #ddd;
  }
`