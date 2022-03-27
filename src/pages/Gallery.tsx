import React, {useEffect, useState} from 'react';
import styled from 'styled-components'

import Header from '../components/Header';
import ItemCard from '../components/ItemCard';
import ProjectInfo from '../components/ProjectInfo';
import Datail from '../components/Detail'

import { useAppSelector, useAppDispatch } from '../redux/hooks'
import { manipulate, State } from '../redux/itemReducer';

const Gallery = () => {
  const dispatch = useAppDispatch();
  const data = useAppSelector(state => state.items.items)

  const [isSelecting, setIsSelecting] = useState(false)
  const [selectedItem, setSelectedItem] = useState({})

  const selectItem = (item: State) => {
    setSelectedItem(item)
    setIsSelecting(true)
  }

  const closeModal = () => {
    if (isSelecting === true) setIsSelecting(false)
  }

  useEffect(() => {
    dispatch(manipulate())
  }, [dispatch])

  return (
    <>
      {isSelecting ? 
        <Datail closeModal={closeModal} selectedItem={selectedItem} data={data}/> 
        : <GalleryCompponent>
            <Header />
            <GalleryContentWrapper>
              <ProjectInfo data={data.length}/>
                <ItemList>
                  {data.map((item: State, index: number) => <ItemCard item={item} selectItem={selectItem} key={index} />)}
                </ItemList>
            </GalleryContentWrapper>
          </GalleryCompponent>
      }
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