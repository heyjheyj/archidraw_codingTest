import React, { useEffect, useState, useRef, useCallback } from 'react';
import styled from 'styled-components'
import NextArrow from '../icons/nextArrow';
import PrevArrow from '../icons/prevArrow';
import ModalHeader from './ModalHeader';

import { useAppSelector, useAppDispatch } from '../redux/hooks'
import { getItems, prev, next } from '../redux/detailReducer';
import { State } from '../redux/itemReducer';

const Detail = () => {
  const [current, setCurrent] = useState<any>()
  const imageRef = useRef<HTMLImageElement>(null)
  const dispatch = useAppDispatch();
  const data = useAppSelector(state => state.items)
  const currentIndex = useAppSelector(state => state.detail.currentIndex)
  const selectedItem = useAppSelector<State>(state => state.items.selectedItem)
  const isEnd = useAppSelector(state => state.detail.isEnd)
  const isStart = useAppSelector(state => state.detail.isStart)

  const movePrev = () => {
    dispatch(prev({selectedItem, currentIndex}))
  }

  const moveNext = () => {
    dispatch(next({selectedItem, currentIndex}))
  }

  const getCurrentItem = () => {
    let res = data.items.find((i:any) => i.key === currentIndex)
    setCurrent(res)
  }

  useEffect(() => {
    getCurrentItem()
  })

  useEffect(() => {
    dispatch(getItems({data, selectedItem}))
  },[dispatch, data, selectedItem])

  return (
    <Modal>
    <ModalHeader selectedItem={selectedItem} current={current} imageRef={imageRef}/>
      <GalleryDetail>
      {current && <Image ref={imageRef} src={`${current._id}`} alt="selectedImage"/>}
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