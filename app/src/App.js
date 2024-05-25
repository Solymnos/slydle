import React , { useState } from 'react';
import styled from 'styled-components';
import Header from './components/Header';
import './App.css';
import Game from './components/Game';
import Profile from './components/Profile';
import Modal from 'react-modal';
import RegisterModal from './components/RegisterModal';
import LoginModal from './components/LoginModal';

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

const ModalHeader = styled.div`
  width: 100%;
  max-height: 2rem;
  justify-content: flex-end;
  display: flex;
`

const Cross = styled.img`
  width: 1.5rem;
  height: 1.5rem;
`

const ModalContain = styled.div`
  display: flex;
  width: 100%;
  flex-grow: 1;
`

const customStyles = {
  content : {
    width : 'fit-content',
    height : 'fit-content',
    top : '50%',
    left : '50%',
    transform : 'translate(-50%, -50%)',
    borderRadius : '18px',
    padding : '1rem',
    background : '#282828',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    border: 'solid 1px white',
    display : 'flex',
    'flex-direction' : 'column',
  },
  overlay : {
    backgroundColor : 'rgba(0, 0, 0, 0.5)'
  }
};



function App() 
{
  
  const [ showModal , setShowModal ] = useState(false);
  const [ formType , setFormType ] = useState('REGISTER');
  
  const openModal = () =>
  {
    setShowModal(true);
  }
  
  const closeModal = () =>
  {
    setShowModal(false);
  }

  return (
    <PageContainer>
      <Header />
      <ContentContainer>
        <Profile openModal={openModal} setFormType={setFormType}/>
        <Game />
      </ContentContainer>
      <Modal isOpen={showModal} style={customStyles}>
        <ModalHeader>
          <Cross src='./Cross.png' onClick={() => closeModal()} />
        </ModalHeader>
        <ModalContain>
        { formType === 'REGISTER' ? 
          (
            <RegisterModal setFormType={setFormType}/>
          ) : (
            <LoginModal setFormType={setFormType}/>
          )
        }
        </ModalContain>
      </Modal>
    </PageContainer>
  );
}

export default App;
