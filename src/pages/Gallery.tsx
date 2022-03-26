import React, {useState} from 'react';
import styled from 'styled-components'

import data from '../data/test.json'
import Header from '../components/Header';
import ItemCard from '../components/ItemCard';
import ProjectInfo from '../components/ProjectInfo';
import Datail from '../components/Detail'

export interface ItemProps {
  _id: string
}

const Gallery = () => {
  const [isSelecting, setIsSelecting] = useState(false)
  const [selectedItem, setSelectedItem] = useState({})

  const selectItem = (item: ItemProps) => {
    setSelectedItem(item)
    setIsSelecting(true)
  }

  const closeModal = () => {
    if (isSelecting === false) {
      return;
    } else {
      setIsSelecting(false);
    }
  }

  return (<>
  {isSelecting ? <Datail closeModal={closeModal} selectedItem={selectedItem}/> :
  <GalleryCompponent>
    <Header closeModal={closeModal}/>
    <GalleryContentWrapper>
      <ProjectInfo data={data.renderings.length}/>
      <ItemList>
        {data.renderings.map((item: ItemProps, index: number) => <ItemCard item={item} selectItem={selectItem} key={index} />)}
      </ItemList>
    </GalleryContentWrapper>
  </GalleryCompponent>}
  </>
  )
} 

export default Gallery;

const GalleryCompponent = styled.div`
  width: 100%;
  height: 100%;
`

const GalleryContentWrapper = styled.div`
  height: calc(100vh - 48px);
  padding: 48px 32px 0 32px;
`

const ItemList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  margin-top: 7px;
`