import React from 'react';
import styled from 'styled-components';
import Header from './components/Header';
import './App.css';
import Game from './components/Game';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #181818;
`
const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: fit-content;
`

function App() {
  return (
    <PageContainer>
      <Header />
      <ContentContainer>
        <Game />
      </ContentContainer>
    </PageContainer>
  );
}

export default App;
