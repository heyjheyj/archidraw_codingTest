import React, { useState } from 'react';
import styled from 'styled-components';
import EllipsisIcon from '../icons/ellipsis'

const ItemCard = ({item, selectItem}: any) => {
  const [isShowMenu, setIsShowMenu] = useState(false)

  const onSelectItem = () => {
    selectItem(item)
  }

  const onShowMenu = (e: any) => {
    e.stopPropagation()
    setIsShowMenu(prev => !prev)
  }

  // 클릭이벤트 제어 필요
  // 각 아이템 검포넌트 바깥에서 클릭이벤트가 발생하면 isShowMenu = false로 변경되어야 함

  return (
  <ItemComponent>
    <Item>
      <ItemInner>
        <Image src={`${item._id}`} alt="gallery" />
        <HoverContainer onClick={onSelectItem}>
          <CheckBox type="checkbox" onClick={(e) => e.stopPropagation()}/>
          <Menu onClick={onShowMenu}><EllipsisIcon/></Menu>
        </HoverContainer>
        {isShowMenu && 
          <MenuContainer>
            <DownLoad>다운로드</DownLoad>
          <Delete>삭제</Delete>
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
  font-size: 14px;
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