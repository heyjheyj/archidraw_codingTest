import {useEffect, useRef, useCallback} from 'react';
import styled from 'styled-components'

import Header from '../components/Header';
import ItemCard from '../components/ItemCard';
import ProjectInfo from '../components/ProjectInfo';
import Datail from '../components/Detail'

import { useAppSelector, useAppDispatch } from '../redux/hooks'
import { manipulate, selectItem, State, showModal, closeMenuAll } from '../redux/itemReducer';

const Gallery = () => {
  const itemBoxRef = useRef<HTMLUListElement>(null);
  const dispatch = useAppDispatch();
  const data = useAppSelector(state => state.items)
  const isSelecting = useAppSelector(state => state.items.isSelecting)

  const onSelectItem = (index: number) => {
    dispatch(showModal())
    dispatch(selectItem(index))
    dispatch(closeMenuAll())
  }

  const handleClick = useCallback(
    e => {
      if (itemBoxRef.current && !itemBoxRef.current.contains(e.target)) {
        dispatch(closeMenuAll())
      }
    },
    [dispatch]
  );

  useEffect(
    () => {
      window.addEventListener("mousedown", handleClick);
      return () => {
        window.removeEventListener("mousedown", handleClick);
      };
    },
    [handleClick]
  );

  useEffect(() => {
    dispatch(manipulate())
  }, [dispatch])

  return (
    <>
      {isSelecting ? 
        <Datail /> 
        : <GalleryCompponent>
            <Header />
            <GalleryContentWrapper>
              <ProjectInfo />
                <ItemList ref={itemBoxRef}>
                  {data.items.map((item: State, index: number) => 
                    <ItemCard 
                      item={item} 
                      selectItem={onSelectItem}
                      index={index}
                      key={index} 
                    />)}
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