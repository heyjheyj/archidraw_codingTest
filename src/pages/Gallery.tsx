import React from 'react';
import styled from 'styled-components'

const Gallery = () => {
  return <GalleryCompponent>
<TopBar></TopBar>
  </GalleryCompponent>
}

export default Gallery;

const GalleryCompponent = styled.div`
  width: 100%;
  height: 100%;
`

const TopBar = styled.main`
  width: 100%;
  height: 48px;
  padding: 8px;
`