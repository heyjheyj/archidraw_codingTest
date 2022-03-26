import React from 'react';
import styled from 'styled-components'
import CloseIcon from '../icons/close'

const Header = ({closeModal}: any) => {
  const onClose = () => {
    closeModal()
  }

  return <TopBar>
  <CloseButton onClick={onClose}>
    <CloseIcon />
  </CloseButton>
</TopBar>
}

export default Header;

const TopBar = styled.main`
  width: 100%;
  height: 48px;
  padding: 8px;
  background: rgba(255, 255, 255, 0.8);
  border-bottom: 1px solid rgba(235, 235, 235, 0.8);
  position: fixed;
`

const CloseButton = styled.button`
  height: 32px;
  display: flex;
  box-sizing: border-box;
  justify-content: center;
  align-items: center;
  border: none;
  border-radius: 4px;
  padding: 0 10px;
  cursor: pointer;
`