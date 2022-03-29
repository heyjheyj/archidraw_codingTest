import { useEffect, useRef } from 'react';
import styled from 'styled-components'
import NextArrow from '../icons/nextArrow';
import PrevArrow from '../icons/prevArrow';
import ModalHeader from './ModalHeader';

import { useAppSelector, useAppDispatch } from '../redux/hooks'
import { initItems, prev, next } from '../redux/detailReducer';
import { IItem } from '../redux/itemReducer';

const Detail = () => {
  const imageRef = useRef<HTMLImageElement>(null)
  const dispatch = useAppDispatch();
  
  const items = useAppSelector(state => state.items.items)
  const currentIndex = useAppSelector(state => state.detail.currentIndex)
  const selectedItem = useAppSelector<IItem>(state => state.items.selectedItem)
  const isEnd = useAppSelector(state => state.detail.isEnd)
  const isStart = useAppSelector(state => state.detail.isStart)

  const movePrev = () => {
    dispatch(prev())
  }

  const moveNext = () => {
    dispatch(next())
  }

  useEffect(() => {
    dispatch(initItems({items, selectedItem}))
  },[dispatch, items, selectedItem])

  return (
    <Modal>
    <ModalHeader selectedItem={items[currentIndex]} imageRef={imageRef}/>
      <GalleryDetail>
      {items[currentIndex] && <Image ref={imageRef} src={`${items[currentIndex]._id}`} alt="selectedImage"/>}
      {!isStart && <PrevArrowButton onClick={movePrev}>
        <PrevArrow />
      </PrevArrowButton>}
      {!isEnd && <NextArrowButton onClick={moveNext}>
        <NextArrow />
      </NextArrowButton>}
      </GalleryDetail>
    </Modal>
  )
}

export default Detail;

const Modal = styled.div`
  width: 100%;
  height: calc(100vh - 56px);
  position: absolute;
  top: 0;
  background-color: #fff;
`

const GalleryDetail = styled.div`
  padding-top: 56px;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  flex-direction: column;
`

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`

const PrevArrowButton = styled.button`
  height: 40px;
  display: flex;
  box-sizing: border-box;
  justify-content: center;
  align-items: center;
  border: none;
  border-radius: 8px;
  padding: 0 8px;
  position: absolute;
  top: 50%;
  left: 20px;
  cursor: pointer;
  &:hover {
    background: #ddd;
  }
`

const NextArrowButton = styled.button`
    height: 40px;
  display: flex;
  box-sizing: border-box;
  justify-content: center;
  align-items: center;
  border: none;
  border-radius: 8px;
  padding: 0 8px;
  position: absolute;
  top: 50%;
  right: 20px;
  cursor: pointer;
  &:hover {
    background: #ddd;
  }
`