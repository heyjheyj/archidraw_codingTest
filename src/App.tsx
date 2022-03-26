import React from 'react';
import styled from 'styled-components'

import Detail from './pages/Detail';
import Gallery from './pages/Gallery';

function App() {
  return (
    <AppComponents>
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