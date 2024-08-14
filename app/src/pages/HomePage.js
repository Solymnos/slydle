import React , { useState, useEffect } from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';
import { useSelector , useDispatch } from 'react-redux';

import Header from '../components/common/Header';
import Profile from '../components/common/Profile';
import HomeLoginModal from '../components/spec/HomeLoginModal';
import HomeRegisterModal from '../components/spec/HomeRegisterModal';
import GameResult from '../components/spec/GameResult';
import HomeTimer from '../components/spec/HomeTimer';
import HomeFooter from '../components/spec/HomeFooter';
import HomeSearchBar from '../components/spec/HomeSearchBar';
import HomeGameArray from '../components/spec/HomeGameArray';
import { getAnswer, getChoices } from '../hooks/Data';
import { setDaily } from '../context/UserSlice';
// TODO : Get Data From Server

const PageContainer = styled.div`
    min-height: 100vh;
    max-height: fit-content;
    min-width: 100vw;
    max-width: 100vw;
    display: flex;
    flex-direction: column;
    background-color: #181818;
    padding-top: 2rem;
    padding-bottom: 2rem;
`

const customStyles = {
  content : {
    width : 'fit-content',
    height : 'fit-content',
    top : '50%',
    left : '50%',
    transform : 'translate(-50%, -50%)',
    background : '#121212',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    border: 'solid 1px #1c42e4',
    display : 'flex',
    'flex-direction' : 'column',
  },
  overlay : {
    backgroundColor : 'rgba(0, 0, 0, 0.7)'
  }
};

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

const HomePage = () => 
{  
  const [ showModal , setShowModal ] = useState(false); // OK
  const [ formType , setFormType ] = useState('LOGIN'); // OK
  //const [ gameItems , setGameItems ] = useState([]); // SAVE TO REDUX
  const [ score , setScore ] = useState(0); // A VOIR
  const [ animationTrigger, setAnimationTrigger ] = useState(false); // OK
  const [ choices , setChoices ] = useState([]); // OK ?
  const [ answer, setAnswer ] = useState({});
  const [ ready, setReady ] = useState(false);
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();

  let gameItems = user.gameArray;
  
  let KEY = process.env.REACT_APP_CRYPT_KEY;

  const closeModal = () =>
  {
    setShowModal(false);
  }

  useEffect(() => {
    async function fetchChoices() {
      const response = await getChoices();
      let choicesData = response.response.data;
      setChoices(choicesData);
      await fetchAnswer();
    }
    async function fetchAnswer() {
      const response = await getAnswer();
      setAnswer(response.response.data);
    }
    function verifyDaily() {
      const dateToTest = new Date(user.lastDate);
      const now = new Date();
      const day = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      if (dateToTest < day && user.lastDate !== null)
      {
        dispatch(setDaily({ didItToday : false, date : null, tries : null }))
      }
    }
    async function doAll() {
      await fetchChoices();
      verifyDaily();
      setReady(true);
    }
    doAll();
  },[]);
  
  if (!ready)
  {
    return (
      <PageContainer>
      
      </PageContainer>
    )
  }
  return (
    <PageContainer>
        <Header />
        <Profile setShowModal={setShowModal}/>
        <HomeTimer />
        <GameResult result={answer} isVisible={user.didItToday} tries={gameItems.length} score={user.dailyScore}/>
        <HomeSearchBar data={choices} gameItems={gameItems} answer={answer} setScore={setScore} setAnimationTrigger={setAnimationTrigger} animationTrigger={animationTrigger}/>
        <HomeGameArray items={gameItems} animationTrigger={animationTrigger} answer={answer}/>
        <HomeFooter />
        <Modal isOpen={showModal} style={customStyles}>
          <ModalHeader>
            <Cross src='/img/icons/Cross.png' onClick={() => setShowModal(false)} />
          </ModalHeader>
          <ModalContain>
          { formType === 'REGISTER' ? 
            (
              <HomeRegisterModal closeModal={closeModal} setFormType={setFormType}/>
            ) : (
              <HomeLoginModal closeModal={closeModal} setFormType={setFormType}/>
            )
          }
          </ModalContain>
        </Modal>
    </PageContainer>
  )
}

export default HomePage