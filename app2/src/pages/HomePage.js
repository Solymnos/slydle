import React , { useState } from 'react';
import styled from 'styled-components';
import Modal from 'react-modal';

import Header from '../components/common/Header';
import Home_Game from '../components/specific/Home-Game';
import Home_Profile from '../components/specific/Home-Profile';
import Home_RegisterModal from '../components/specific/Home-RegisterModal';
import Home_LoginModal from '../components/specific/Home-LoginModal';

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
        <Home_Profile openModal={openModal} setFormType={setFormType}/>
        <Home_Game />
      </ContentContainer>
      <Modal isOpen={showModal} style={customStyles}>
        <ModalHeader>
          <Cross src='/img/icons/Cross.png' onClick={() => closeModal()} />
        </ModalHeader>
        <ModalContain>
        { formType === 'REGISTER' ? 
          (
            <Home_RegisterModal closeModal={closeModal} setFormType={setFormType}/>
          ) : (
            <Home_LoginModal closeModal={closeModal} setFormType={setFormType}/>
          )
        }
        </ModalContain>
      </Modal>
    </PageContainer>
  );
}

export default App;
