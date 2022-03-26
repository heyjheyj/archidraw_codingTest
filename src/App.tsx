import React from 'react';
import styled from 'styled-components'

import Detail from './pages/Detail';
import Gallery from './pages/Gallery';
import GlobalStyle from './styles/GlobalStyle';

function App() {
  return (
    <AppComponents>
      <GlobalStyle />
      <Gallery />
      <Detail />
    </AppComponents>
  );
}

export default App;

const AppComponents = styled.div`
  width: 100%;
  height: 100vh;
`