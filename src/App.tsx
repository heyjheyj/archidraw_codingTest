import React from 'react';
import styled from 'styled-components'

import Gallery from './pages/Gallery';
import GlobalStyle from './styles/GlobalStyle';

function App() {
  return (
    <AppComponents>
      <GlobalStyle />
      <Gallery />
    </AppComponents>
  );
}

export default App;

const AppComponents = styled.div`
  width: 100%;
  height: 100vh;
`