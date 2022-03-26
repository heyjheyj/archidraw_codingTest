import React from 'react';
import styled from 'styled-components'

import Header from './Header';

const Detail = ({closeModal, selectedItem}: any) => {
  return <Modal>
    <Header closeModal={closeModal} />
    <GalleryDetail>
      <Image src={`${selectedItem._id}`} alt="selectedImage"/>
    </GalleryDetail>
  </Modal>
}

export default Detail;

const Modal = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  background-color: #fff;
`

const GalleryDetail = styled.div`
  padding-top: 56px;
  height: calc(100vh - 56px);
  display: flex;
  align-items: center;
  justify-content: center;
`

const Image = styled.img`
  width: 100%;
  object-fit: contain;
`