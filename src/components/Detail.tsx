import React, { useEffect } from 'react';
import styled from 'styled-components'
import NextArrow from '../icons/nextArrow';
import PrevArrow from '../icons/prevArrow';
import ModalHeader from './ModalHeader';

import { useAppSelector, useAppDispatch } from '../redux/hooks'
import { getItems, prev, next } from '../redux/carouselReducer';

const Detail = ({closeModal, selectedItem, data}: any) => {
  const dispatch = useAppDispatch();
  
  useEffect(() => {
    dispatch(getItems({data, selectedItem}))
  },[])

  return (
    <Modal>
    <ModalHeader closeModal={closeModal} />
      <GalleryDetail>
        <Image src={`${selectedItem._id}`} alt="selectedImage"/>
      <PrevArrowButton>
        <PrevArrow />
      </PrevArrowButton>
      <NextArrowButton>
        <NextArrow />
      </NextArrowButton>
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